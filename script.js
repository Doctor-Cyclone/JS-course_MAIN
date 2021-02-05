'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
//Доход в месяц
    start = function(){
        do{
            money = +prompt('Ваш месячный доход?', 40000);
        }
        while(!isNumber(money));
        return money;
    };

start();

let appData = {
    budget: money,
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0, 
    income: {},
    addIncome: {},
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 75000,
    period: 6,
    asking: function(){
            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            //Ежемесячные расходы
            for(let i = 0; i < 2; i++){
                appData.expenses[prompt('Введите обязательную статью расходов', 'такси')] = +prompt('Во сколько это обойдется?', 5000);
            }
            //Всего потрачено в месяц
            for(let key in appData.expenses){
                appData.expensesMonth += appData.expenses[key];
            }
    },
    //Накопления за месяц
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    //Как долго копить
    getTargetMonth: function(){
        const targetMonth = Math.ceil(appData.mission / appData.budgetMonth);

        if(targetMonth < 0 || targetMonth === Infinity){
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута через ' + targetMonth + ' месяца/ев';
        }
    },
    //Уровень дохода
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
};
appData.asking();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
//console.log(appData.addExpenses);
console.log(appData.getTargetMonth());
//console.log('Бюджет на день = ' + appData.budgetDay);
console.log(appData.getStatusIncome(appData.budgetDay));

for(let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}
