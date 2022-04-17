export const currencyFormat = (a) => {
  return parseFloat(a).toFixed(2);
};

export const calculateAmount = (a, q) => {
  return currencyFormat(a * q);
};
