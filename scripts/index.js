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
const closeButton = profilePopup.querySelector('.popup-profile__close');
const formProfileElement = profilePopup.querySelector('.popup-profile__form');
const nameInput = profilePopup.querySelector('.popup-profile__input_username');
const jobInput = profilePopup.querySelector('.popup-profile__input_job');
const username = document.querySelector('.profile__username');
const job = document.querySelector('.profile__job');
const popupAddCard = document.querySelector('.popup-add-card');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup-add-card__close');
const formAddElement = document.querySelector('.popup-add-card__form');
const elementInputName = formAddElement.querySelector('.popup-add-card__input_name');
const elementInputLink = formAddElement.querySelector('.popup-add-card__input_link');
const elements = document.querySelector('.elements');
export const popupViewCard = document.querySelector('.popup-view-card');
const closeButtonpopupViewCard = popupViewCard.querySelector('.popup-view-card__close');
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
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
}
const profileFormValidator = new FormValidator(classConfig, formProfileElement);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(classConfig, formAddElement);
addFormValidator.enableValidation();
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    enableEscListener()
}
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleClosePopup);
}
const changeInputValue = () => {
    nameInput.value = username.textContent;
    jobInput.value = job.textContent;
    openPopup(profilePopup);
}
const handleFormSubmit = (e) => {
    e.preventDefault();
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup);
}
const renderCard = (e) => {
    e.preventDefault();
    const card = new Card({
        name: elementInputName.value,
        link: elementInputLink.value
    })
    addCard(elements, card.getElement());
    closePopup(popupAddCard);
}
const makePopupCloser = (popupElement) => {
    return function(e) {
        if (e.target === e.currentTarget) {
            closePopup(popupElement);
        }
    }
}
const isEscEvent = (e, action) => {
    if (e.keyCode === 27) {
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
profilePopup.addEventListener('click', makePopupCloser(profilePopup));
popupAddCard.addEventListener('click', makePopupCloser(popupAddCard));
popupViewCard.addEventListener('click', makePopupCloser(popupViewCard));
formProfileElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', changeInputValue);
closeButton.addEventListener('click', function() {
    closePopup(profilePopup);
});
addButton.addEventListener('click', function() {
    openPopup(popupAddCard);
});
closeButtonPopupAddCard.addEventListener('click', function() {
    closePopup(popupAddCard);
})
closeButtonpopupViewCard.addEventListener('click', function() {
    closePopup(popupViewCard);
})
initialCards.forEach(data => {
    const card = new Card(data);
    addCard(elements, card.getElement());
})