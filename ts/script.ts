const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';

const loginForm = document.querySelector<HTMLFormElement>('.js-form');
const credentialInputs = document.querySelectorAll('#iusername, #ipassword');

const usernameInput = document.querySelector<HTMLInputElement>('#iusername');
const passwordInput = document.querySelector<HTMLInputElement>('#ipassword');
const usernameError = document.querySelector('.js-username-error');
const passwordError = document.querySelector('.js-password-error');
const submitButton = document.querySelector('.js-btn-submit');

const togglePasswordButton = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = togglePasswordButton?.querySelector('.icon');

const dropdownMenu = document.querySelector<HTMLDivElement>('.js-dropdown-menu');
const toggleMenuButton = document.querySelector<HTMLButtonElement>('.js-menu-toggle');

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
]

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

function handleCredentialInputs(e: Event) {
    const target = e.target as HTMLInputElement;
    target.classList.remove('is-input-invalid');

    const username = validateUsername();
    const password = validatePassword();

    username.isValid && password.isValid
        ? submitButton?.setAttribute('aria-disabled', 'false')
        : submitButton?.setAttribute('aria-disabled', 'true');    
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

function togglePasswordVisibility() {
    const type = passwordInput?.getAttribute('type');

    if (type === 'password') {
        passwordInput?.setAttribute('type', 'text');
        passwordIcon?.setAttribute('src', visibilityOffIconPath);
        togglePasswordButton?.setAttribute('aria-checked', 'true');
    }

    else {
        passwordInput?.setAttribute('type', 'password');
        passwordIcon?.setAttribute('src', visibilityIconPath);
        togglePasswordButton?.setAttribute('aria-checked', 'false');
    }
}

function toggleDropdownMenu() {
    if (toggleMenuButton?.classList.contains('menu-is-expanded')) {
        document.removeEventListener('click', handleClickMenu);
        toggleMenuButton?.classList.remove('menu-is-expanded');
        toggleMenuButton.setAttribute('aria-expanded', 'false');
    }

    else {
        document.addEventListener('click', handleClickMenu);
        toggleMenuButton?.classList.add('menu-is-expanded');
        toggleMenuButton?.setAttribute('aria-expanded', 'true');
    }
}

function handleClickMenu({ target }: {target: any}) {
    if (target.classList.contains('js-menu-toggle')) {
        return;
    }

    if (!dropdownMenu?.matches(':hover')) {  // checar se o click é fora do menu
        document.removeEventListener('click', handleClickMenu);
        toggleMenuButton?.click();
    }
}

function languagesInSelect({ selectElement }: { selectElement: HTMLSelectElement }) {
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.textContent = lang;
        option.setAttribute('value', lang);
        selectElement?.appendChild(option);
    });

    const defaultOption = selectElement.querySelector('[value="Português"]');
    defaultOption?.setAttribute('selected', '');
}

credentialInputs.forEach(input => input.addEventListener('input', handleCredentialInputs));
usernameInput?.addEventListener('focusout', () => usernameInputFocusout());
passwordInput?.addEventListener('focusout', () => passwordInputFocusout());
loginForm?.addEventListener('submit', submitForm);
togglePasswordButton?.addEventListener('click', togglePasswordVisibility);
toggleMenuButton?.addEventListener('click', toggleDropdownMenu);

window.onload = () => {
    const selectArr: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.js-select-language');
    selectArr.forEach( select => {
        languagesInSelect({ selectElement: select });
    });
}