import closePopup from './closePopup';

const sendForm = (id) => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        loadImg = '<img src = "./images/loadImg.svg" alt = "загрузка">';

    const form = document.getElementById(id),
        formInputs = form.querySelectorAll('input'),
        statusMessage = document.createElement('div');

        statusMessage.style.color = '#fff';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.innerHTML = loadImg;

        const formData = new FormData(form);
        let body = {};
        formData.forEach( (value, key) => {
            body[key] = value;
        });

        postData(body)
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                setTimeout( () => {
                    statusMessage.textContent = '';
                    closePopup();
                }, 2000);
                formInputs.forEach( item => {
                    item.value = '';
                });
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });
    });

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;