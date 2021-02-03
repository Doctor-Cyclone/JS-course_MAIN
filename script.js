'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
    expenses = [],
    expensesAmount,
//Доход в месяц
    start = function(){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while(!isNumber(money));
        return money;
    },
    //Ежемесячные расходы
    getExpensesMonth = function(){
        let sum = 0, cost;

        for(let i = 0; i < 2; i++){
            expenses[i] = prompt('Введите обязательную статью расходов');
            cost = prompt('Во сколько это обойдется?');

            while(!isNumber(cost)){
                cost = prompt('Во сколько это обойдется?');
            }
            sum += +cost;
        }
    return sum;
};

start();
//Хранит значение SUM
expensesAmount = getExpensesMonth();

const income = 'фриланс',
    mission = 1000000,
    period = 6,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
//Определение типа данных
    showTypeOf = function(arg){
        return typeof(arg);
    },
//Накопления за месяц
    getAccumulatedMonth = function(){
        return money - expensesAmount;
    },
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30),
    missionTime = Math.ceil(mission / accumulatedMonth),
//Как долго копить
    getTargetMonth = function(){
        const targetMonth = Math.ceil(mission / accumulatedMonth);

        if(targetMonth < 0){
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута через ' + targetMonth + ' месяцев';
        }
    },
//Уровень дохода
getStatusIncome = function(){
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
console.log('Обязательные расходы: ' + expensesAmount);
console.log((addExpenses.toLowerCase()).split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день = ' + budgetDay);
console.log(getStatusIncome(budgetDay));
