const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const container = document.querySelector('.elements__card');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderList(data) {
  data.forEach(function(item) {
    renderItem(item);
  })
};

function renderItem(element) {
  const listElement = cloneTemplate(document.querySelector('#template'));
  const titleElement = listElement.querySelector('.elements__title');
  titleElement.textContent = element.name;
  const elementItem = listElement.querySelector('.elements__item');
  elementItem.src = element.link;
  container.append(listElement);
}

function cloneTemplate(container) {
  const templateElement = container.content;
  const newElement = templateElement.cloneNode(true);
  return newElement;
}

renderList(initialCards);

// function renderItem(text) {
//   const listElement = cloneTemplate(document.querySelector('.todo-template'));
//   const textElement = listElement.querySelector('.todo__text');
//   textElement.textContent = text;
//   addEventListeners(listElement);
//   todosListElement.append(listElement);
// }

// function cloneTemplate(container) {
//   const templateElement = container.content;
//   const newElement = templateElement.cloneNode(true);
//   return newElement;
// }