'use strict';

const money = Number(prompt('Ваш месячный доход?'));
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const mission = 1000000;
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

const budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);

const budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);

const missionTime = Math.ceil(mission / budgetMonth);
console.log(mission + ' вы накопите за ' + missionTime);


if (budgetDay => 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay => 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay => 0 && budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}

//const period = 6;
//console.log('Период равен ' + period + ' месяцам');
//console.log('Цель заработать ' + mission + ' рублей');
//console.log(typeof money);
//console.log(typeof income);
//console.log(typeof deposit);
//console.log(addExpenses.length);
//const lowerCase = addExpenses.toLowerCase();