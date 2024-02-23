/**
 * return {
 *  status: boolean ( pass / fail),
 *  field: string ( name of first empty required key)
 * }
 * @param payload current request's body
 * @param requiredKeys key of required fields
 */
const validateRequiredFieldsPayload = (
  payload: any,
  requiredKeys: string[]
) => {
  for (let string of requiredKeys) {
    if (!payload[`${string}`]) {
      return {
        status: false,
        field: string,
      };
    }
  }
  return {
    status: true,
    field: "",
  };
};

export { validateRequiredFieldsPayload };
