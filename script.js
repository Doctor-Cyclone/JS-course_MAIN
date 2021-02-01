const money = 60000;
const income = 'фриланс';
const addExpenses = 'ЖКХ, Телефон, Бензин';
const deposit = true;
const mission = 10e4;
const period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' рублей');

const lowerCase = addExpenses.toLowerCase();
console.log(lowerCase.split(', '));

const budgetDay = money / 30;
console.log(budgetDay);