import React from 'react';

import { Text } from '@gravity-ui/uikit';
import { FormikErrors, FormikHelpers, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Container, Input, InputProps } from 'src/components/atoms';

import styles from './Form.module.css';

interface FormProps<T> {
  initialValues?: T;
  validationSchema: Yup.Schema<T>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  isSubmitting?: boolean;
  inputs?: InputProps[];
  errorMessage?: string;
}

export const Form = <T extends FormikValues>({
  initialValues = {} as T,
  validationSchema,
  onSubmit,
  isSubmitting,
  inputs,
  errorMessage,
}: FormProps<T>) => {
  const formik = useFormik<T>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <Container direction="column" alignItems="center">
        {inputs?.map(input => (
          <Input
            key={input.name}
            {...input}
            size={'xl'}
            value={formik.values[input.name] || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            validationState={
              formik.touched[input.name] &&
              formik.errors[input.name] &&
              'invalid'
            }
            errorMessage={formik.errors[input.name] as FormikErrors<string>}
            errorPlacement={'inside'}
          />
        ))}
      </Container>
      {errorMessage && (
        <Text variant={'body-short'} color={'danger'}>
          {errorMessage}
        </Text>
      )}
      <Button view={'action'} type="submit" loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
