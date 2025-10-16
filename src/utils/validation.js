export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

export const validateName = (name) => {
  const errors = [];
  const requiredError = validateRequired(name, 'Name');
  if (requiredError) errors.push(requiredError);
  
  const minLengthError = validateMinLength(name, 2, 'Name');
  if (minLengthError) errors.push(minLengthError);
  
  const maxLengthError = validateMaxLength(name, 50, 'Name');
  if (maxLengthError) errors.push(maxLengthError);
  
  return errors.length > 0 ? errors[0] : null;
};

export const validateProjectTitle = (title) => {
  const errors = [];
  const requiredError = validateRequired(title, 'Project title');
  if (requiredError) errors.push(requiredError);
  
  const minLengthError = validateMinLength(title, 3, 'Project title');
  if (minLengthError) errors.push(minLengthError);
  
  const maxLengthError = validateMaxLength(title, 100, 'Project title');
  if (maxLengthError) errors.push(maxLengthError);
  
  return errors.length > 0 ? errors[0] : null;
};