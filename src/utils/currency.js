export function getPrice(cent, symbol = '$') {
  const price = (cent / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `${symbol}${price}`;
}
