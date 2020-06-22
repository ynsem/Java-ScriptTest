import fs from 'fs';
import path from 'path';

const parse = (invoicesPath) => {
  const data = fs.readFileSync(
    path.resolve(process.cwd(), '__tests__/fixtures/', invoicesPath),
    'utf8',
  );

  return JSON.parse(data);
};

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

// возвращает бонусы за одну пьесу
const getPlayBonus = (play) => {
  let bonus = 0;
  // Добавление бонусов
  bonus += Math.max(play.audience - 30, 0);

  // нужно уточнение в ТЗ, если тут нужно считать бонус именно за каждые 10
  // комедий, то код ниже неверный, т.к. он просто считает бонус для каждой
  // комедии исходя из аудитории
  // код ниже добавляет бонус за каждые 5 человек на каждой комедии

  // Дополнительный бонус за каждые 10 комедий - либо это неверно, либо код ниже
  if (play.type === 'comedy') bonus += Math.floor(play.audience / 5);

  return bonus;
};

// возвращает цену для одного клиента
const getPrice = (invoice) => {
  let price = 0;
  let bonuses = 0;
  let result = `Счет для ${invoice.customer}\n`;

  for (let play of invoice.performance) {
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
  for (let invoice of invoices) {
    prices += getPrice(invoice);
  }
  return prices;
};

// invoices.json
// const invoices = [
//   {
//     customer: 'MDT',
//     performance: [
//       {
//         playId: 'Гамлет',
//         audience: 55,
//         type: 'tragedy',
//       },
//       {
//         playId: 'Ромео и Джульетта',
//         audience: 35,
//         type: 'tragedy',
//       },
//       {
//         playId: 'Отелло',
//         audience: 40,
//         type: 'comedy',
//       },
//     ],
//   },
// ];

console.log(getPrices(parse('invoices.json')));
