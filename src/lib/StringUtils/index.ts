const RemoveNonNumbers = (value: string) => value.replace(/[^0-9 ]+/g, '');

const StringUtils = {
  RemoveNonNumbers,
};

export default StringUtils;
