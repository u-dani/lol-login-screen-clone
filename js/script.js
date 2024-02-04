"use strict";
const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';
const loginForm = document.querySelector('.js-form');
const credentialInputs = document.querySelectorAll('#iusername, #ipassword');
const usernameInput = document.querySelector('#iusername');
const passwordInput = document.querySelector('#ipassword');
const usernameError = document.querySelector('.js-username-error');
const passwordError = document.querySelector('.js-password-error');
const submitButton = document.querySelector('.js-btn-submit');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.querySelector('.icon');
function validateUsername() {
    const regex = /^[\w\s\-]*$/;
    const value = usernameInput.value.trim();
    const isValid = false;
    const inputElement = usernameInput;
    if ((value === null || value === void 0 ? void 0 : value.length) === 0) {
        return { isValid, inputElement, typeError: "valueMissing" };
    }
    if (!regex.test(value)) {
        return { isValid, inputElement, typeError: "invalidCharacters" };
    }
    if (value.length > 0 && value.length < 2) {
        return { isValid, inputElement, typeError: "tooShort" };
    }
    return { isValid: true, inputElement: usernameInput, typeError: undefined };
}
function validatePassword() {
    const value = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
    if ((value === null || value === void 0 ? void 0 : value.length) === 0) {
        return { inputElement: passwordInput, isValid: false, typeError: 'valueMissing' };
    }
    return {
        inputElement: passwordInput,
        isValid: true,
        typeError: undefined
    };
}
function returnErrorMessage({ typeError }) {
    if (typeError === "valueMissing") {
        return "Preencha o campo";
    }
    if (typeError === "invalidCharacters") {
        return "Caracteres especiais não são permitidos no nome de usuário";
    }
    if (typeError === "tooShort") {
        return "Deve ter pelo menos 2 caracteres";
    }
}
function handleCredentialInputs(e) {
    const target = e.target;
    target.classList.remove('is-input-invalid');
    const username = validateUsername();
    const password = validatePassword();
    username.isValid && password.isValid
        ? submitButton === null || submitButton === void 0 ? void 0 : submitButton.setAttribute('aria-disabled', 'false')
        : submitButton === null || submitButton === void 0 ? void 0 : submitButton.setAttribute('aria-disabled', 'true');
}
function usernameInputFocusout() {
    const username = validateUsername();
    if (username.isValid) {
        return;
    }
    if (username.typeError === "valueMissing") {
        usernameInput.value = "";
        return;
    }
    const message = returnErrorMessage({ typeError: username.typeError });
    usernameError.textContent = message !== null && message !== void 0 ? message : 'Campo inválido';
    usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.classList.add('is-input-invalid');
}
function passwordInputFocusout() {
    const password = validatePassword();
    if (password.isValid || password.typeError === 'valueMissing') {
        return;
    }
    const message = returnErrorMessage({ typeError: password.typeError });
    passwordError.textContent = message !== null && message !== void 0 ? message : 'Campo inválido';
    passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.classList.add('is-input-invalid');
}
function submitForm(e) {
    e.preventDefault();
    const username = validateUsername();
    const password = validatePassword();
    if (!username.isValid) {
        const message = returnErrorMessage({ typeError: username.typeError });
        usernameError.textContent = message !== null && message !== void 0 ? message : 'Campo inválido';
        usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.classList.add('is-input-invalid');
    }
    if (!password.isValid) {
        const message = returnErrorMessage({ typeError: password.typeError });
        passwordError.textContent = message !== null && message !== void 0 ? message : 'Campo inválido';
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.classList.add('is-input-invalid');
    }
    const firstInvalidElement = document.querySelector('.is-input-invalid');
    firstInvalidElement === null || firstInvalidElement === void 0 ? void 0 : firstInvalidElement.focus();
    if (!firstInvalidElement) {
        const target = e.target;
        target.submit();
    }
}
function togglePasswordVisibility() {
    const type = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.getAttribute('type');
    if (type === 'password') {
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.setAttribute('type', 'text');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityOffIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-checked', 'true');
    }
    else {
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.setAttribute('type', 'password');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityIconPath);
        btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.setAttribute('aria-checked', 'false');
    }
}
credentialInputs.forEach(input => input.addEventListener('input', handleCredentialInputs));
usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.addEventListener('focusout', () => usernameInputFocusout());
passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('focusout', () => passwordInputFocusout());
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', submitForm);
btnTogglePassword === null || btnTogglePassword === void 0 ? void 0 : btnTogglePassword.addEventListener('click', togglePasswordVisibility);
