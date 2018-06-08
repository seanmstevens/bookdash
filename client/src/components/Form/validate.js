export const validate = ({ email, password, passwordConfirm }) => {
  const errors = {}
  
  if (!email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address'
  }
  
  if (!password) {
    errors.password = 'Required'
  } else if (password.length < 8) {
    errors.password = 'Must be at least 8 characters'
  }
  
  if (!passwordConfirm) {
    errors.passwordConfirm = 'Required'
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  
  return errors
}