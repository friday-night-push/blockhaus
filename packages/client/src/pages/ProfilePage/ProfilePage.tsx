import { useContext, useEffect, useState } from 'react';

import { Avatar, Loader, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import { Button, EditableText, InputProps, Page } from 'src/components';
import { AuthContext } from 'src/hoc';
import { RESOURCE_URL } from 'src/utils/constants';

const profileFormFields: InputProps[] = [
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    autoComplete: 'given-name',
  },
  {
    name: 'second_name',
    label: 'Second Name',
    type: 'text',
    autoComplete: 'family-name',
  },
  { name: 'login', label: 'Login', type: 'text', autoComplete: 'username' },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    autoComplete: 'phone',
  },
];

export const ProfilePage = () => {
  const { user, userIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [originalData, setOriginalData] = useState<Record<string, string>>({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = profileFormFields.reduce(
        (acc, field) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc[field.name] = user[field.name] || '';
          return acc;
        },
        {} as Record<string, string>
      );
      console.log('Initial formData:', userData); // Debugging line
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      console.log('Updated formData:', newFormData); // Debugging line
      setIsChanged(
        JSON.stringify(newFormData) !== JSON.stringify(originalData)
      );
      return newFormData;
    });
  };

  const handleSave = () => {
    if (isChanged) {
      // Send updated data to the server
      console.log('Updated data:', formData);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Page>
      {userIsLoading ? (
        <Loader />
      ) : (
        <>
          <Avatar
            size={'xl'}
            imgUrl={user?.avatar ? `${RESOURCE_URL}${user?.avatar}` : undefined}
            text={user?.display_name || user?.first_name}
          />
          <Text variant={'display-1'}>
            {user?.display_name || `${user?.first_name} ${user?.second_name}`}
          </Text>
          <Text variant={'subheader-1'}>{user?.email}</Text>
          <form>
            {profileFormFields.map(({ name, label, type, autoComplete }) => (
              <EditableText
                key={name}
                name={name}
                label={label || ''}
                type={type}
                autoComplete={autoComplete}
                value={formData[name]}
                onChange={handleChange}
              />
            ))}
          </form>
          <Button view={'action'} onClick={handleSave} disabled={!isChanged}>
            Save
          </Button>
          <Button view={'flat'} onClick={goBack}>
            Back
          </Button>
        </>
      )}
    </Page>
  );
};
