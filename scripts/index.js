let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let form = popup.querySelector('.popup__form');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_username');
let jobInput = popup.querySelector('.popup__input_job');
let username = document.querySelector('.profile__username');
let job = document.querySelector('.profile__job');
let togglePopup = () => {
    popup.classList.toggle('popup_opened');
  }

function changeInputValue () {
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', changeInputValue);
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup)  ;
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})  

