const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const save = document.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function togglePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

// Редактирование имени и информации о себе

save.addEventListener('click', function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
}
)