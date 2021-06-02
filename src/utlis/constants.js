export const editButton = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup-profile');
export const formProfileElement = profilePopup.querySelector('.popup-profile__form');
export const formAvatarEdit = document.querySelector('.popup-edit-avatar__form');
export const nameInput = profilePopup.querySelector('.popup-profile__input_username');
export const jobInput = profilePopup.querySelector('.popup-profile__input_job');
export const addButton = document.querySelector('.profile__add-button');
export const formAddElement = document.querySelector('.popup-add-card__form');
export const avatarElement = document.querySelector('.profile__avatar');
export const editAvatarButton = document.querySelector('.profile__avatar-overlay');
export const cardSelector = ".element-template";
export const classConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    formSectionSelector: '.popup__form-section',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputInvalidClass: 'popup__input-invalid',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
}