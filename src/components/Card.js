export class Card {
    constructor(cardData, userId, templateSelector, handleCardClick, handleDeleteCardClick, handleLike, ) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._element = this._makeElement();
        this._likeButton = this._element.querySelector('.element__like');        
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._setEventListeners();
        this._owner = this._cardData.owner._id;
        this._currentUser = userId;
        this._handleLike = handleLike;
        this._id = this._cardData._id
    }
    _makeElement() {
        const elementTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        const element = elementTemplate.cloneNode(true);
        const elementImage = element.querySelector('.element__image');
        const elementText = element.querySelector('.element__text');        
        const likeCounter = element.querySelector('.element__like-counter');    
        likeCounter.textContent = this._cardData.likes.length
        elementImage.src = this._cardData.link;
        elementImage.alt = ('Фотография ' + this._cardData.name);
        elementImage.name = this._cardData.name;
        elementText.textContent = this._cardData.name;
                return element;
    }
    _setEventListeners() {
        const elementImage = this._element.querySelector('.element__image');
        this._likeButton.addEventListener('click', () => this._like())
        this._deleteButton.addEventListener('click', () => this._handleDeleteCardClick(this._cardData._id));
        elementImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link))
    }
    _like() {
      this._handleLike(this);
    }
    _handleLikeCounter(data) {
      this._likeCounter.textContent = data.length;
    }
    getId() {
      return this._id;
    }
    removeElement() {
        this._element.remove();
    }
    getElement() {        
        this._isLiked = this._cardData.likes.some((like => like._id === this._currentUser));
        if(this._isLiked) {
          this._likeButton.classList.add('element__like_active');
        }
        if (this._owner === this._currentUser) {
          this._deleteButton.classList.remove('element__delete-button_hidden')
        }
        return this._element;
    }
    getIsLiked() {
      return  this._isLiked;
    }
    updateLikesInfo(data) {
      this._cardData.likes = data.likes;
      this._isLiked = this._cardData.likes.some((like => like._id === this._currentUser));
      if(this._isLiked) {
        this._likeButton.classList.add('element__like_active');
        this._handleLikeCounter(this._cardData.likes);
      } else {
        this._likeButton.classList.remove('element__like_active');
        this._handleLikeCounter(this._cardData.likes);
      }
    }
}