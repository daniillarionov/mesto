export class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._element = this._makeElement();
        this._likeButton = this._element.querySelector('.element__like');
        this._handleCardClick = handleCardClick;
        this._setEventListeners();
    }
    _makeElement() {
        const elementTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        const element = elementTemplate.cloneNode(true);
        const elementImage = element.querySelector('.element__image');
        const elementText = element.querySelector('.element__text');
        elementImage.src = this._cardData.link;
        elementImage.alt = ('Фотография ' + this._cardData.name);
        elementImage.name = this._cardData.name;
        elementText.textContent = this._cardData.name;
        return element;
    }
    _setEventListeners() {
        const deleteButtonElement = this._element.querySelector('.element__delete-button');
        const elementImage = this._element.querySelector('.element__image');
        this._likeButton.addEventListener('click', () => this._like())
        deleteButtonElement.addEventListener('click', () => this._removeCard());
        elementImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link))
    }
    _like() {
        this._likeButton.classList.toggle('element__like_active')
    }
    _removeCard() {
        this._element.remove();
    }
    getElement() {
        return this._element;
    }
}