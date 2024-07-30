import * as Yup from 'yup';

import { InputProps } from 'src/components/atoms';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const inputs: InputProps[] = [
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
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password',
  },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
];

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  first_name: Yup.string()
    .max(50, 'First name must be 50 characters or less')
    .required('First name is required'),
  second_name: Yup.string()
    .max(50, 'Second name must be 50 characters or less')
    .required('Second name is required'),
  login: Yup.string()
    .max(15, 'Login must be 15 characters or less')
    .required('Login is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
});
