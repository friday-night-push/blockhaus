import * as Yup from 'yup';

import type { InputProps } from 'src/components/atoms/Input';

export const inputs: InputProps[] = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    type: 'password',
    required: true,
    autoComplete: 'password',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
  },
];

export const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Enter current password'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match'
  ),
});
