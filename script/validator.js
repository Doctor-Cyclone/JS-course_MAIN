'use strict';

class Validator{
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        console.log(this.form);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !== 'button';
        });
        this.error = new Set();
    }

    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(item => item.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', event => {
            this.elementsForm.forEach( item => this.checkIt({target: item}));
            if(this.error.size){
                event.preventDefault();
            }
        });
    }
    
    isValid(element){
        const validatorMethod = {
            notEmpty(element){
                if(element.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(element, pattern){
                return pattern.test(element.value);
            }
        };

        if(this.method){
            const method = this.method[element.id];
    
            if(method){
                return method.every( item => validatorMethod[item[0]](element, this.pattern[item[1]]));
            }
        }

        return true;
    }

    checkIt(event){
        const target = event.target;

        if(this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(element){
        element.classList.remove('success');
        element.classList.add('error');

        if(element.nextElementSibling && element.nextElementSibling.classList.contains('validator-error')){
            return;
        }

        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error';
        errorDiv.classList.add('validator-error');

        element.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(element){
        element.classList.remove('error');
        element.classList.add('success');

        if(element.nextElementSibling && element.nextElementSibling.classList.contains('validator-error')){
            element.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
            input.success{
                border: 2px solid green
            }
            input.error{
                border: 2px solid red
            }
            .validator-error{
                font-size: 12px;
                font-family: sans-serif;
                color: red;
            }
        `;
        document.head.appendChild(style);
    }

    setPattern(){
        if(!this.pattern.phone){
            this.pattern.phone = /^\+?[78]([-()]+\d){10}$/;
        }

        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        
    }
}