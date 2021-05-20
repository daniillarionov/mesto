export class FormValidator {
    constructor(selectorData, formElement) {
        this._selectorData = selectorData;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._selectorData.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectorData.submitButtonSelector);
    }
    _showInputError = (inputElement, errorMessage) => {
        const formSectionElement = inputElement.closest(this._selectorData.formSectionSelector)
        const errorElement = formSectionElement.querySelector(this._selectorData.inputErrorClass);
        inputElement.classList.add(this._selectorData.inputInvalidClass);
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._selectorData.errorClass)
    }
    _hideInputError = (inputElement) => {
        const formSectionElement = inputElement.closest(this._selectorData.formSectionSelector)
        const errorElement = formSectionElement.querySelector(this._selectorData.inputErrorClass);
        inputElement.classList.remove(this._selectorData.inputInvalidClass);
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
    _toggleButtonState = () => {
        const findAtLeastOneNotValid = (inputElement) => {
            return !inputElement.validity.valid
        };
        const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid)
        if (hasNotValidInput) {
            this._buttonElement.setAttribute('disabled', true)
            this._buttonElement.classList.add(this._selectorData.inactiveButtonClass)
        } else {
            this._buttonElement.removeAttribute('disabled')
            this._buttonElement.classList.remove(this._selectorData.inactiveButtonClass)
        }
    }
    _setEventListeners = () => {
        const handleFormSubmit = (event) => {
            event.preventDefault();
        }
        this._formElement.addEventListener('submit', handleFormSubmit)
        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._buttonElement)
            }
            inputElement.addEventListener('input', handleInput)
        }
        this._inputList.forEach(inputListIterator)
        this._toggleButtonState()
    }
    resetValidation = () => {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
  
        this._toggleButtonState();
      }
    enableValidation = () => {
        this._setEventListeners()
    }
}