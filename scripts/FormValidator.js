export class FormValidator {
    constructor(selectorData, formElement) {
        this._selectorData = selectorData;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(this._selectorData.inputSelector));
        this.buttonElement = this.formElement.querySelector(this._selectorData.submitButtonSelector);
    }
    _showInputError = (inputElement, errorMessage) => {
        const formSectionElement = inputElement.closest(this._selectorData.formSectionSelector)
        const errorElement = formSectionElement.querySelector(this._selectorData.inputErrorClass);
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._selectorData.errorClass)
    }
    _hideInputError = (inputElement) => {
        const formSectionElement = inputElement.closest(this._selectorData.formSectionSelector)
        const errorElement = formSectionElement.querySelector(this._selectorData.inputErrorClass);
        errorElement.textContent = ""
        errorElement.classList.remove(this._selectorData.errorClass)
    }
    _checkInputValidity = (inputElement) => {
        const isInputNotValid = !inputElement.validity.valid;
        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage
            this._showInputError(inputElement, errorMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }
    toggleButtonState = () => {
        const findAtLeastOneNotValid = (inputElement) => {
            return !inputElement.validity.valid
        };
        const hasNotValidInput = this.inputList.some(findAtLeastOneNotValid)
        if (hasNotValidInput) {
            this.buttonElement.setAttribute('disabled', true)
            this.buttonElement.classList.add(this._selectorData.inactiveButtonClass)
        } else {
            this.buttonElement.removeAttribute('disabled')
            this.buttonElement.classList.remove(this._selectorData.inactiveButtonClass)
        }
    }
    _setEventListeners = () => {
        const handleFormSubmit = (event) => {
            event.preventDefault();
        }
        this.formElement.addEventListener('submit', handleFormSubmit)
        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement)
                this.toggleButtonState(this.buttonElement)
            }
            inputElement.addEventListener('input', handleInput)
        }
        this.inputList.forEach(inputListIterator)
        this.toggleButtonState()
    }
    enableValidation = () => {
        this._setEventListeners()
    }
}