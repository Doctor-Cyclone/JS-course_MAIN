'use strict';

const greeting = document.getElementById('greeting'),
	weekDay = document.getElementById('weekDay'),
	localTime = document.getElementById('localTime'),
	untilTheNewYear = document.getElementById('untilTheNewYear'),
	nowDate = new Date();

//Расчёт времени суток//////////////////////////////////////////////////////////////
const timesOfDayCheck = function(dayTime){
	if(dayTime >= 4 && dayTime <= 12){
		return 'Доброе утро';
	} else if(dayTime >= 13 && dayTime <= 16){
		return 'Добрый день';
	} else if(dayTime >= 17 && dayTime <= 23){
		return 'Добрый вечер';
	} else {
		return 'Доброй ночи';
	}
};
//Время до Нового Года//////////////////////////////////////////////////////////////
const timesToNewYear = function(newYearDate){
	let dateStop = new Date(newYearDate).getTime(),
		datNow = new Date().getTime(),
		timeRemaining = (dateStop - datNow) / 1000,
		days = Math.floor(timeRemaining / 60 / 60 / 24);
	return days;
};
//Подборка слова ДЕНЬ//////////////////////////////////////////////////////////////
//Максимально колхозно, другого способа пока не придумал(((
const wordsEnd = function(){
	const day = timesToNewYear('31 december 2021');
	if(day % 10 === 1 && day % 100 !== 11){
		return `${day} день`;
	} else if (day % 10 >= 2 && day % 10 <= 4 && day % 100 !== 12 && day % 100 !== 13 && day % 100 !== 14){
		return `${day} дня`;
	} else {
		return `${day} дней`;
	}
};
//Вывод информации на экран//////////////////////////////////////////////////////////////
const info = function(){
	let weekDaytext = nowDate.toLocaleString('ru', {weekday: 'long'}),
		localTimeText = nowDate.toLocaleString('en', {hour: 'numeric', minute: 'numeric', second: 'numeric'});

	greeting.textContent = timesOfDayCheck(nowDate.getHours());
	weekDay.textContent = `Сегодня: ${weekDaytext.charAt(0).toUpperCase() + weekDaytext.substring(1).toLowerCase()}`;
	localTime.textContent = `Текущее время:	${localTimeText}`;
	untilTheNewYear.textContent = `До нового года осталось ${wordsEnd()}`
};

info();