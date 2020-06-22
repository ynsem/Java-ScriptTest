import { format, customerFormat } from './format.js';
import getPlayBonus from './bonusesCalc.js';

// возвращает цену за одну пьесу
const getPlayPrice = (play) => {
  let price = 0;
  switch (play.type) {
    case 'tragedy':
      price = 40000;
      if (play.audience > 30) {
        price += 1000 * (play.audience - 30);
      }
      break;
    case 'comedy':
      // в ТЗ нет формул для расчета стоимости, поэтому эта часть не меняется,
      // но тут тоже стоит внести правки после уточнения,
      // скорее всего пропущен else, но однозначно это утверждать нельзя
      price = 30000;
      if (play.audience > 20) {
        price += 10000 + 500 * (play.audience - 20);
      }
      price += 300 * play.audience;
      break;
    default:
      throw new Error(`неизвестный тип: ${play.type}`);
  }

  return price;
};

// возвращает цену для одного клиента
const getPrice = (invoice) => {
  let price = 0;
  let bonuses = 0;
  let result = `Счет для ${invoice.customer}\n`;

  for (const play of invoice.performance) {
    // сумма за пьесу
    const playPrice = getPlayPrice(play);
    // общая сумма
    price += playPrice;

    // бонусы за пьесу
    const playBonus = getPlayBonus(play);
    // общие бонусы
    bonuses += playBonus;

    // Вывод строки счета
    result += customerFormat(play, playPrice);
  }

  result += `Итого с вас ${format(price / 100)}\n`;
  result += `Вы заработали ${bonuses} бонусов\n`;

  return result;
};

// возвращает цену по всем клиентам
const getPrices = (invoices) => {
  let prices = '';
  for (const invoice of invoices) {
    prices += getPrice(invoice);
  }
  return prices;
};

export default getPrices;
