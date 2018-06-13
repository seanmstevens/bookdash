export const validate = ({ name, email, password, passwordConfirm }) => {
  const errors = {}
  
  if (!name) {
    errors.name = 'Required field'
  }

  if (!email) {
    errors.email = 'Required field'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address'
  }
  
  if (!password) {
    errors.password = 'Required field'
  } else if (password.length < 8) {
    errors.password = 'Must be at least 8 characters'
  }
  
  if (!passwordConfirm) {
    errors.passwordConfirm = 'Required field'
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  
  return errors
}