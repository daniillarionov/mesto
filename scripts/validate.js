const showInputError = (inputElement, errorMessage, formSectionSelector, inputErrorClass, errorClass) => {
    const formSectionElement = inputElement.closest(formSectionSelector)
    const errorElement = formSectionElement.querySelector(inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(errorClass)
}
const hideInputError = (inputElement, formSectionSelector, inputErrorClass, errorClass) => {
    const formSectionElement = inputElement.closest(formSectionSelector)
    const errorElement = formSectionElement.querySelector(inputErrorClass);
    errorElement.textContent = ""
    errorElement.classList.remove(errorClass)
}
const checkInputValidity = (formElement, inputElement, formSectionSelector, inputErrorClass, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage
        showInputError(inputElement, errorMessage, formSectionSelector, inputErrorClass, errorClass)
    } else {
        hideInputError(inputElement, formSectionSelector, inputErrorClass, errorClass)
    }
}
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const findAtLeastOneNotValid = (inputElement => !inputElement.validity.valid)
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid)
    if (hasNotValidInput) {
        buttonElement.setAttribute('disabled', true)
        buttonElement.classList.add(inactiveButtonClass)
    } else {
        buttonElement.removeAttribute('disabled')
        buttonElement.classList.remove(inactiveButtonClass)
    }
}
const setEventListeners = (formElement, errorClass, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, formSectionSelector) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }
    formElement.addEventListener('submit', handleFormSubmit)
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector)
    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(formElement, inputElement, formSectionSelector, inputErrorClass, errorClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass)
        }
        inputElement.addEventListener('input', handleInput)
    }
    inputList.forEach(inputListIterator)
    toggleButtonState(inputList, buttonElement, inactiveButtonClass)
}
const enableValidation = ({
    formSelector,
    errorClass,
    inputErrorClass,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    formSectionSelector
}) => {
    const formElements = document.querySelectorAll(formSelector)
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
        setEventListeners(formElement, errorClass, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, formSectionSelector)
    })
}
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    formSectionSelector: '.popup__form-section',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
});