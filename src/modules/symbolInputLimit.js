const symbolInputLimit = () => {
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
        if(item.getAttribute('name') === 'user_name'){
            item.addEventListener('input', () =>{
                item.value = item.value.replace(/[^а-яё\- ]/gi, '');
            });

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

        } else if(item.getAttribute('name') === 'user_message') {
            item.addEventListener('input', () =>{
                item.value = item.value.replace(/[^а-яё\d\.\,\;\!\?\: ]/gi, '');
            });
            blurRegExp(item);
        } else if(item.getAttribute('name') === 'user_email'){
            item.addEventListener('input', () =>{
                item.value = item.value.replace(/[^a-z\@\-\_\.\!\`\*\']/gi, '');
            });
            blurRegExp(item);

        } else if(item.getAttribute('name') === 'user_phone'){
            item.addEventListener('input', () =>{
                item.value = item.value.replace(/[^-()\d\+ ]/g, '');
            });
            item.addEventListener('blur', () =>{
                item.value = item.value.replace(/\-{2,}/g, '-');
                item.value = item.value.replace(/\+{2,}/g, '+');
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
    phone.forEach( item => {
        validationFunc(item);
    });

};

export default symbolInputLimit;