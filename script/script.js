window.addEventListener('DOMContentLoaded', function(){
	'use strict';

//////Таймер/////////////////////////////////////////////////////////////////////////
	const countTimer = (deadLine) =>{
		const timeDays = document.querySelector('#timer-days'), 
			timeHours = document.querySelector('#timer-hours'),
			timeMinutes = document.querySelector('#timer-minutes'),
			timeSeconds = document.querySelector('#timer-seconds');

		//Добавление 0 в начале числа/////////////////////////////////////////////////////////////////////////
		function numCheck(num){
			num = num.toString().split('');
			if(num.length === 1){
				return `0${num}`;
			} else {
				return num.join('');
			}
		}	

		//Получение всех данных/////////////////////////////////////////////////////////////////////////
		function getTimeRemainig(){
			let dateStop = new Date(deadLine).getTime(),
				datNow = new Date().getTime(),
				timeRemaining = (dateStop - datNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),	
				hours = Math.floor(timeRemaining / 60 / 60) % 24,
				days = Math.floor(timeRemaining / 60 / 60 / 24);
			return {days, hours, minutes, seconds , timeRemaining};
		}

		//Вывод времени на экран/////////////////////////////////////////////////////////////////////////
		function updateClock(){
			const timer = getTimeRemainig();

			if(timer.timeRemaining > 0){

				timeDays.textContent = numCheck(timer.days);
				timeHours.textContent = numCheck(timer.hours);
				timeMinutes.textContent = numCheck(timer.minutes);
				timeSeconds.textContent = numCheck(timer.seconds);
			} else {
				timeDays.style.color = 'red';
				timeHours.style.color = 'red';
				timeMinutes.style.color = 'red';
				timeSeconds.style.color = 'red';

				timeDays.textContent = '00';
				timeHours.textContent = '00';
				timeMinutes.textContent = '00';
				timeSeconds.textContent = '00';
				clearInterval(idInterval);
			}
		}

		const idInterval = setInterval(updateClock, 1000);
		updateClock();
	};

	countTimer('31 december 2021');

//////Меню/////////////////////////////////////////////////////////////////////////
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => menu.classList.toggle('active-menu');	

		btnMenu.addEventListener('click', handlerMenu);

		menu.addEventListener('click', (event) => {
			let target = event.target;

			if(target.classList.contains('close-btn') || target.tagName === 'a'){
				handlerMenu();
			} else{
				return;
			}
		});
	};

	toggleMenu();
	
//////PopUp/////////////////////////////////////////////////////////////////////////
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content'),
			scrollWidth = document.documentElement.scrollWidth;

		const closeAnimation = () => {
			if(scrollWidth < 768){
				popup.style.display = 'none';
			} else {
				popupContent.style.transition = 'all .2s linear';
				popupContent.style.transform = 'scale(0)';
				setTimeout(() => {
					popup.style.display = 'none';
				}, 250);
			}
		}
		const openAnimation = () => {
			if(scrollWidth < 768){
				popup.style.display = 'block';
			} else {
				popupContent.style.transform = 'scale(0)';
				popup.style.display = 'block';
				setTimeout(() => {
					popupContent.style.transition = 'all .2s linear';
					popupContent.style.transform = 'scale(1)';
				}, 100);
			}
		}

		//Открытие//////////////////////////////////////////////////////////////////
		popupBtn.forEach( item => {
			item.addEventListener('click', () => {
				openAnimation();
			});
		});

		//Закрытие/////////////////////////////////////////////////////////////////
		popup.addEventListener('click', (event) => {
			let target = event.target;

			if(target.classList.contains('popup-close')){
				closeAnimation();
			} else {
				target = target.closest('.popup-content');

				if(!target){
					closeAnimation();
				}
			}			
		});
	};

	togglePopup();

//////Табы/////////////////////////////////////////////////////////////////////////
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = document.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) => {
			for(let i = 0; i < tabContent.length; i++){
				if(index === i){
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
				target = target.closest('.service-header-tab');

			if(target){
				tab.forEach( (item, index) => {
					if(item === target){
						toggleTabContent(index);
					}
				});
			}
		});
	};

	tabs();
});