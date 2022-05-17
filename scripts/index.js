const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon');
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});




const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name__input');
const jobInput = formElement.querySelector('.popup__job__input');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let getName = nameInput.getAttribute('value');
    let getJob = jobInput.getAttribute('value');
    let insertName = document.querySelector('.profile__name');
    let insertJob = document.querySelector('.profile__job');
    getName.textContent = 'new text';
    getJob.textContent = 'new text';

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



