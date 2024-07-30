import { FormikErrors, FormikHelpers, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Container, Input, InputProps } from 'src/components/atoms';

interface FormProps<T> {
  initialValues: T;
  validationSchema: Yup.Schema<T>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  inputs?: InputProps[];
}

import styles from './Form.module.css';

export const Form = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  inputs,
}: FormProps<T>) => {
  const formik = useFormik<T>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <Container direction="column" alignItems="center">
        {inputs?.map((input, i) => (
          <Input
            key={input.name}
            view={'clear'}
            {...input}
            size={'xl'}
            value={
              formik.values[input.name] || formik.initialValues[input.name]
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            validationState={
              formik.touched[input.name] &&
              formik.errors[input.name] &&
              'invalid'
            }
            errorMessage={formik.errors[input.name] as FormikErrors<string>}
            errorPlacement={'inside'}
            autoFocus={i === 0}
          />
        ))}
      </Container>
      <Button view={'action'} type="submit">
        Submit
      </Button>
    </form>
  );
};
