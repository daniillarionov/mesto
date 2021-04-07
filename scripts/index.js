let editButton = document.querySelector('.profile__edit-button');
let profilePopup = document.querySelector('.popup');
let closeButton = profilePopup.querySelector('.popup__close');
let formElement = profilePopup.querySelector('.popup__form');
let nameInput = profilePopup.querySelector('.popup__input_username');
let jobInput = profilePopup.querySelector('.popup__input_job');
let username = document.querySelector('.profile__username');
let job = document.querySelector('.profile__job');
let popupAddCard = document.querySelector('.popup-add-card');
let addButton = document.querySelector('.profile__add-button');
let closeButtonPopupAddCard = popupAddCard.querySelector('.popup-add-card__close');
let ElementTemplate = document.querySelector('.element-template').content.querySelector('.element');
let form = document.querySelector('.popup-add-card__form');
let elementInputName = form.querySelector('.popup-add-card__input_name');
let elementInputLink = form.querySelector('.popup-add-card__input_link');
let elements = document.querySelector('.elements');
let popupViewCard = document.querySelector('.popup-view-card');
let popupViewCardImage = popupViewCard.querySelector('.popup-view-card__image');
let popupViewCardCaption = popupViewCard.querySelector('.popup-view-card__caption');
let closeButtonpopupViewCard = popupViewCard.querySelector('.popup-view-card__close');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
const formSubmitHandler = (e) => {
    e.preventDefault();
    let elementInputNameValue = elementInputName.value;
    let elementInputLinkValue = elementInputLink.value;
    let Element = ElementTemplate.cloneNode(true);
    let ElementImage = Element.querySelector('.element__image');
    ElementImage.src = elementInputLinkValue;
    let ElementText = Element.querySelector('.element__text');
    ElementText.textContent = elementInputNameValue;
    elements.prepend(Element);
    closePopup(popupAddCard);
}
form.addEventListener('submit', formSubmitHandler);
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
const ElementsArr = initialCards.forEach(item => {
    let Element = ElementTemplate.cloneNode(true);
    let ElementImage = Element.querySelector('.element__image');
    ElementImage.src = item.link;
    ElementImage.alt = ('Фотография ' + item.name);
    ElementImage.name = item.name;
    let ElementText = Element.querySelector('.element__text');
    ElementText.textContent = item.name;
    let DeleteButtonElement = Element.querySelector('.element__delete-button');
    DeleteButtonElement.addEventListener('click', () => Element.remove());
    elements.prepend(Element);
    ElementImage.addEventListener('click', (e) => {
        openPopup(popupViewCard);
        popupViewCardImage.src = e.target.src;
        popupViewCardCaption.textContent = e.target.name;
    })
});
elements.addEventListener('click', e => {
    const likeButton = e.target;
    if (likeButton.classList.contains('element__like')) {
        likeButton.classList.toggle('element__like_active');
    }
});

function changeInputValue() {
    nameInput.value = username.textContent;
    jobInput.value = job.textContent;
    openPopup(profilePopup);
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);
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
profilePopup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(profilePopup);
    }
})
popupAddCard.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupAddCard);
    }
})
popupViewCard.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupViewCard);
    }
})