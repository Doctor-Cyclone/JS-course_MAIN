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

export default smoothScrolling;