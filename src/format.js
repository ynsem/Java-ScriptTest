// форматер для суммы за пьесу
const format = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
}).format;

// Вывод строки счета
const customerFormat = (play, price) => {
  let result = '';
  result += ` ${play.playId}: ${format(price / 100)}`;
  result += ` (${play.audience} мест)\n`;
  return result;
};

export { format, customerFormat };
