import React, { useState, useEffect } from "react";

const useValidate = (initialState, validate, fn) => {
  const [inputValues, setInputValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errors]);

  //Function that executes each time that user writes
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  //Function that executes on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(inputValues);
    setErrors(validationErrors);
    setSubmitForm(true);
  };

  //when event blur
  const handleBlur = () => {
    const validationErrors = validate(inputValues);
    setErrors(validationErrors);
  };
  return {
    inputValues,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidate;
