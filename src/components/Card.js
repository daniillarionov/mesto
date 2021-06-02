export class Card {
    constructor(cardData, userId, templateSelector, handleCardClick, handleDeleteCardClick, handleSetLike, handleRemoveLike) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._element = this._makeElement();
        this._likeButton = this._element.querySelector('.element__like');        
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._setEventListeners();
        this._owner = this._cardData.owner._id;
        this._currentUser = userId;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
        this._id = this._cardData._id
        this._likeCounter = this._element.querySelector('.element__like-counter');    
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
        const elementImage = this._element.querySelector('.element__image');
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains("element__like_active")) {
              this._removeLike(this._cardData);
            } else {
              this._addLike(this._cardData);
            }
          })
        this._deleteButton.addEventListener('click', () => this._handleDeleteCardClick(this._cardData._id));
        elementImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link))
    }
    getId() {
        return this._id;
    }
    _addLike() {
        this._likeButton.classList.add('element__like_active');
        this._handleSetLike();
    }
    _removeLike() {
        this._likeButton.classList.remove('element__like_active');
        this._handleRemoveLike();
    }
    handleLikeCounter(data) {
        this._likeCounter.textContent = String(data.likes.length);
      }
    removeCard() {
        this._element.remove();
    }
    getElement() {
        if (this._owner === this._currentUser) {
            this._deleteButton.classList.remove('element__delete-button_hidden')
        }
        return this._element;
    }
}