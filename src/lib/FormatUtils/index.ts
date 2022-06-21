const removeNonNumbers = (value: string) => value.replace(/[^0-9 ]+/g, '');

const decimalToPercent = (decimal: number, sigfigs?: number) =>
  (decimal * 100).toFixed(sigfigs || 2);

const FormatUtils = {
  removeNonNumbers,
  decimalToPercent,
};

export default FormatUtils;
