import * as yup from 'yup'

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,11}$/

export const registerFormSchema = yup.object().shape({
  fullname: yup.string().required('Name is required'),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        'Password must be between 5 to 11 characters and have atleast 1 digit, one uppercase letter and one lowercase letter',
    })
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  role: yup.string().required('Please select a role'),
})

export const loginFormSchema = yup.object().shape({
  fullname: yup.string().required('Please type your full name'),
  password: yup.string().required('Please type your password'),
})
