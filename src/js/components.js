import checkIcon from '../img/check.svg';

export const featuresToggler = buttons => {

    buttons.forEach(button => {
        button.addEventListener('click', e => {
            buttons.forEach(button2 => {
                button2.closest('.features__item').classList.remove('active');
            })
            e.currentTarget.closest('.features__item').classList.toggle('active');
        })
    });

}

export const couponToggler = button => {

    button.addEventListener('click', e => {
        e.currentTarget.closest('.js-coupon-field').classList.toggle('open');
    })

}

export const couponApplyer = button => {

    button.addEventListener('click', e => {
        if (e.currentTarget.closest('.js-coupon-field').classList.contains('valid')) {
            e.currentTarget.closest('.js-coupon-field').classList.add('applied');
            document.querySelector('.js-message-coupon').innerHTML = 'Your coupon has been applied';
            e.currentTarget.innerHTML = `<img src="${checkIcon}">`
            e.currentTarget.setAttribute('disabled', 'disabled');
        }
    })

}