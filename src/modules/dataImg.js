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

export default dataImg;