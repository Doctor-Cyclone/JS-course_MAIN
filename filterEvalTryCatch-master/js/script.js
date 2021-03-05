'use strict';
//Функция фильтрации по типу, которая принемает два аргумента:
	//тип данных по которому будет происходить фильтрация
	//массив(полученный с помощью SPREAD оператора) со значениями из INPUT'a
	//С помощью метода FILTER в массив заносятся только те значения, которые прошли проверку
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//Функция скрывающая блоки с ответами
	hideAllResponseBlocks = () => {
		//Массив из коллекции блоков
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//Каждому элементу массива меняется значение DISPLAY на значение NONE
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//Функция показывающая блоки с ответами, которая принемает три аргумента:
		//селектор блока, сообщение, SPAN селектор
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//Вызов "СКРЫВАЮЩЕЙ" функции
		hideAllResponseBlocks();
		//Получение элемента по переданному селектору
		//Полученному элементу меняется значение DISPLAY на значение BLOCK
		document.querySelector(blockSelector).style.display = 'block';
		//Если был передан SPAN_SELECTOR
		//Внутрь этого SPAN'a добавляется MSG_TEXT
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//Функция показа ошибки
	//Вызов "ПОКАЗЫВАЮЩЕЙ" функции в которую передаётся три аргумента:
		//селектор блока с ошибкой
		//сообщение для вывода
		//SPAN селектор ошибки
	showError = msgText =>showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//Функция показа результата
	//Вызов "ПОКАЗЫВАЮЩЕЙ" функции в которую передаётся три аргумента:
		//селектор блока с результатом
		//сообщение для вывода
		//SPAN селектор результата
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//Функция отсутствия результата
	//Вызов "ПОКАЗЫВАЮЩЕЙ" функции в которую передаётся один аргумент:
		//селектор блока с без результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//Функция фильтрации по типу данных, которая принемает два аргумента:
		//Значение селекта
		//Строку со значениями инпута с данными
	tryFilterByType = (type, values) => {
		//Создание конструкции перехвата ошибок
		try {
			//Создаётся строка из массива(с помощью .join(", ")) полученного при вызове функции фильтрации
				//Функция фильтрации вызывается с помощью метода EVAL(), который выполняет код, представленный в виде строки.
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//Создаётся переменная, в которой хранится:
			const alertMsg = (valuesArray.length) ?
					//если массив VALUES_ARRAY не пустой, шаблонная строка `Данные с типом ${type}: ${valuesArray}`
						//с интерполяцией ${type} и ${valuesArray}
				`Данные с типом ${type}: ${valuesArray}` :
					//если массив VALUES_ARRAY пустой, шаблонная строка `Отсутствуют данные типа ${type}`
						//с интерполяцией ${type}
				`Отсутствуют данные типа ${type}`;
				//Вызов функции показа результата, в которую передаётся агрумент с текстом
			showResults(alertMsg);
		//Если произовшла ошибка	
		} catch (e) {
			//Вызывается функция показа ошибки и выводит на экран текст ошибки
			showError(`Ошибка: ${e}`);
		}
	};

//Получение кнопки с ID filter-btn
const filterButton = document.querySelector('#filter-btn');

//Навешивание на кнопку слушателя с событием CLICK,
	//которая вызывается стрелочную функцию с EVENT
filterButton.addEventListener('click', e => {
	//Получение селектора с типом данных
	const typeInput = document.querySelector('#type');
	//Получение инпута с данными
	const dataInput = document.querySelector('#data');

	//Проверка поля с данными на пустоту
	//Если пусто:
	if (dataInput.value === '') {
		//Устанавливается сообщение для DATA_INPUT'a
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//Вызов функции с отсутствием результата
		showNoResults();
	//Если НЕ пусто:	
	} else {
		//Сообщение очищается
		dataInput.setCustomValidity('');
		//Сбрасывается стандартное поведение кнопки FILTER_BUTTON
		e.preventDefault();
		//Вызывается функция фильтрации и передаёт два аргумента:
			//Значение выбранного селекта (с удалёнными пробелами в начале и конце)
			//Строку со значениями инпута с данными (с удалёнными пробелами в начале и конце)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

