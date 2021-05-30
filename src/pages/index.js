import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    editButton,
    formProfileElement,
    nameInput,
    jobInput,
    addButton,
    formAddElement,
    cardSelector,
    initialCards,
    classConfig
}
from '../utlis/constants.js'
const openProfilePopup = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.username
    jobInput.value = userData.job
    popupWithFormProfile.open();
    profileFormValidator.resetValidation();
}
const handleFormSubmit = () => {
    userInfo.setUserInfo({
        username: nameInput.value,
        job: jobInput.value
    })
    popupWithFormProfile.close();
}
const cardFormSubmitHandler = (data) => {
    const card = createCard(data, cardSelector, handleCardClick);
    cardSection.addItem(card.getElement());
    popupWithFormAddCard.close()
}
const handleCardClick = (name, link) => {
    popupViewImage.open(name, link)
}
const createCard = (data) => {
    const card = new Card(data, cardSelector, handleCardClick);
    return card
}
const profileFormValidator = new FormValidator(classConfig, formProfileElement);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(classConfig, formAddElement);
addFormValidator.enableValidation();
const userInfo = new UserInfo({
    nameSelector: '.profile__username',
    jobSelector: '.profile__job'
})
const popupWithFormProfile = new PopupWithForm('.popup-profile', handleFormSubmit)
const popupWithFormAddCard = new PopupWithForm('.popup-add-card', cardFormSubmitHandler)
const popupViewImage = new PopupWithImage('.popup-view-card')
popupViewImage.setEventListeners()
popupWithFormProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
editButton.addEventListener('click', () => openProfilePopup());
addButton.addEventListener('click', function() {
    popupWithFormAddCard.open();
    addFormValidator.resetValidation();
});
const cardSection = new Section({
    items: initialCards,
    renderer: function(data) {
        const card = createCard(data, cardSelector, handleCardClick)
        const cardElement = card.getElement();
        return cardElement;
    }
}, '.elements')
cardSection.render();