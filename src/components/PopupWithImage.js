import { Popup } from "./Popup.js"
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup-view-card__image');
    }
    open(name, link) {
        this._popupImage.src = link;
        this._popup.querySelector('.popup-view-card__caption').textContent = name;
        this._popupImage.alt = name;
        super.open()
    }
}