export const editButton = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup-profile');
export const formProfileElement = profilePopup.querySelector('.popup-profile__form');
export const nameInput = profilePopup.querySelector('.popup-profile__input_username');
export const jobInput = profilePopup.querySelector('.popup-profile__input_job');
export const addButton = document.querySelector('.profile__add-button');
export const formAddElement = document.querySelector('.popup-add-card__form');
export const cardSelector = ".element-template";
export const initialCards = [{
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