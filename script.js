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
        //Блокировка input'ов после нажатия кнопки рассчитать
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

    },
    //Вывод результатов
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();

        periodSelect.addEventListener('input', this.calcSavedMoney);
    },

//ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
    //Добавление полей ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
    addExpensesBlock: function(){
        console.log(this);
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
    },
    //Добавление ОБЯЗАТЕЛЬНЫХ РАСХОДОВ в объект appData.expenses
    getExpenses: function(){
        expensesItems.forEach( item => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = +cashExpenses;
                }
        });
    },
    //Общая сумма ОБЯЗАТЕЛЬНЫХ РАСХОДОВ за месяц
    getExpensesMonth: function(){
        for(let key in this.expenses){
            this.expensesMonth += this.expenses[key];
        }
    },

//ДОПОЛНИТЕЛЬНЫЕ РАСХОДЫ
    //Добавление в массив ДОПОЛНИТЕЛЬНЫХ РАСХОДОВ
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach( item => {
            item = item.trim(); 
            let itemValueLower = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();

            if(itemValueLower !== ''){
                this.addExpenses.push(itemValueLower);
            }
        });
    },

//ВОЗМОЖНЫЕ ДОХОДЫ
    //Добавление в массив ВОЗМОЖНЫХ ДОХОДОВ
    getAddIncome: function(){
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim(),
                itemValueLower = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();

            if(itemValueLower !== ''){
                this.addIncome.push(itemValueLower);
            }
        });
    },

//ДОПОЛНИТЕЛЬНЫЙ ДОХОД
    //Добавление полей ДОПОЛНИТЕЛЬНЫХ ДОХОДОВ
    addIncomeBlock: function(){
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
    },
    //Добавление ДОПОЛНИТЕЛЬНОГО ДОХОДА в объект appData.income
    getIncome: function(){
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
    },
    //Накопления за месяц
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },
    //Как долго копить
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / this.budgetMonth);

        // if(targetMonth < 0 || targetMonth === Infinity){
        //     return 'Цель не будет достигнута';
        // } else {
        //     return 'Цель будет достигнута через ' + targetMonth + ' месяца/ев';
        // }
    },
    //Уровень дохода
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    //Депозит
    getInfoDeposit: function(){
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
    },
    //Динамический подсчёт накоплений за период
    calcSavedMoney: function(){
        incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    },
    //Динамическое обновление периода
    changePeriodNumber: function(){
        periodAmount.innerHTML = periodSelect.value;
    },
    //Запрет на ввод определённых символов
    addCheckField: function(){
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
        
    },
    //Очистка полей после нажатия кнопки сбросить
    reset: function(){
        let leftSideInputs = document.querySelectorAll('.data input[type=text]');
        leftSideInputs.forEach( item => {
            item.removeAttribute("disabled", "disabled");
        });

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

        incomePlusBtn.removeAttribute("disabled", "disabled");
        expensesPlusBtn.removeAttribute("disabled", "disabled");
        depositCheckmark.removeAttribute("disabled", "disabled");
        depositCheckmark.checked = false;

        let allInput = document.querySelectorAll('input[type=text]');
        allInput.forEach( item => {
            item.value = '';
        });

        startBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
    },
};
appData.addCheckField();

startBtn.addEventListener('click', function(){
    if(salaryAmount.value === ''){
        alert('Поле "Месячный доход" пустое!!!');
    } else {
        appData.start();
    }
});
cancelBtn.addEventListener('click', appData.reset);
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});
