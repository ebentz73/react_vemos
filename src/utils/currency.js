export function getPrice(cent, symbol = '$') {
  const price = (cent / 100).toFixed(2);
  return `${symbol}${price}`;
}
