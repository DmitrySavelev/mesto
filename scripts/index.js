const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon');

function togglePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened')
  } else {
    popup.classList.add('popup_opened')
  }
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

// Редактирование имени и информации о себе

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const save = document.querySelector('.popup__button');

save.onclick = function (e) {
  e.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__job').textContent = jobInput.value;
  togglePopup();
}