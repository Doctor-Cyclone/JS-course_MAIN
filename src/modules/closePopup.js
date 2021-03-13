const closePopup = () => {
    const  popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupInput = popupContent.querySelectorAll('input'),
        scrollWidth = document.documentElement.scrollWidth;

    if(scrollWidth < 768){
        popup.style.display = 'none';
    } else {
        popupContent.style.transition = 'all .2s linear';
        popupContent.style.transform = 'scale(0)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 250);
        popupInput.forEach( item => item.value = '');
    }
};

export default closePopup;