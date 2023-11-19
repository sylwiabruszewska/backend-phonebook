export const validateData = (schema, data) => {
  const { value, error } = schema.validate(data);

  if (error) {
    const invalidParam = error.details[0].path;

    if (error.details[0].type === "any.required") {
      return {
        isValid: false,
        errorMessage: `Missing required "${invalidParam}" field`,
        invalidParam,
      };
    }

    return {
      isValid: false,
      errorMessage: error.details[0].message,
      invalidParam,
    };
  }

  return { isValid: true, value };
};
