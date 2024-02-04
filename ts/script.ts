const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';

const passwordField = document.querySelector<HTMLInputElement>('#ipassword');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword?.querySelector('.icon');

const loginForm = document.querySelector<HTMLFormElement>('.js-form');
const credentialInputs = document.querySelectorAll('#iusername, #ipassword');

const usernameInput = document.querySelector<HTMLInputElement>('#iusername');
const passwordInput = document.querySelector<HTMLInputElement>('#ipassword');
const usernameError = document.querySelector('.js-username-error');
const passwordError = document.querySelector('.js-password-error');
const submitButton = document.querySelector('.js-btn-submit');

btnTogglePassword?.addEventListener('click', togglePasswordVisibility);
loginForm?.addEventListener('submit', submitForm);
usernameInput?.addEventListener('focusout', () => usernameInputFocusout());
passwordInput?.addEventListener('focusout', () => passwordInputFocusout());
credentialInputs.forEach(input => input.addEventListener('input', handleCredentialInputs));