import { useCallback, useContext, useState } from 'react';

import { Avatar, Loader, Text, useFileInput } from '@gravity-ui/uikit';

import type { FormikHelpers } from 'formik';

import { Button } from 'src/components/atoms/Button';
import { Container } from 'src/components/atoms/Container';
import { Form } from 'src/components/molecules';
import { Page } from 'src/components/organisms/Page';
import { AuthContext } from 'src/hoc/AuthProvider';
import { inputs } from 'src/pages/ProfilePage/ProfilePage.constants';
import UserAPI from 'src/services/api/user-api';
import type { TUser } from 'src/shared/types/user';
import { userProfileValidationSchema } from 'src/shared/validation/user';
import { PAGE_ROUTES, RESOURCE_URL } from 'src/utils/constants';
import Helpers from 'src/utils/helpers';

export const userAPI = new UserAPI();

export const ProfilePage = () => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);

  const onUpdate = useCallback((files: File[]) => {
    files[0] && updateUserAvatar(files[0]);
  }, []);

  const { controlProps, triggerProps } = useFileInput({ onUpdate });

  const updateUserAvatar = async (avatar: File) => {
    const formData = new FormData();

    formData.append('avatar', avatar);

    await userAPI.updateAvatar(formData, updUserData, errorHandler);
  };

  const updateUserInfo = async (user: TUser, { setSubmitting }: FormikHelpers<TUser>) => {
    setSubmitting(true);

    await userAPI.updateProfile(user, updUserData, errorHandler).finally(() => {
      setSubmitting(false);
    });
  };

  const updUserData = (user: TUser) => {
    if (setUser) {
      setUser(user);
    }
  };

  const errorHandler = (err: unknown) => {
    setError(String(err));
    Helpers.Log('ERROR', err);
  };

  return (
    <Page>
      {userIsLoading ? (
        <Loader />
      ) : (
        <>
          <Container direction={'column'} gap={'2'} alignItems={'center'} width={'100%'}>
            <input {...controlProps} />
            <Button style={{ height: '50px', width: '50px' }} pin={'circle-circle'} view={'flat'} {...triggerProps}>
              <Avatar
                size='xl'
                imgUrl={user?.avatar ? `${RESOURCE_URL}${user.avatar}` : undefined}
                text={user?.display_name || user?.first_name}
              />
            </Button>
            <Text variant={'display-1'}>
              {user ? user.display_name || `${user.first_name} ${user.second_name}` : ''}
            </Text>
          </Container>

          {user && (
            <Form
              initialValues={user}
              inputs={inputs}
              validationSchema={userProfileValidationSchema}
              inputView={'clear'}
              onSubmit={updateUserInfo}
              errorMessage={error}
              submitButtonText='Save'
              showEditButton={true}
              showResetButton={true}
            />
          )}

          <Container direction={'column'} width={'100%'}>
            <Button isNavigate navigateTo={PAGE_ROUTES.CHANGE_PASSWORD} view={'flat-danger'} width={'max'}>
              Change Password
            </Button>
            <Button isNavigate navigateTo={PAGE_ROUTES.MENU} width={'max'}>
              Back
            </Button>
          </Container>
        </>
      )}
    </Page>
  );
};
