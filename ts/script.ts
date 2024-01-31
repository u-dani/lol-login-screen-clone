const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';

const passwordField = document.querySelector<HTMLInputElement>('#ipassword');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword?.querySelector('.icon');

const loginForm = document.querySelector<HTMLFormElement>('.js-form');

const usernameInput = document.querySelector<HTMLInputElement>('#iusername');
const passwordInput = document.querySelector<HTMLInputElement>('#ipassword');

const usernameError = document.querySelector('.js-username-error');
const passwordError = document.querySelector('.js-password-error');


interface inputValidationReturn {
    isValid: boolean
    typeError: 'valueMissing' | 'tooShort' | 'invalidCharacters' | undefined
    inputElement: HTMLInputElement | null
}

function validateUsername({ ignoreInputEmpty } : { ignoreInputEmpty?: boolean }) : inputValidationReturn {
    const regex = /^[\w\s\-]*$/
    const value = usernameInput!.value.trim();

    const isValid = false
    const inputElement = usernameInput

    if (/^[\s]+$/.test(usernameInput!.value)) {
        usernameInput!.value = "";
    }

    if (!ignoreInputEmpty && value?.length === 0) {
        usernameError!.textContent = 'Preencha o campo';
        usernameInput?.classList.add('is-input-invalid');
        return {
            isValid, inputElement, typeError: "valueMissing"
        }
    }

    if (!regex.test(value)) {
        usernameError!.textContent = 'Caracteres especiais não são permitidos no nome de usuário';
        usernameInput?.classList.add('is-input-invalid');
        return {
            isValid, inputElement, typeError: "invalidCharacters"
        }
    }

    if (value.length > 0 && value.length < 2) {
        usernameError!.textContent = 'Deve ter pelo menos 2 caracteres';
        usernameInput?.classList.add('is-input-invalid');
        return {
            isValid, inputElement, typeError: "tooShort"
        }
    }

    usernameInput?.classList.remove('is-input-invalid');
    return {
        isValid: true, inputElement, typeError: undefined
    }
}

function validatePassword({ ignoreInputEmpty } : { ignoreInputEmpty?: boolean }): inputValidationReturn {
    const value = passwordInput?.value;

    if (!ignoreInputEmpty && value?.length === 0) {
        passwordError!.textContent = 'Preencha o campo';
        passwordInput?.classList.add('is-input-invalid');
        return {
            isValid: false, inputElement: passwordInput, typeError: "valueMissing"
        }
    }

    passwordInput?.classList.remove('is-input-invalid');
    return {
        isValid: true, inputElement: passwordInput, typeError: undefined
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
    validatePassword({});
    validateUsername({});

    const firstInvalidElement = document.querySelector<HTMLInputElement>('.is-input-invalid');
    firstInvalidElement?.focus();

    if (!firstInvalidElement) {
        const target = e.target as HTMLFormElement;
        target.submit();
    }
}

btnTogglePassword?.addEventListener('click', togglePasswordVisibility);
loginForm?.addEventListener('submit', submitForm);
usernameInput?.addEventListener('focusout', () => validateUsername({ ignoreInputEmpty: true }));
passwordInput?.addEventListener('focusout', () => validatePassword({ ignoreInputEmpty: true}));
/*
    Validação toda feita por javascript >:(
    
    validação login lol
    - caracteres permitidos: espaço, letras, números, underline e traço
    - precisa ter no mínimo 2 caracteres (sem ser espaço)
    
    mostrar erro quando:
    - perder o foco e estiver com dados inválidos
    - quando estiver vazios "só com espaços" e não mostrar o placeholder
    - quando tentar enviar o formulário com os campos inválidos

    importante
    - só mostrar erro de "campo obrigatório" no evento submit, não no focusout do input
*/