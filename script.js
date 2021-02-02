'use strict';

const money = +prompt('Ваш месячный доход?', 40000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?', 5000),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?', 5000),
    mission = 1000000,
    period = 6,
    showTypeOf = function(arg){
        return typeof(arg);
    },
    getExpensesMonth = function(amount1, amount2){
        return amount1 + amount2;
    },
    getAccumulatedMonth = function(money, amount1, amount2){
        return money - (amount1 + amount2);
    },
    accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
    budgetDay = Math.floor(accumulatedMonth / 30),
    missionTime = Math.ceil(mission / accumulatedMonth),
    getTargetMonth = function(mission, accumulatedMonth){
        return Math.ceil(mission / accumulatedMonth);
    },
    getStatusIncome = function(budgetDay){
        if (budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (budgetDay >= 600 && budgetDay <= 1200) {
            return 'У вас средний уровень дохода';
        } else if (budgetDay >= 0 && budgetDay <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    };

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Обязательные расходы: ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.split(', '));
console.log('Вы накопите за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяца');
console.log('Бюджет на день = ' + budgetDay);
console.log(getStatusIncome(budgetDay));