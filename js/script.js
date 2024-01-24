"use strict";
const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';
const passwordField = document.querySelector('#ipassword');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.querySelector('.icon');
function togglePasswordVisibility() {
    const type = passwordField === null || passwordField === void 0 ? void 0 : passwordField.getAttribute('type');
    if (type === 'password') {
        passwordField === null || passwordField === void 0 ? void 0 : passwordField.setAttribute('type', 'text');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityOffIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-pressed', 'true');
    }
    else {
        passwordField === null || passwordField === void 0 ? void 0 : passwordField.setAttribute('type', 'password');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-pressed', 'false');
    }
}
btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.addEventListener('click', togglePasswordVisibility);
