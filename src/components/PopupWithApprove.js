import { Popup } from "./Popup.js";
export class PopupWithApprove extends Popup {
    constructor(popupSelector, submitHandler, renderLoading) {
      super(popupSelector);
      this._submitHandler = submitHandler;
      this._popup = document.querySelector(popupSelector);
      this._submitButton = this._popup.querySelector('.popup__submit');
      this._renderLoading = renderLoading;
    }  
    setEventListeners() {
      super.setEventListeners()
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitHandler(this.id);
      });
    }
    open(id) {
      this.id = id;
      super.open();
    }
    renderLoading() {
      this._renderLoading(this._submitButton, 'Удаление...')
  }
}