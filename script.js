'use strict';

const startBtn = document.getElementById('start'),

    plusBtnOne = document.getElementsByTagName('button')[0],
    plusBtnTwo = document.getElementsByTagName('button')[1],

    depositCheckBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
//Вывод
    budgetMonth = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncome = document.getElementsByClassName('additional_income-value')[0],
    additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriod = document.getElementsByClassName('income_period-value')[0],
    targetMonth = document.getElementsByClassName('target_month-value')[0],
//Ввод
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

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
//2 задание
const addExpensesConsole = function(){
    let tempStr = '';

    for(let i = 0; i < appData.addExpenses.length; i++){
        const temp = appData.addExpenses[i],
            firstSymbol = temp.substring(0, 1).toUpperCase(),
            otherSymbol = temp.substring(1, temp.length);

            tempStr += firstSymbol + otherSymbol + ', ';
    }
    console.log(tempStr);
};

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
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 75000,
    period: 6,
    asking: function(){
            //Дополнительный заработок
            if(confirm('У вас есть доп. заработок?')){
                let itemIncome, cashIncome;

                do{
                    itemIncome = prompt('Какой у вас доп. заработок?', 'Фриланс');
                }
                while(!isNaN(itemIncome));

                do{
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                }
                while(!isNumber(cashIncome));
                

                appData.income[itemIncome] = +cashIncome;
            }

            do{
                appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            }
            while(!isNaN(appData.addExpenses));

            appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            //Ежемесячные расходы
            let cost, exp;

            for(let i = 0; i < 2; i++){   
                exp = prompt('Введите обязательную статью расходов', 'такси');

                do{
                    cost = prompt('Во сколько это обойдется?', 5000);
                }
                while(!isNumber(cost));

                appData.expenses[exp] = +cost;
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
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.persentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.persentDeposit));

            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    },
};
appData.asking();
appData.getBudget();
addExpensesConsole();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.budgetDay));
console.log(appData.addExpenses);

for(let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}
