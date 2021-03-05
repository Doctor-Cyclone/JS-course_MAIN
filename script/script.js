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

			if(target.classList.contains('close-btn') || target.tagName === 'A'){
				handlerMenu();
			} else{
				return;
			}
		});
	};

	toggleMenu();

//////Плавная прокрутка////////////////////////////////////////////////////////////
	const smoothScrolling = () => {
		const anchors = document.querySelectorAll('menu a[href*="#"]');

		document.querySelector('html').style.scrollBehavior = 'smooth';

		for (let item of anchors) {
			item.addEventListener('click', (event) => {
				event.preventDefault();

				const blockID = item.getAttribute('href').substr(1);
				if(blockID !== 'close'){
					document.getElementById(blockID).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		}
	};
	
	smoothScrolling();

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
				if(!target.closest('.popup-content')){
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

//////Слайдер/////////////////////////////////////////////////////////////////////
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dotUl = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0, interval;

		const dotAdd = () => {
			for(let i = 0; i < slide.length; i++){
				let dot = document.createElement('li');
				dot.classList.add('dot');

				dotUl.append(dot);
			}
		};
		dotAdd();

		const dot = document.querySelectorAll('.dot'),
			prevSlide = (item, index, strClass) => {
				item[index].classList.remove(strClass);
			},
			nextSlide = (item, index, strClass) => {
				item[index].classList.add(strClass);
			},
			autoPlaySlide = () => {
				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');

				currentSlide++;

				if(currentSlide >= slide.length){
					currentSlide = 0;
				}

				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');
			},
			startSlide = (time = 2000) => {
				interval = setInterval(autoPlaySlide, time);
			},
			stopSlide = () => {
				clearInterval(interval);
			};

		slider.addEventListener('click', (event) => {
			event.preventDefault();

			let target = event.target;

			if(!target.matches('.portfolio-btn, .dot')){
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if(target.matches('#arrow-right')){
				currentSlide++;
			} else if(target.matches('#arrow-left')){
				currentSlide--;
			} else if(target.matches('.dot')){
				dot.forEach((item, index) => {
					if(item === target){
						currentSlide = index;
					}
				});
			}

			if(currentSlide >= slide.length){
				currentSlide = 0;
			}
			if(currentSlide < 0){
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', (event) => {
			if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
				stopSlide();
			}
		});
		slider.addEventListener('mouseout', (event) => {
			if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
				startSlide();
			}
		});

		startSlide(1500);
	};

	slider();

//////Data-img/////////////////////////////////////////////////////////////////////
	const dataImg = () => {
		const commandPhoto = document.querySelectorAll('.command__photo');
		
		commandPhoto.forEach( item => {
			const itemSrc = item.src;

			item.addEventListener('mouseenter', (event) => {
				event.target.src = event.target.dataset.img;
			});
			item.addEventListener('mouseleave', (event) => {
				event.target.src = itemSrc;
			});
		});
	};

	dataImg();

//////Ограничения ввода символов///////////////////////////////////////////////////
	const calcSymbol = () => {
		const calcItem = document.querySelectorAll('.calc-block [type="text"]'),
			name = document.querySelectorAll('[placeholder = "Ваше имя"]'),
			message = document.querySelectorAll('[placeholder = "Ваше сообщение"]'),
			email = document.querySelectorAll('[placeholder = "E-mail"]'),
			phone = document.querySelectorAll('[placeholder = "Номер телефона"]');

		calcItem.forEach( item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/[^0-9+$]/gi, '');
			});
		});

		const blurRegExp = (item) => {
			item.addEventListener('blur', () =>{
				item.value = item.value.replace(/\-{2,}/g, '-');
				item.value = item.value.replace(/\s{2,}/g, ' ');
				item.value = item.value.replace(/^[\s]+|[ \s]+$/, '');
				item.value = item.value.replace(/^[/-]+|[/-]+$/, '');
			});
		};

		const validationFunc = (item) => {
			if(item.getAttribute('name') === 'user_name' || item.getAttribute('name') === 'user_message'){
				item.addEventListener('input', () =>{
					item.value = item.value.replace(/[^а-яё\- ]/gi, '');
				});

				if(item.getAttribute('name') === 'user_name'){
					item.addEventListener('blur', () =>{
						item.value = item.value.replace(/\-{2,}/g, '-');
						item.value = item.value.replace(/\s{2,}/g, ' ');
						item.value = item.value.replace(/^[\s]+|[ \s]+$/, '');
						item.value = item.value.replace(/^[/-]+|[/-]+$/, '');

						const newArr = item.value.split(' ').map( item => {
							return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
						});
						item.value = newArr.join(' ');
					});
				} else {
					blurRegExp(item);
				}

			} else if(item.getAttribute('name') === 'user_email'){
				item.addEventListener('input', () =>{
					item.value = item.value.replace(/[^a-z\@\-\_\.\!\`\*\']/gi, '');
				});
				blurRegExp(item);

			} else if(item.getAttribute('name') === 'user_phone'){
				item.addEventListener('input', () =>{
					item.value = item.value.replace(/[^-()\d ]/g, '');
				});
				item.addEventListener('blur', () =>{
					item.value = item.value.replace(/\-{2,}/g, '-');
					item.value = item.value.replace(/\s{2,}/g, ' ');
					item.value = item.value.replace(/^[\s]+|[ \s]+$/, '');
					item.value = item.value.replace(/^[/-]+|[/-]+$/, '');
					item.value = item.value.replace(/\d{12,}/g, item.value.substr(0, 11));

					if(/\+?[78]([-()]*\d){10}/g.test(item.value.replace(/\s{1,}/g, ''))){
						return;
					} else {
						item.value = '';
					}
				});
			}

		};

		name.forEach( item => {
			validationFunc(item);
		});
		message.forEach( item => {
			validationFunc(item);
		});
		email.forEach( item => {
			validationFunc(item);
		});
		// phone.forEach( item => {
		// 	validationFunc(item);
		// });

	};

	calcSymbol();

//////Калькулятор//////////////////////////////////////////////////////////////////
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');
		let step = 0;

		const animation = (total) => {
			let startNum = 0;
			step = (total / 100) * 3;
			const interval = setInterval(() => {
				startNum += step;

				if(startNum >= total){
					clearInterval(interval);
					startNum += total;
				}
				totalValue.textContent = startNum;
			}, 0);
		};

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if(calcCount.value > 1){
				countValue += (calcCount.value - 1) / 10;
			}

			if(calcDay.value && calcDay.value < 5){
				dayValue *= 2;
			} else if(calcDay.value && calcDay.value < 10){
				dayValue *= 1.5;
			}

			if(typeValue && squareValue){
				total = price * typeValue * squareValue * countValue * dayValue;
				animation(total);
			}

			
			//totalValue.textContent = total;
		};

		calcBlock.addEventListener('change', (event) => {
			const target = event.target;

			if(target === calcType || target === calcSquare || target === calcDay || target === calcCount){
				countSum();
			}
		});	
	};

	calc(100);
});