import parse from './parse.js';
import getPrices from './calculation.js';

console.log(getPrices(parse('invoices.json')));
