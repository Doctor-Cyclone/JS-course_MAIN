'use strict';

const money = Number(prompt('Ваш месячный доход?'));
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = prompt('Есть ли у вас депозит в банке?(да/нет)');

if (deposit === 'да') {
    deposit = true;
} else {
    deposit = false;
}

const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = Number(prompt('Во сколько это обойдется?'));
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = Number(prompt('Во сколько это обойдется?'));

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

const mission = 1000000;
const period = 6;

console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' рублей');

const lowerCase = addExpenses.toLowerCase();
console.log(lowerCase);
console.log(lowerCase.split(', '));

const budgetMonth = money - (amount1 + amount2);

const budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день = ' + budgetDay);

const missionTime = Math.ceil(mission / budgetMonth);
console.log(mission + ' вы накопите за ' + missionTime);


if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}