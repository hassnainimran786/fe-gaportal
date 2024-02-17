/**
 * Remove attributes from an object that do not meet Yup validation criteria
 * @param {Object} obj - The input object
 * @param {Yup.ObjectSchema} validationSchema - The Yup validation schema
 * @returns {Object} - The object with only valid attributes
 */
export const filterObjectByYupValidation = (obj, validationSchema) => {
  try {
    // Validate the object against the schema
    const validatedObject = validationSchema.validateSync(obj, { stripUnknown: true });
    // Get the list of valid attribute names
    const validAttributeNames = Object.keys(validatedObject);

    // Create a new object with only valid attributes
    const filteredObject = {};
    validAttributeNames.forEach((attributeName) => {
      filteredObject[attributeName] = obj[attributeName];
    });
    return filteredObject;
  } catch (error) {
    // Handle validation errors if needed
    console.error('Validation error:', error.message);
    return {}; // Return an empty object in case of validation errors
  }
};
