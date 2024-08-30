import { Form } from 'src/components/molecules/Form';
import { Page } from 'src/components/organisms/Page';
import {
  inputs,
  validationSchema,
} from 'src/pages/ChangePassword/ChangePassword.constants';

export const ChangePassword = () => {
  const handleSubmit = (e: unknown) => {
    console.log(e);
  };
  return (
    <Page withHeader hasBackButton>
      <Form
        inputs={inputs}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}></Form>
    </Page>
  );
};
