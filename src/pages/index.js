import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithApprove } from '../components/PopupWithApprove.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { renderLoading } from '../utils/utils.js';
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
    formAvatarEdit,
    popupSelectors,
    containerSelector,
    userInfoSelectors
}
from '../utils/constants.js'
let targetCard = null;
let userId = null;
let cardId = null;
const openProfilePopup = () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.username;
    jobInput.value = userData.job;
    popupWithFormProfile.open();
    profileFormValidator.resetValidation();
}
const handleEditProfileFormSubmit = (dataFromPopup) => {
    popupWithFormProfile.renderLoading()
    api.updateUserInfo(dataFromPopup.username, dataFromPopup.job).then((data) => {
        userInfo.setUserInfo({
            username: data.name,
            job: data.about
        });
        popupWithFormProfile.close();
    }).catch((err) => {
        console.log(err);
    });
}
const handleCardClick = (name, link) => {
    popupViewImage.open(name, link)
}
const cardFormSubmitHandler = (dataFrompopup) => {
    popupWithFormAddCard.renderLoading()
    api.addCard(dataFrompopup).then((dataFromServer) => {
        const card = createCard(dataFromServer)
        cardSection.addItem(card.getElement());
        popupWithFormAddCard.close()
    }).catch((err) => {
        console.log(err);
    });
}
const handleSubmitDeletePopup = (id) => {
    popupWithApprove.renderLoading()
    api.deleteCard(id).then(() => {
        targetCard.removeElement();
        popupWithApprove.close();
    }).catch((err) => {
        console.log(err);
    });
}
const avatarFormSubmitHandler = (data) => {
    popupWithAvatarEdit.renderLoading()
    api.editAvatar(data.link).then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupWithAvatarEdit.close()
    }).catch((err) => {
        console.log(err);
    });
}
const openAvatarEditPopup = () => {
    popupWithAvatarEdit.open()
}
const createCard = (data) => {
    const card = new Card(data, userId, cardSelector, handleCardClick, function handleDeleteCardClick(data) {
        popupWithApprove.open(data)
    }, function handleLike(card) {
        api.Like(card.getId(), card.getIsLiked())
        .then((data) => {
            card.updateLikesInfo(data);
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
    return cardElement;
}, containerSelector)
const profileFormValidator = new FormValidator(classConfig, formProfileElement);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(classConfig, formAddElement);
addFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(classConfig, formAvatarEdit);
editAvatarFormValidator.enableValidation()
const userInfo = new UserInfo(userInfoSelectors);
const popupWithFormProfile = new PopupWithForm(popupSelectors.popupProfileSelector, handleEditProfileFormSubmit, renderLoading)
const popupWithFormAddCard = new PopupWithForm(popupSelectors.popupAddCardSelector, cardFormSubmitHandler, renderLoading)
const popupWithAvatarEdit = new PopupWithForm(popupSelectors.popupEditAvatarSelector, avatarFormSubmitHandler, renderLoading)
const popupViewImage = new PopupWithImage(popupSelectors.popupViewCardSelector)
const popupWithApprove = new PopupWithApprove(popupSelectors.popupDeleteCardSelector, handleSubmitDeletePopup, renderLoading)
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


