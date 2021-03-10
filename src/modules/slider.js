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

export default slider;