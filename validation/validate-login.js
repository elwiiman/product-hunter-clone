export default function validateLogin(inputValues) {
  let errors = {};

  //validate email
  if (!inputValues.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputValues.email)
  ) {
    errors.email = "Email not valid";
  }

  //validate password
  if (!inputValues.password) {
    errors.password = "Password is required";
  } else if (inputValues.password.length < 6) {
    errors.password = "Password must be 6 characters length";
  }

  return errors;
}
