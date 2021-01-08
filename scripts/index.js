let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')

let togglePopup = () => {
  popup.classList.toggle('popup_opened')
}

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)
  
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }
})  

let form = popup.querySelector('.popup__form')

form.addEventListener('submit', () => {
  
})

let formElement = popup.querySelector('.popup__form')

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
  let nameInput = popup.querySelector('.popup__username')
  let jobInput = popup.querySelector('.popup__job')

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
  let username = document.querySelector('.profile__username')
  let job = document.querySelector('.profile__job')

    // Вставьте новые значения с помощью textContent
  username.textContent = nameInput.value
  job.textContent = jobInput.value

  togglePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

