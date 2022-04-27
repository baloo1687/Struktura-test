import validator from 'validator';
import trashIcon from '../img/trash.svg';
require("jquery.payment");

export default class FormValidator {
    constructor() {
        this.validator = validator;

        this.isValid = {
            email: false,
            cardNumber: false,
            cardDate: false,
            cardCvv: false,
            name: false
        }

        this.inputsNodes = {
                email: document.querySelector('.js-validate-email'),
                number: document.querySelector('.js-validate-cardnumber'),
                date: document.querySelector('.js-validate-carddate'),
                cvv: document.querySelector('.js-validate-cardcvv'),
                name: document.querySelector('.js-validate-name'),
                coupon: document.querySelector('.js-validate-coupon')
        }

        this.submitButton = document.querySelector('.js-submit');

        this.messagesNode = {
            email: document.querySelector('.js-message-email'),
            card: document.querySelector('.js-message-card'),
            name: document.querySelector('.js-message-name'),
            coupon: document.querySelector('.js-message-coupon')
        }
    }

    init() {
        this.emailValidator();
        this.cardNumberValidator();
        this.cardDateValidator();
        this.cardCvvValidator();
        this.nameValidator();
        this.couponValidator();
        this.sendQuery();
    }

    emailValidator() {
        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.email.addEventListener(evt, (e) => {
                let emailIsValid = this.validator.isEmail(e.currentTarget.value);
                if (emailIsValid) {
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.email.innerHTML = '';
                    this.isValid.email = true;
                } else {
                    this.isValid.email = false;
                    e.currentTarget.classList.add('error');
                    if (this.validator.isEmpty(e.currentTarget.value)) {
                        this.messagesNode.email.innerHTML = 'Required';
                    } else {
                        this.messagesNode.email.innerHTML = 'Your email is incomplete';
                    }
                }

                this.changeSubmitStatus();
            })
        })
        
    }

    cardNumberValidator() {
        $('.js-validate-cardnumber').payment('formatCardNumber');

        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.number.addEventListener(evt, (e) => {
                let cardNumberIsValid = $.payment.validateCardNumber(e.currentTarget.value);

                if (cardNumberIsValid) {
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.card.innerHTML = '';
                    this.isValid.cardNumber = true;
                } else {
                    this.isValid.cardNumber = false;
                    e.currentTarget.classList.add('error');
                    if (this.validator.isEmpty(e.currentTarget.value)) {
                        this.messagesNode.card.innerHTML = 'Required';
                    } else {
                        this.messagesNode.card.innerHTML = 'Your card number is invalid';
                    }
                }

                this.changeSubmitStatus();
            });

        })
    }

    cardDateValidator() {
        $('.js-validate-carddate').payment('formatCardExpiry');

        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.date.addEventListener(evt, (e) => {
                const expDate = $.payment.cardExpiryVal(e.currentTarget.value);
                const currentDate = {
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear()
                }

                let cardDateIsValid = $.payment.validateCardExpiry(expDate.month, expDate.year);
                let cardDateIsFuture = new Date(expDate.year, expDate.month) >= new Date (currentDate.year, currentDate.month) ? true : false;
                
                if (cardDateIsValid) {
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.card.innerHTML = '';
                    this.isValid.cardDate = true;
                } else {
                    this.isValid.cardDate = false;
                    e.currentTarget.classList.add('error');
                    if (this.validator.isEmpty(e.currentTarget.value)) {
                        this.messagesNode.card.innerHTML = 'Required';
                    } else if (!cardDateIsFuture && expDate.year) {
                        this.messagesNode.card.innerHTML = 'Your cards expiration year is in the past';
                    } else {
                        this.messagesNode.card.innerHTML = 'Your cards expiration date is incomplete';
                    }
                }
                this.changeSubmitStatus();
            });
        })
    }

    cardCvvValidator() {
        $('.js-validate-cardcvv').payment('formatCardCVC');

        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.cvv.addEventListener(evt, (e) => {
                let cardCvvIsValid = $.payment.validateCardCVC(e.currentTarget.value);
                
                if (cardCvvIsValid) {
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.card.innerHTML = '';
                    this.isValid.cardCvv = true;
                } else {
                    this.isValid.cardCvv = false;
                    e.currentTarget.classList.add('error');
                    if (this.validator.isEmpty(e.currentTarget.value)) {
                        this.messagesNode.card.innerHTML = 'Required';
                    }
                }

                this.changeSubmitStatus();
            });
        })
    }

    nameValidator() {
        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.name.addEventListener(evt, (e) => {
                if (this.validator.isEmpty(e.currentTarget.value)) {
                    e.currentTarget.classList.add('error');
                    this.messagesNode.name.innerHTML = 'Required';
                    this.isValid.name = false;
                } else {
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.name.innerHTML = '';
                    this.isValid.name = true;
                }

                this.changeSubmitStatus();
            })
        })
    }

    couponValidator() {
        ['keyup', 'mouseup'].forEach((evt) => {
            this.inputsNodes.coupon.addEventListener(evt, (e) => {
                if (this.validator.isEmpty(e.currentTarget.value)) {
                    e.currentTarget.closest('.js-coupon-field').classList.remove('valid');
                    e.currentTarget.closest('.js-coupon-field').classList.remove('applied');
                    e.currentTarget.classList.remove('error');
                    this.messagesNode.coupon.innerHTML = '';
                    document.querySelector('.js-coupon-apply').innerHTML = 'Apply';
                } else {
                    if (e.currentTarget.value == 'promo10') {
                        e.currentTarget.closest('.js-coupon-field').classList.add('valid');
                        e.currentTarget.classList.remove('error');

                        if (e.currentTarget.closest('.js-coupon-field').classList.contains('applied')) return false;
                        
                        this.messagesNode.coupon.innerHTML = '';
                        document.querySelector('.js-coupon-apply').innerHTML = 'Apply';
                    } else {
                        e.currentTarget.closest('.js-coupon-field').classList.remove('applied');
                        e.currentTarget.closest('.js-coupon-field').classList.remove('valid');
                        e.currentTarget.classList.add('error');
                        this.messagesNode.coupon.innerHTML = 'Invalid coupon code :(';
                        document.querySelector('.js-coupon-apply').innerHTML = `<img src="${trashIcon}">`;
                        document.querySelector('.js-coupon-apply').removeAttribute('disabled');
                    }
                }
            })
        })
    }

    changeSubmitStatus() {
        if (Object.values(this.isValid).every(element => element == true)) {
            this.submitButton.removeAttribute('disabled');

            return true;
        } else {
            this.submitButton.setAttribute('disabled', 'disabled');

            return false;
        }
    }

    sendQuery() {
        this.submitButton.addEventListener('click', e => {
            e.preventDefault();
            if (this.changeSubmitStatus()) {
                const data = {
                    email: this.inputsNodes.email.value,
                    card: {
                        number: this.inputsNodes.number.value,
                        date: this.inputsNodes.date.value,
                        cvv: this.inputsNodes.cvv.value,
                        name: this.inputsNodes.name.value,
                    },
                    coupon: this.inputsNodes.coupon.value == 'promo10' ? this.inputsNodes.coupon.value : false
                }
    
                // API for test queries https://reqres.in/
                const url = 'https://reqres.in/api/users'
    
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: 'json'
                })
                .done(data => {
                    alert('Your pay has sent!')
                    console.log(data);
                })
            }
        })
    }
}