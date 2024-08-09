import * as Yup from 'yup';

import type { InputProps } from 'src/components/atoms/Input';

export const USER_DATA_MOCK = {
  login: 'l586',
  password: '123!!321',
};

export const inputs: InputProps[] = [
  { name: 'login', label: 'Login', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

export const validationSchema = Yup.object({
  login: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
