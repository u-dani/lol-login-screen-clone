
const toggleIcon = document.querySelector('.js-toggle-profile-navbar');
const profileNavbar = document.querySelector<HTMLElement>('.js-profile-navbar');
const requiredInputs = document.querySelectorAll<HTMLInputElement>('.js-required-input');
const btnSubmit = document.querySelector<HTMLButtonElement>('.js-btn-submit');


const validateSubmitButton = () => {
    const isValid = [...requiredInputs].every( input => input.value !== '');
    isValid ? btnSubmit?.removeAttribute('disabled') : btnSubmit?.setAttribute('disabled', '')
}

requiredInputs.forEach( field => field.addEventListener('input', validateSubmitButton));


toggleIcon?.addEventListener('click', () => {
    if (!profileNavbar) { return }

    profileNavbar.classList.contains('is-hide')
        ? profileNavbar.classList.remove('is-hide')
        : profileNavbar.classList.add('is-hide')
});