import { Popup } from "./Popup.js";
export class PopupWithApprove extends Popup {
    constructor(popupSelector, submitHandler) {
      super(popupSelector);
      this._submitHandler = submitHandler;
      this._popup = document.querySelector(popupSelector);
      this.submitButton = this._popup.querySelector('.popup__submit');
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitHandler(this.id);
        this.submitButton.textContent = 'Удаление...'
      });
    }

    open(id) {
      this.id = id;
      super.open();
    }

}