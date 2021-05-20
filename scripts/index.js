import {
    Card
}
from './Card.js';
import {
    FormValidator
}
from "./FormValidator.js"
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup-profile');
const formProfileElement = profilePopup.querySelector('.popup-profile__form');
const nameInput = profilePopup.querySelector('.popup-profile__input_username');
const jobInput = profilePopup.querySelector('.popup-profile__input_job');
const username = document.querySelector('.profile__username');
const job = document.querySelector('.profile__job');
const popupAddCard = document.querySelector('.popup-add-card');
const addButton = document.querySelector('.profile__add-button');
const formAddElement = document.querySelector('.popup-add-card__form');
const elementInputName = formAddElement.querySelector('.popup-add-card__input_name');
const elementInputLink = formAddElement.querySelector('.popup-add-card__input_link');
const elements = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup')
export const popupViewCard = document.querySelector('.popup-view-card');
export const popupViewCardImage = popupViewCard.querySelector('.popup-view-card__image');
export const popupViewCardCaption = popupViewCard.querySelector('.popup-view-card__caption');
const cardSelector = ".element-template";
const initialCards = [{
    name: 'Гонолулу',
    link: 'https://images.unsplash.com/photo-1617654221583-a9af3cbcee6c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80'
}, {
    name: 'Балтимор',
    link: 'https://images.unsplash.com/photo-1617602269912-6be60a1fcc42?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
}, {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1617654221926-c1f136562e65?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
}, {
    name: 'Мадисон',
    link: 'https://images.unsplash.com/photo-1617715426034-916b3d1dc978?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80'
}, {
    name: 'Бещады, Польша',
    link: 'https://images.unsplash.com/photo-1617642171292-afad99eee7ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
    name: 'Долина смерти',
    link: 'https://images.unsplash.com/photo-1617640065014-e2fe33acdbb1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
}];
const classConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    formSectionSelector: '.popup__form-section',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputInvalidClass: 'popup__input-invalid',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
}
const profileFormValidator = new FormValidator(classConfig, formProfileElement);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(classConfig, formAddElement);
addFormValidator.enableValidation();
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    elementInputName.value = '';
    elementInputLink.value = '';
    enableEscListener()
}
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleClosePopup);
}
const openProfilePopup = () => {
    nameInput.value = username.textContent;
    jobInput.value = job.textContent;
    openPopup(profilePopup);
    profileFormValidator.resetValidation();
}
const handleFormSubmit = (e) => {
    e.preventDefault();
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup);
}
const handleCardClick = (name, link) => {
    openPopup(popupViewCard);
        popupViewCardImage.src = link;
        popupViewCardCaption.textContent = name;
        popupViewCardImage.alt = name;    
}
const createCard = (data, cardSelector, handleCardClick) => {
    const item = new Card(data, cardSelector, handleCardClick);
    return item
}
const renderCard = (e) => {
    e.preventDefault();
    const card = createCard({
        name: elementInputName.value,
        link: elementInputLink.value,
    }, cardSelector, handleCardClick);
    addCard(elements, card.getElement());
    closePopup(popupAddCard);
}
const isEscEvent = (e, action) => {
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        action(activePopup);
    }
}
const handleClosePopup = (e) => {
    e.preventDefault();
    isEscEvent(e, closePopup)
}
const enableEscListener = () => {
    document.addEventListener('keyup', handleClosePopup);
}
const addCard = (container, cardElement) => {
    container.prepend(cardElement);
}
formAddElement.addEventListener('submit', renderCard);
formProfileElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', function() {
    openPopup(popupAddCard);
    addFormValidator.resetValidation(); 
});
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
          }
    })
}) 
initialCards.forEach(data => {
    const card = createCard(data, cardSelector, handleCardClick);
    addCard(elements, card.getElement());
})