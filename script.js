'use strict';

const money = Number(prompt('Ваш месячный доход?')),
income = 'фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = Number(prompt('Во сколько это обойдется?')),
expenses2 = prompt('Введите обязательную статью расходов'),
amount2 = Number(prompt('Во сколько это обойдется?')),
mission = 1000000,
period = 6,
lowerCase = addExpenses.toLowerCase(),
budgetMonth = money - (amount1 + amount2),
budgetDay = Math.floor(budgetMonth / 30),
missionTime = Math.ceil(mission / budgetMonth);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' рублей');

console.log(lowerCase);
console.log(lowerCase.split(', '));

console.log('Бюджет на месяц = ' + budgetMonth);

console.log('Бюджет на день = ' + budgetDay);

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