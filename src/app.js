import "./scss/index.scss";
import { featuresToggler, couponToggler, couponApplyer } from "./js/components.js";
import FormValidator from "./js/validator";

const Validator = new FormValidator();
Validator.init();

featuresToggler(document.querySelectorAll('.js-features-button'));
couponToggler(document.querySelector('.js-coupon-button'));
couponApplyer(document.querySelector('.js-coupon-apply'));
