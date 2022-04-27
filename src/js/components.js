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

export const payMethodToggler = button => {

    button.addEventListener('click', e => {
        e.currentTarget.closest('.js-alternative-wrapper').classList.toggle('open');
    })

}

export const languageToggler = (langButton, toggleLangButtons) => {
    const langBlock = langButton.closest('.js-language-block');

    langButton.addEventListener('click', e => {
        langBlock.classList.toggle('open');
    })

    toggleLangButtons.forEach(toggleLangButton => {
        toggleLangButton.addEventListener('click', e => {
            if (e.currentTarget.classList.contains('active')) return false;
            
            let newLangText = e.currentTarget.textContent;
            langButton.innerHTML = newLangText;

            toggleLangButtons.forEach(lang => {
                lang.classList.remove('active');
            })
            e.currentTarget.classList.add('active');
            langBlock.classList.toggle('open');
        })
    })

}

export const footerMenuToggler = menuButtons => {

    menuButtons.forEach(button => {
        button.addEventListener('click', e => {
            menuButtons.forEach(button2 => {
                button2.closest('.js-footer-menu-item').classList.remove('open');
            })
            e.currentTarget.closest('.js-footer-menu-item').classList.toggle('open');
        })
    });

}