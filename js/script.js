"use strict";
const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';
const passwordField = document.querySelector('#ipassword');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.querySelector('.icon');
const loginForm = document.querySelector('.js-form');
const credentialInputs = document.querySelectorAll('#iusername, #ipassword');
const usernameInput = document.querySelector('#iusername');
const passwordInput = document.querySelector('#ipassword');
const usernameError = document.querySelector('.js-username-error');
const passwordError = document.querySelector('.js-password-error');
const submitButton = document.querySelector('.js-btn-submit');
function validateUsername({ ignoreInputEmpty }) {
    const regex = /^[\w\s\-]*$/;
    const value = usernameInput.value.trim();
    const isValid = false;
    const inputElement = usernameInput;
    let typeError;
    // limpar campo caso só tenha espaços
    if (/^[\s]+$/.test(usernameInput.value)) {
        usernameInput.value = "";
    }
    if (!ignoreInputEmpty && (value === null || value === void 0 ? void 0 : value.length) === 0) {
        return { isValid, inputElement, typeError: "valueMissing" };
    }
    if (!regex.test(value)) {
        return { isValid, inputElement, typeError: "invalidCharacters" };
    }
    if (value.length > 0 && value.length < 2) {
        return { isValid, inputElement, typeError: "tooShort" };
    }
    usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.classList.remove('is-input-invalid');
    return { isValid: false, typeError: undefined, inputElement: usernameInput };
}
function validatePassword({ ignoreInputEmpty }) {
    const value = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
    if (!ignoreInputEmpty && (value === null || value === void 0 ? void 0 : value.length) === 0) {
        passwordError.textContent = 'Preencha o campo';
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.classList.add('is-input-invalid');
        return;
    }
    passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.classList.remove('is-input-invalid');
}
function togglePasswordVisibility() {
    const type = passwordField === null || passwordField === void 0 ? void 0 : passwordField.getAttribute('type');
    if (type === 'password') {
        passwordField === null || passwordField === void 0 ? void 0 : passwordField.setAttribute('type', 'text');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityOffIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-checked', 'true');
    }
    else {
        passwordField === null || passwordField === void 0 ? void 0 : passwordField.setAttribute('type', 'password');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-checked', 'false');
    }
}
function submitForm(e) {
    e.preventDefault();
    validatePassword({});
    validateUsername({});
    const firstInvalidElement = document.querySelector('.is-input-invalid');
    firstInvalidElement === null || firstInvalidElement === void 0 ? void 0 : firstInvalidElement.focus();
    if (!firstInvalidElement) {
        const target = e.target;
        target.submit();
    }
}
btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.addEventListener('click', togglePasswordVisibility);
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', submitForm);
usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.addEventListener('focusout', () => validateUsername({ ignoreInputEmpty: true }));
passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('focusout', () => validatePassword({ ignoreInputEmpty: true }));
credentialInputs.forEach(input => input.addEventListener('input', (e) => {
    const target = e.target;
    target.classList.remove('is-input-invalid');
    // button aria-disabled
}));
/*
    .is-input-invalid

    MENSAGENS DE ERRO
        "Preencha o campo"
        "Caracteres especiais não são permitidos no nome de usuário"
        "Deve ter pelo menos 2 caracteres"
*/ 
