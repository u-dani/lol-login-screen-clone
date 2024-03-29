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
const togglePasswordButton = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.querySelector('.icon');
const dropdownMenu = document.querySelector('.js-dropdown-menu');
const toggleMenuButton = document.querySelector('.js-menu-toggle');
const languages = [
    'Bahasa Indonesia',
    'Bahasa Melayu',
    'Deutsch',
    'English (PH)',
    'English (SG)',
    'English (US)',
    'Espanõl (LATAM)',
    'Espanõl (ES)',
    'Français',
    'Italiano',
    'Magyar',
    'Polski',
    'Português',
    'Română',
    'Tiếng Việt',
    'Türkçe',
    'Čeština',
    'Ελληνικά',
    'Русский',
    '한국어',
    '日本語',
    'ภาษาไทย',
    '繁體中文'
];
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
        togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.setAttribute('aria-checked', 'true');
    }
    else {
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.setAttribute('type', 'password');
        passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.setAttribute('src', visibilityIconPath);
        togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.setAttribute('aria-checked', 'false');
    }
}
function toggleDropdownMenu() {
    if (toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.classList.contains('menu-is-expanded')) {
        document.removeEventListener('click', handleClickMenu);
        toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.classList.remove('menu-is-expanded');
        toggleMenuButton.setAttribute('aria-expanded', 'false');
    }
    else {
        document.addEventListener('click', handleClickMenu);
        toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.classList.add('menu-is-expanded');
        toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.setAttribute('aria-expanded', 'true');
    }
}
function handleClickMenu({ target }) {
    if (target.classList.contains('js-menu-toggle')) {
        return;
    }
    if (!(dropdownMenu === null || dropdownMenu === void 0 ? void 0 : dropdownMenu.matches(':hover'))) { // checar se o click é fora do menu
        document.removeEventListener('click', handleClickMenu);
        toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.click();
    }
}
function languagesInSelect({ selectElement }) {
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.textContent = lang;
        option.setAttribute('value', lang);
        selectElement === null || selectElement === void 0 ? void 0 : selectElement.appendChild(option);
    });
    const defaultOption = selectElement.querySelector('[value="Português"]');
    defaultOption === null || defaultOption === void 0 ? void 0 : defaultOption.setAttribute('selected', '');
}
credentialInputs.forEach(input => input.addEventListener('input', handleCredentialInputs));
usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.addEventListener('focusout', () => usernameInputFocusout());
passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('focusout', () => passwordInputFocusout());
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', submitForm);
togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.addEventListener('click', togglePasswordVisibility);
toggleMenuButton === null || toggleMenuButton === void 0 ? void 0 : toggleMenuButton.addEventListener('click', toggleDropdownMenu);
window.onload = () => {
    const selectArr = document.querySelectorAll('.js-select-language');
    selectArr.forEach(select => {
        languagesInSelect({ selectElement: select });
    });
};
