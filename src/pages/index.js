import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithApprove } from '../components/PopupWithApprove.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
    editButton,
    formProfileElement,
    nameInput,
    jobInput,
    addButton,
    formAddElement,
    cardSelector,
    classConfig,
    avatarElement,
    editAvatarButton,
    formAvatarEdit
}
from '../utlis/constants.js'
let targetCard = null;
let userId = null;
let cardId = null;
const openProfilePopup = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.username
    jobInput.value = userData.job
    popupWithFormProfile.open();
    profileFormValidator.resetValidation();
}
const handleFormSubmit = (dataFromPopup) => {
    api.uptadeUserInfo(dataFromPopup.username, dataFromPopup.job).then((data) => {
        userInfo.setUserInfo({
            username: data.name,
            job: data.about
        })
    }).catch((err) => {
        console.log(err);
    });
    popupWithFormProfile.close();
}
const handleCardClick = (name, link) => {
    popupViewImage.open(name, link)
}
const cardFormSubmitHandler = (dataFrompopup) => {
    api.addCard(dataFrompopup).then((dataFromServer) => {
        const card = createCard(dataFromServer)
        cardSection.addItem(card.getElement())
    }).catch((err) => {
        console.log(err);
    });
    popupWithFormAddCard.close()
}
const handleSubmitDeletePopup = (id) => {
    api.deleteCard(id).then(() => {
        targetCard.removeCard();
        popupWithApprove.close();
    }).catch((err) => {
        console.log(err);
    });
}
const avatarFormSubmitHandler = (data) => {
    api.editAvatar(data.link).then((data) => {
        userInfo.setUserAvatar(data)
    }).catch((err) => {
        console.log(err);
    });
    popupWithAvatarEdit.close()
}
const openAvatarEditPopup = () => {
    popupWithAvatarEdit.open()
}
const createCard = (data) => {
    const card = new Card(data, userId, cardSelector, handleCardClick, function handleDeleteCardClick(data) {
        popupWithApprove.open(data)
    }, function handleSetLike() {
        cardId = card.getId()
        api.setLike(cardId).then((data) => {
            card.handleLikeCounter(data);
        }).catch((err) => {
            console.log(err);
        });
    }, function handleRemoveLike() {
        cardId = card.getId()
        api.removeLike(cardId).then((data) => {
            card.handleLikeCounter(data);
        }).catch((err) => {
            console.log(err);
        });
    });
    targetCard = card;
    cardId = card.getId()
    return card
}
const api = new Api({
    cohort: 'cohort-24',
    token: '0ea2ceba-98d3-4ffa-b48c-30fdce64ff5d'
})
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cards]) => {
    userId = userData._id
    userInfo.setUserInfo({
        username: userData.name,
        job: userData.about
    })
    avatarElement.src = userData.avatar;
    cardSection.render(cards)
}).catch((err) => {
    console.log(err);
});
const cardSection = new Section(function(data) {
    const card = createCard(data)
    const cardElement = card.getElement();
    card.handleLikeCounter(data);
    return cardElement;
}, '.elements')
const profileFormValidator = new FormValidator(classConfig, formProfileElement);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(classConfig, formAddElement);
addFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(classConfig, formAvatarEdit);
editAvatarFormValidator.enableValidation()
const userInfo = new UserInfo({
    nameSelector: '.profile__username',
    jobSelector: '.profile__job',
    avatarSelector: '.profile__avatar'
})
const popupWithFormProfile = new PopupWithForm('.popup-profile', handleFormSubmit)
const popupWithFormAddCard = new PopupWithForm('.popup-add-card', cardFormSubmitHandler)
const popupWithAvatarEdit = new PopupWithForm('.popup-edit-avatar', avatarFormSubmitHandler)
const popupViewImage = new PopupWithImage('.popup-view-card')
const popupWithApprove = new PopupWithApprove('.popup-delete-card', handleSubmitDeletePopup)
popupWithApprove.setEventListeners()
popupViewImage.setEventListeners()
popupWithFormProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithAvatarEdit.setEventListeners();
editAvatarButton.addEventListener('click', function() {
    openAvatarEditPopup();
    editAvatarFormValidator.resetValidation();
})
editButton.addEventListener('click', () => openProfilePopup());
addButton.addEventListener('click', function() {
    popupWithFormAddCard.open();
    addFormValidator.resetValidation();
});


