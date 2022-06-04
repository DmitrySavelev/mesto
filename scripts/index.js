const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const container = document.querySelector('.elements__card');//контейнер для вставки из template
const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_new_place');
const closeButtonPlace = document.querySelector('.close');

function togglePopup() {//функция включения и отключения класса для отображения попапа
  popup.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
  if (popup.classList.contains('popup_opened')) {//если в попапе есть класс то...
    nameInput.value = profileName.textContent;//значение со страницы вставляется в инпут
    jobInput.value = profileJob.textContent;//значение из инпута в попапе вставляется на страницу
  }
}

function togglePopupPlace() {//функция включения и отключения класса для отображения попапа
  popupNewPlace.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}

function formSubmitHandler(e) {//функция для отправки форм
  e.preventDefault();//отмена действия браузера (в данном случае перезагрузки страницы)
  profileName.textContent = nameInput.value;//на страницу переносится значение из инпута в попапе
  profileJob.textContent = jobInput.value;//на страницу переносится значение из инпута в попапе
  togglePopup();//функция включения и отключения класса для отображения попапа
  // popupNewPlace();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', togglePopupPlace);
closeButtonPlace.addEventListener('click', togglePopupPlace);






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