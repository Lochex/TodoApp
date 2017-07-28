/**
 * Validate the user email input
 * @param {string} input - The input email to validate
 * @return {object} returns an object that contain validation status an
 * error messages if any
 */
const validateEmail = (input) => {
  if(input) {
    const isValid = input
    .match(/^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
    if (!isValid) {
      return false;
    }
    return true;
  }
  return true;
  
};

/**
 * Validate the user password input
 * @param {string} input - The input password to validate
 * @return {object} returns an object that contain validation status an
 * error messages if any
 */
const validatePassword = (input) => {
  if (input) {
    const isValid = input
    .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g);
    if (!isValid) {
      return false;
    }
    return true;
  }
  return false;
  
};

/** 
 * Validate the user password input
 * @param {string} input - The input password to validate
 * @return {object} returns an object that contain validation status an
 * error messages if any
 */
const validatorName = (input) => {
  if(input) {
    const isValid = input
    .match(/^[a-zA-Z]{2,16} [a-zA-Z]{2,16}$/g);
    if (!isValid) {
      return false
    }
    return true;
  }
  return false;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatorName
}