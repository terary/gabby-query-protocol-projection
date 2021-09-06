export const findMissingProperties = (
  props: object = {},
  searchProperties: string[] = []
): string[] => {
  const missingFields = searchProperties.filter((propName) => {
    return !(propName in props);
  });

  return missingFields;
};

const helperFunctions = {
  findMissingProperties,
};
export default helperFunctions;
