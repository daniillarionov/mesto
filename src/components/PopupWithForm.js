import { Popup } from "./Popup.js"
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form')
    }
    _getInputValues() {
        this._inputs = this._form.querySelectorAll('.popup__input')
        const value = {}
        this._inputs.forEach((input) => {
            value[input.name] = input.value
        })
        return value
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
}