'use strict';

let accumulatedMonth, budgetDay, missionTime;
const money = +prompt('Ваш месячный доход?', 40000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?', 5000),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?', 5000),
    mission = 1000000,
    period = 6;

const showTypeOf = function(arg){
    return typeof(arg);
};

const getStatusIncome = function(income){
    return income;
};

const getExpensesMonth = function(amount1, amount2){
    return amount1 + amount2;
};

const getAccumulatedMonth = function(money, amount1, amount2){
    return money - (amount1 + amount2);
};

accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
budgetDay = Math.floor(accumulatedMonth / 30);
missionTime = Math.ceil(mission / accumulatedMonth);

const getTargetMonth = function(mission, accumulatedMonth){
    return Math.ceil(mission / accumulatedMonth);
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Обязательные расходы: ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.split(', '));
console.log('Вы накопите за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяца');
console.log('Бюджет на день = ' + budgetDay);
console.log('Дополнительный заработок: ' + getStatusIncome(income));