import { useCallback, useContext, useState } from 'react';

import { Pencil } from '@gravity-ui/icons';
import { Avatar, Icon, Loader, Text, useFileInput } from '@gravity-ui/uikit';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/atoms/Button';
import { Container } from 'src/components/atoms/Container';
import { Input } from 'src/components/atoms/Input';
import { Page } from 'src/components/organisms/Page';
import { AuthContext } from 'src/hoc/AuthProvider';
import { inputs } from 'src/pages/ProfilePage/ProfilePage.constants';
import { RESOURCE_URL } from 'src/utils/constants';

export const ProfilePage = () => {
  const { user, userIsLoading } = useContext(AuthContext);
  const [isChanging, setIsChanging] = useState(false);

  const navigate = useNavigate();

  const onUpdate = useCallback((files: File[]) => console.log(files), []);
  const { controlProps, triggerProps } = useFileInput({ onUpdate });

  const goBack = () => {
    navigate(-1);
  };

  const goToChangePassword = () => {
    navigate('/change-password');
  };

  const handleEdit = () => {
    setIsChanging(true);
  };

  const handleSubmit = (values: unknown) => {
    console.log(values);
  };

  return (
    <Page>
      {userIsLoading ? (
        <Loader />
      ) : (
        <>
          <Container direction={'column'} gap={'2'} alignItems={'center'}>
            <input {...controlProps} />
            <Button
              style={{ height: '50px', width: '50px' }}
              pin={'circle-circle'}
              view={'flat'}
              {...triggerProps}>
              <Avatar
                size='xl'
                imgUrl={
                  user?.avatar ? `${RESOURCE_URL}${user.avatar}` : undefined
                }
                text={user?.display_name || user?.first_name}
              />
            </Button>
            <Text variant={'display-1'}>
              {user
                ? user.display_name || `${user.first_name} ${user.second_name}`
                : ''}
            </Text>
          </Container>

          {user && (
            <Formik initialValues={user} onSubmit={handleSubmit}>
              <Form>
                <Container direction={'column'} gap={2}>
                  {inputs.map(input => (
                    <Field
                      as={Input}
                      view='clear'
                      style={{ width: '100%' }}
                      controlProps={{
                        readOnly: !isChanging,
                      }}
                      {...input}
                    />
                  ))}
                  {!isChanging ? (
                    <Button view={'flat'} onClick={handleEdit}>
                      <Icon data={Pencil} />
                      Edit
                    </Button>
                  ) : (
                    <Button type={'submit'} view={'flat-action'}>
                      Save
                    </Button>
                  )}
                </Container>
              </Form>
            </Formik>
          )}

          <Button view={'flat'} onClick={goBack}>
            Back
          </Button>
        </>
      )}
    </Page>
  );
};
