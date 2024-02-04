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

interface inputValidationReturn {
    isValid: boolean
    typeError: 'valueMissing' | 'tooShort' | 'invalidCharacters' | undefined
    inputElement: HTMLInputElement | null
}

function validateUsername(): inputValidationReturn {
    const regex = /^[\w\s\-]*$/
    const value = usernameInput!.value.trim();

    const isValid = false;
    const inputElement = usernameInput;

    if (value?.length === 0) {
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

function validatePassword(): inputValidationReturn {
    const value = passwordInput?.value;

    if (value?.length === 0) {
        return { inputElement: passwordInput, isValid: false, typeError: 'valueMissing' };
    }

    return {
        inputElement: passwordInput,
        isValid: true,
        typeError: undefined
    }
}

function togglePasswordVisibility() {
    const type = passwordField?.getAttribute('type');

    if (type === 'password') {
        passwordField?.setAttribute('type', 'text');
        passwordIcon?.setAttribute('src', visibilityOffIconPath);
        btnTogglePassword?.setAttribute('aria-checked', 'true');
    }

    else {
        passwordField?.setAttribute('type', 'password');
        passwordIcon?.setAttribute('src', visibilityIconPath);
        btnTogglePassword?.setAttribute('aria-checked', 'false');
    }
}

function submitForm(e: SubmitEvent) {
    e.preventDefault();

    const username = validateUsername();
    const password = validatePassword()

    if (!username.isValid) {
        const message = returnErrorMessage({ typeError: username.typeError });
        usernameError!.textContent = message ?? 'Campo inválido';
        usernameInput?.classList.add('is-input-invalid');
    }

    if (!password.isValid) {
        const message = returnErrorMessage({ typeError: password.typeError });
        passwordError!.textContent = message ?? 'Campo inválido';
        passwordInput?.classList.add('is-input-invalid');
    }

    const firstInvalidElement = document.querySelector<HTMLInputElement>('.is-input-invalid');
    firstInvalidElement?.focus();

    if (!firstInvalidElement) {
        const target = e.target as HTMLFormElement;
        target.submit();
    }
}

function handleCredentialInputs(e: Event) {
    const target = e.target as HTMLInputElement;
    target.classList.remove('is-input-invalid');

    const username = validateUsername();
    const password = validatePassword();

    username.isValid && password.isValid
        ? submitButton?.setAttribute('aria-disabled', 'false')
        : submitButton?.setAttribute('aria-disabled', 'true');    
}

function returnErrorMessage({ typeError }: { typeError: inputValidationReturn["typeError"] }) {
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

function usernameInputFocusout() {
    const username = validateUsername();

    if (username.isValid) {
        return;
    }

    if (username.typeError === "valueMissing") {
        usernameInput!.value = "";
        return;
    }

    const message = returnErrorMessage({ typeError: username.typeError });
    usernameError!.textContent = message ?? 'Campo inválido';
    usernameInput?.classList.add('is-input-invalid');
}

function passwordInputFocusout() {
    const password = validatePassword();

    if (password.isValid || password.typeError === 'valueMissing') {
        return;
    }

    const message = returnErrorMessage({ typeError: password.typeError });
    passwordError!.textContent = message ?? 'Campo inválido';
    passwordInput?.classList.add('is-input-invalid');
}

btnTogglePassword?.addEventListener('click', togglePasswordVisibility);
loginForm?.addEventListener('submit', submitForm);
usernameInput?.addEventListener('focusout', () => usernameInputFocusout());
passwordInput?.addEventListener('focusout', () => passwordInputFocusout());
credentialInputs.forEach(input => input.addEventListener('input', handleCredentialInputs));