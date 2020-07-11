export default function validateCreateProduct(inputValues) {
  let errors = {};

  //validate username
  if (!inputValues.name) {
    errors.name = "Name is required";
  }

  //validate enterprise
  if (!inputValues.enterprise) {
    errors.enterprise = "Enterprise name is required";
  }

  //validate url
  if (!inputValues.url) {
    errors.url = "URL of product is mandatory";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(inputValues.url)) {
    errors.url = "Wrong URL format or invalid";
  }

  //validate description
  if (!inputValues.description) {
    errors.description = "Add a product description";
  }

  return errors;
}
