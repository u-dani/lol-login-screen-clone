const visibilityIconPath = 'images/icons/icon-visibility.svg';
const visibilityOffIconPath = 'images/icons/icon-visibility-off.svg';

const passwordField = document.querySelector('#ipassword');
const btnTogglePassword = document.querySelector('.js-toggle-password-visibility');
const passwordIcon = btnTogglePassword?.querySelector('.icon');

function togglePasswordVisibility() {
    const type = passwordField?.getAttribute('type');

    if (type === 'password') {
        passwordField?.setAttribute('type', 'text');
        passwordIcon?.setAttribute('src', visibilityOffIconPath);
        btnTogglePassword?.setAttribute('aria-pressed', 'true');
    }

    else {
        passwordField?.setAttribute('type', 'password');
        passwordIcon?.setAttribute('src', visibilityIconPath);
        btnTogglePassword?.setAttribute('aria-pressed', 'false');
    }
}

btnTogglePassword?.addEventListener('click', togglePasswordVisibility);