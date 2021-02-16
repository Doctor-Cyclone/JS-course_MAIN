'use strict';

// expenses - затраты
// additional - дополнительный
// Income - доход

let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
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
    periodAmount = document.querySelector('.period-amount'),
    depositCheckmark = document.getElementById('deposit-check');

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function(){
    this.budget = 0;
    this.expensesMonth = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
};
//Доход в месяц
AppData.prototype.start = function(){
    let leftSideInputs = document.querySelectorAll('.data input[type=text]');

    leftSideInputs.forEach( item => {
        item.setAttribute("disabled", "disabled");
    });
    incomePlusBtn.setAttribute("disabled", "disabled");
    expensesPlusBtn.setAttribute("disabled", "disabled");
    depositCheckmark.setAttribute("disabled", "disabled");

    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getIncome();
    this.getAddIncome();

    this.getBudget();
    this.getTargetMonth();
    this.calcSavedMoney();

    this.showResult();
};

//Вывод результатов
AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();

    periodSelect.addEventListener('input', () => this.calcSavedMoney());
};

//ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
//Добавление полей ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
AppData.prototype.addExpensesBlock = function(){
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    //Очистка добавленнного поля НАИМЕНОВАНИЕ
    let childCloneExpensesItemTitle = cloneExpensesItem.querySelector('.expenses-title');
    childCloneExpensesItemTitle.value = '';
    //Очистка добавленнного поля СУММА
    let childCloneExpensesItemAmount = cloneExpensesItem.querySelector('.expenses-amount');
    childCloneExpensesItemAmount.value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
    expensesItems = document.querySelectorAll('.expenses-items');

    this.addCheckField();

    if(expensesItems.length === 3){
        expensesPlusBtn.style.display = 'none';
    }
};
//Добавление ОБЯЗАТЕЛЬНЫХ РАСХОДОВ в объект appData.expenses
AppData.prototype.getExpenses = function(){
    expensesItems.forEach( item => {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = +cashExpenses;
            }
    });
};
//Общая сумма ОБЯЗАТЕЛЬНЫХ РАСХОДОВ за месяц
AppData.prototype.getExpensesMonth = function(){
    for(let key in this.expenses){
        this.expensesMonth += this.expenses[key];
    }
};

//ДОПОЛНИТЕЛЬНЫЕ РАСХОДЫ
//Добавление в массив ДОПОЛНИТЕЛЬНЫХ РАСХОДОВ
AppData.prototype.getAddExpenses = function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( item => {
        item = item.trim(); 
        let itemValueLower = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();

        if(itemValueLower !== ''){
            this.addExpenses.push(itemValueLower);
        }
    });
    this.addCheckField();
};

//ВОЗМОЖНЫЕ ДОХОДЫ
//Добавление в массив ВОЗМОЖНЫХ ДОХОДОВ
AppData.prototype.getAddIncome = function(){
    additionalIncomeItem.forEach( item => {
        let itemValue = item.value.trim(),
            itemValueLower = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();

        if(itemValueLower !== ''){
            this.addIncome.push(itemValueLower);
        }
    });
};

//ДОПОЛНИТЕЛЬНЫЙ ДОХОД
//Добавление полей ДОПОЛНИТЕЛЬНЫХ ДОХОДОВ
AppData.prototype.addIncomeBlock = function(){
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    //Очистка добавленнного поля НАИМЕНОВАНИЕ
    let childCloneIncomeItemTitle = cloneIncomeItem.querySelector('.income-title');
    childCloneIncomeItemTitle.value = '';
    //Очистка добавленнного поля СУММА
    let childCloneIncomeItemAmount = cloneIncomeItem.querySelector('.income-amount');
    childCloneIncomeItemAmount.value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusBtn);
    incomeItems = document.querySelectorAll('.income-items');

    this.addCheckField();

    if(incomeItems.length === 3){
        incomePlusBtn.style.display = 'none';
    }
};
//Добавление ДОПОЛНИТЕЛЬНОГО ДОХОДА в объект appData.income
AppData.prototype.getIncome = function(){
    incomeItems.forEach( item => {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = +cashIncome;
            }
    });

    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
//Накопления за месяц
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
//Как долго копить
AppData.prototype.getTargetMonth = function(){
    return Math.ceil(targetAmount.value / this.budgetMonth);

    // if(targetMonth < 0 || targetMonth === Infinity){
    //     return 'Цель не будет достигнута';
    // } else {
    //     return 'Цель будет достигнута через ' + targetMonth + ' месяца/ев';
    // }
};
//Уровень дохода
AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};
//Депозит
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do{
            this.persentDeposit = prompt('Какой годовой процент?', 10);
        }
        while(!isNumber(this.persentDeposit));

        do{
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while(!isNumber(this.moneyDeposit));
    }
};
//Динамический подсчёт накоплений за период
AppData.prototype.calcSavedMoney = function(){
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
},
//Динамическое обновление периода
AppData.prototype.changePeriodNumber = function(){
    periodAmount.innerHTML = periodSelect.value;
};
//Запрет на ввод определённых символов
AppData.prototype.addCheckField = function(){
    const placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]'),
        placeholderTitle = document.querySelectorAll('[placeholder="Наименование"]');
    
    placeholderAmount.forEach(function(item){
        item.addEventListener('input', function(){
            item.value = item.value.replace(/[^0-9+$]/gi, '');
        });
    });
    
    placeholderTitle.forEach(function(item){
        item.addEventListener('input', function(){
            item.value = item.value.replace(/[^а-яё\s\.\,\;]/gi, '');
        });
    });
    
};
//Очистка полей после нажатия кнопки сбросить
AppData.prototype.reset = function(){
    let leftSideInputs = document.querySelectorAll('.data input[type=text]');
        leftSideInputs.forEach( item => item.disabled = false);

        incomeItems.forEach( (item, index) => {
            if(index < 1){
                return;
            } else {
                item.remove();
            }
        });

        expensesItems.forEach( (item, index) => {
            if(index < 1){
                return;
            } else {
                item.remove();
            }
        });

        incomePlusBtn.disabled = false;
        expensesPlusBtn.disabled = false;
        depositCheckmark.disabled = false;
        depositCheckmark.checked = false;
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;

        let allInput = document.querySelectorAll('input[type=text]');
        allInput.forEach( item => {
            item.value = '';
        });

        this.budget = 0;
        this.expensesMonth = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.persentDeposit = 0;
        this.moneyDeposit = 0;

        startBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
};
AppData.prototype.eventsListeners = function(){
    this.addCheckField();
    let _this = this;
    startBtn.addEventListener('click', function(){
        if(salaryAmount.value === ''){
            alert('Поле "Месячный доход" пустое!!!');
        } else {
            _this.start();
        }
    });
    cancelBtn.addEventListener('click', () => appData.reset());
    expensesPlusBtn.addEventListener('click', () => appData.addExpensesBlock());
    incomePlusBtn.addEventListener('click', () => appData.addIncomeBlock());
    periodSelect.addEventListener('input', this.changePeriodNumber);
};

const appData = new AppData();
appData.eventsListeners();
