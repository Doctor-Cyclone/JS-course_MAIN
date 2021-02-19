'use strict';

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
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositCheckmark = document.getElementById('deposit-check');

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData{
    constructor(){
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
    }
    //Доход в месяц
    start(){
        const leftSideInputs = document.querySelectorAll('.data input[type=text]');

        leftSideInputs.forEach( item => {
            item.disabled = true;
        });
        incomePlusBtn.disabled = true;
        expensesPlusBtn.disabled = true;
        depositCheckmark.disabled = true;
        depositBank.disabled = true;

        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getIncome();
        this.getAddIncome();
        this.getInfoDeposit();

        this.getBudget();
        this.getTargetMonth();
        this.calcSavedMoney();

        this.showResult();
    }
    //Вывод результатов
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();

        periodSelect.addEventListener('input', () => this.calcSavedMoney());
    }

//ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
//Добавление полей ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        //Очистка добавленнного поля НАИМЕНОВАНИЕ
        const childCloneExpensesItemTitle = cloneExpensesItem.querySelector('.expenses-title');
        childCloneExpensesItemTitle.value = '';
        //Очистка добавленнного поля СУММА
        const childCloneExpensesItemAmount = cloneExpensesItem.querySelector('.expenses-amount');
        childCloneExpensesItemAmount.value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        this.addCheckField();

        if(expensesItems.length === 3){
            expensesPlusBtn.style.display = 'none';
        }
    }
//Добавление ОБЯЗАТЕЛЬНЫХ РАСХОДОВ в объект appData.expenses
    getExpenses(){
        expensesItems.forEach( item => {
            const itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = +cashExpenses;
                }
        });
    }
//Общая сумма ОБЯЗАТЕЛЬНЫХ РАСХОДОВ за месяц
    getExpensesMonth(){
        for(const key in this.expenses){
            this.expensesMonth += this.expenses[key];
        }
    }

//ДОПОЛНИТЕЛЬНЫЕ РАСХОДЫ
//Добавление в массив ВОЗМОЖНЫЕ РАСХОДОВ
    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach( item => {
            item = item.trim(); 
            const itemValueLower = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();

            if(itemValueLower !== ''){
                this.addExpenses.push(itemValueLower);
            }
        });

        this.addCheckField();
    }

//ВОЗМОЖНЫЕ ДОХОДЫ
//Добавление в массив ВОЗМОЖНЫХ ДОХОДОВ
    getAddIncome(){
        additionalIncomeItem.forEach( item => {
            const itemValue = item.value.trim(),
                itemValueLower = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();

            if(itemValueLower !== ''){
                this.addIncome.push(itemValueLower);
            }
        });
    }

//ДОПОЛНИТЕЛЬНЫЙ ДОХОД
//Добавление полей ДОПОЛНИТЕЛЬНЫХ ДОХОДОВ
    addIncomeBlock(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        //Очистка добавленнного поля НАИМЕНОВАНИЕ
        const childCloneIncomeItemTitle = cloneIncomeItem.querySelector('.income-title');
        childCloneIncomeItemTitle.value = '';
        //Очистка добавленнного поля СУММА
        const childCloneIncomeItemAmount = cloneIncomeItem.querySelector('.income-amount');
        childCloneIncomeItemAmount.value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusBtn);
        incomeItems = document.querySelectorAll('.income-items');

        this.addCheckField();

        if(incomeItems.length === 3){
            incomePlusBtn.style.display = 'none';
        }
    }
//Добавление ДОПОЛНИТЕЛЬНОГО ДОХОДА в объект appData.income
    getIncome(){
        incomeItems.forEach( item => {
            const itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

                if(itemIncome !== '' && cashIncome !== ''){
                    this.income[itemIncome] = +cashIncome;
                }
        });

        for(const key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
//Накопления за месяц
    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
//Как долго копить
    getTargetMonth(){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
//Уровень дохода
    getStatusIncome(){
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }
//Динамический подсчёт накоплений за период
    calcSavedMoney(){
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    }
//Динамическое обновление периода
    changePeriodNumber(){
        periodAmount.innerHTML = periodSelect.value;
    }
//Запрет на ввод определённых символов
    addCheckField(){
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
    }
//Очистка полей после нажатия кнопки сбросить
    reset(){
        const leftSideInputs = document.querySelectorAll('.data input[type=text]'),
            allInput = document.querySelectorAll('input[type=text]');

        leftSideInputs.forEach( item => item.disabled = false);
        allInput.forEach( item => item.value = '');

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
        depositBank.disabled = false;
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;

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
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
    }
//Депозит
    getInfoDeposit(){
        if(this.deposit){
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    changePercent(){
        const valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', function(){
                depositPercent.value = depositPercent.value.replace(/[^0-9+$]/gi, '');
                if(depositPercent.value > 0 && depositPercent.value < 101){
                    startBtn.disabled = false;
                    return;
                } else if(depositPercent.value === ''){
                    startBtn.disabled = true;
                } else {
                    alert('Введите процент в диапазоне 1%-100%');
                    depositPercent.value = 1;
                }
            });  
            
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }
    depositHandler(){
        if(depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';

            this.deposit = true;

            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';

            this.deposit = false;

            depositBank.removeEventListener('change', this.changePercent);
        }
    }
//Навешивание событий 
    eventsListeners(){
        this.addCheckField();
        const _this = this;

        startBtn.addEventListener('click', function(){
            if(salaryAmount.value === ''){
                alert('Поле "Месячный доход" пустое!!!');
            } else {
                _this.start();
            }
        });
        cancelBtn.addEventListener('click', () => this.reset());
        expensesPlusBtn.addEventListener('click', () => this.addExpensesBlock());
        incomePlusBtn.addEventListener('click', () => this.addIncomeBlock());
        periodSelect.addEventListener('input', this.changePeriodNumber);
        depositCheck.addEventListener('click', () => this.depositHandler());
    }
}

const appData = new AppData();
appData.eventsListeners();
