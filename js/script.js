"use strict";
const toggleIcon = document.querySelector('.js-toggle-profile-navbar');
const profileNavbar = document.querySelector('.js-profile-navbar');
const requiredInputs = document.querySelectorAll('.js-required-input');
const btnSubmit = document.querySelector('.js-btn-submit');
const validateSubmitButton = () => {
    const isValid = [...requiredInputs].every(input => input.value !== '');
    isValid ? btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.removeAttribute('disabled') : btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.setAttribute('disabled', '');
};
requiredInputs.forEach(field => field.addEventListener('input', validateSubmitButton));
toggleIcon === null || toggleIcon === void 0 ? void 0 : toggleIcon.addEventListener('click', () => {
    if (!profileNavbar) {
        return;
    }
    profileNavbar.classList.contains('is-hide')
        ? profileNavbar.classList.remove('is-hide')
        : profileNavbar.classList.add('is-hide');
});
