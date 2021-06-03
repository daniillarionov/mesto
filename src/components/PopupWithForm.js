import { Popup } from "./Popup.js"
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, renderLoading) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._renderLoading = renderLoading;
    }
    _getInputValues() {
        this._inputs = this._form.querySelectorAll('.popup__input')
        const inputValues = {}
        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value
        })
        return inputValues
    }
    setEventListeners = () => {
        this._form.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues())            
        })
        super.setEventListeners();
    }
    close = () => {
        super.close()
        this._form.reset()
    }
    renderLoading() {
        this._renderLoading(this._submitButton, 'Сохранение...')
    }
}