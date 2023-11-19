export const validateData = (schema, data) => {
  const { value, error } = schema.validate(data);
  return error
    ? { isValid: false, errorMessage: error.details[0].message }
    : { isValid: true, value };
};
