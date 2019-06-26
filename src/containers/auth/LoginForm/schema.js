import { object, string } from 'yup';

export default object().shape({
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  password: string().required('Password is required')
});
