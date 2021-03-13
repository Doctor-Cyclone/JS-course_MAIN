import closePopup from './closePopup';

const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content'),
        scrollWidth = document.documentElement.scrollWidth;

    closePopup();
    
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
    };

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
            closePopup();
        } else {
            if(!target.closest('.popup-content')){
                closePopup();
            }
        }			
    });
};

export default togglePopup;