'use strict';

// expenses - затраты
// additional - дополнительный
// Income - доход

let startBtn = document.getElementById('start'),
    incomePlusBtn = document.getElementsByTagName('button')[0],
    expensesPlusBtn = document.getElementsByTagName('button')[1],
//Вывод
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
//Ввод
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheckBox = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0, 
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    //Доход в месяц
    start: function(){
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getIncome();
        appData.getAddIncome();

        appData.getBudget();
        appData.getTargetMonth();
        appData.calcSavedMoney();

        appData.showResult();

    },
    //Проверка поля МЕСЯЧНЫЙ ДОХОД на пустоту
    checkSalaryAmount: function(){
        if(salaryAmount.value === ''){
            alert();
        } else {
            appData.start();
        }
    },
    //Вывод результатов
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();

        periodSelect.addEventListener('input', appData.calcSavedMoney);
    },

//ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
    //Добавление полей ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
    addExpensesBlock: function(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesPlusBtn.style.display = 'none';
        }
    },
    //Добавление ОБЯЗАТЕЛЬНЫХ РАСХОДОВ в объект appData.expenses
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
        });
    },
    //Общая сумма ОБЯЗАТЕЛЬНЫХ РАСХОДОВ за месяц
    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },

//ДОПОЛНИТЕЛЬНЫЕ РАСХОДЫ
    //Добавление в массив ДОПОЛНИТЕЛЬНЫХ РАСХОДОВ
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim(); 
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },

//ВОЗМОЖНЫЕ ДОХОДЫ
    //Добавление в массив ВОЗМОЖНЫХ ДОХОДОВ
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

//ДОПОЛНИТЕЛЬНЫЙ ДОХОД
    //Добавление полей ДОПОЛНИТЕЛЬНЫХ ДОХОДОВ
    addIncomeBlock: function(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusBtn);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            incomePlusBtn.style.display = 'none';
        }
    },
    //Добавление ДОПОЛНИТЕЛЬНОГО ДОХОДА в объект appData.income
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = +cashIncome;
                }
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    //Накопления за месяц
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    //Как долго копить
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / appData.budgetMonth);

        // if(targetMonth < 0 || targetMonth === Infinity){
        //     return 'Цель не будет достигнута';
        // } else {
        //     return 'Цель будет достигнута через ' + targetMonth + ' месяца/ев';
        // }
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
    //Депозит
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
    //Динамический подсчёт накоплений за период
    calcSavedMoney: function(){
        incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    },
    //Динамическое обновление периода
    changePeriodNumber: function(){
        periodAmount.innerHTML = periodSelect.value;
    },
};

startBtn.addEventListener('click', appData.checkSalaryAmount);
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodNumber);
