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

// Редактирование имени и информации о себе

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name_input');
const jobInput = document.querySelector('.popup__job_input');

document.querySelector('.popup__button').onclick = function (e) {
  e.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__job').textContent = jobInput.value;
  togglePopup();
}