const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_card');
const zoomPopup = document.querySelector('.popup_zoom');

const profileEditButton = document.querySelector('.profile__edit-button');
const buttonCloseEdit = document.querySelector('.popup__button-close_edit');
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupFormPlace = document.querySelector('.popup__form_place');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const templateElement = document.querySelector('#template').content;
const container = document.querySelector('.elements__card');//контейнер для вставки из template
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClosePlace = document.querySelector('.popup__button-close_place');
const nameInputPlace = document.querySelector('.popup__name-input-place');
const linkInputPlace = document.querySelector('.popup__link-input-place');
const buttonCloseImage = document.querySelector('.popup__button-close_image');
const imagePopup = document.querySelector('.popup__image');

const closePopupByEsc = (evt) => {//функция закрытия попапа по клавише escape
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
}

const closePopupByOverlay = (evt) => {//функция закрытия попапа по оверлею
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup(popup) {// функция открытия любого попапа
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByOverlay);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {//// функция закрытия любого попапа
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlay);
  popup.classList.remove('popup_opened');
}

function openPopupEdit() {
  openPopup(profilePopup);
  inputName.value = profileName.textContent;//значение со страницы вставляется в инпут
  inputJob.value = profileJob.textContent;//значение со страницы вставляется в инпут
}

profileEditButton.addEventListener('click', openPopupEdit);

function closePopupEdit() {
  closePopup(profilePopup);
}
buttonCloseEdit.addEventListener('click', closePopupEdit);

function handleFormSubmit(e) {//функция для отправки форм
  e.preventDefault();//отмена действия браузера (в данном случае перезагрузки страницы)
  profileName.textContent = inputName.value;//на страницу переносится значение из инпута в попапе
  profileJob.textContent = inputJob.value;//на страницу переносится значение из инпута в попапе
  closePopup(profilePopup);//функция включения и отключения класса для отображения попапа
}
popupFormEdit.addEventListener('submit', handleFormSubmit);

function openPopupPlace() {//функция включения и отключения класса для отображения попапа
  openPopup(cardPopup);
}

buttonAdd.addEventListener('click', () => {
  enableValidation();
  openPopupPlace();
}
);

function closePopupPlace() {//функция включения и отключения класса для отображения попапа
  closePopup(cardPopup);
}
buttonClosePlace.addEventListener('click', closePopupPlace);

function closePopupImage() {
  closePopup(zoomPopup);
}
buttonCloseImage.addEventListener('click', closePopupImage);

function openPopupImage() {
  openPopup(zoomPopup);
}

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

function getItem(element) {//функция для заполнения контейнера содержимым из template
  const listElement = templateElement.cloneNode(true);//клонирование шаблона
  const titleElement = listElement.querySelector('.elements__title');//переменная содержащая заголовок
  titleElement.textContent = element.name;//берем из массива элемент с ключом name
  const elementImage = listElement.querySelector('.elements__image');//переменная содержащая ссылку на картинку
  elementImage.src = element.link;//берем из массива элемент с ключом link
  elementImage.alt = element.name;//присваиваем картинке из объекта альт с названием из объекта же

  const likeButton = listElement.querySelector('.elements__like');//переменная содержащая кнопку лайк
  likeButton.addEventListener('click', function (e) {//функция для переключения состояния лайка
    e.target.classList.toggle('elements__like_active');
  });

  const trash = listElement.querySelector('.elements__trash');//переменная содержащая кнопку удаления карточки
  trash.addEventListener('click', function () {//функция для удаления карточки по кнопке контейнера
    trash.closest('.elements__list').remove();
  });

  const imageCard = listElement.querySelector('.elements__image');
  imageCard.addEventListener('click', () => {
    imagePopup.src = element.link;
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = titleElement.textContent;
    openPopupImage();
  });

  return listElement;
}

function renderCard(element, needToPrepend = false) {
  const listElement = getItem(element);
  if (needToPrepend) {
    container.prepend(listElement);
  } else {
    container.append(listElement);
  }
}

function createCard(e) {//функция для добавления новой карточки
  e.preventDefault();
  const obj = { name: nameInputPlace.value, link: linkInputPlace.value };
  renderCard(obj, true);
  closePopupPlace();
  nameInputPlace.value = '';
  linkInputPlace.value = '';
}
popupFormPlace.addEventListener('submit', createCard);

initialCards.forEach(function (element) {//перебор заданного массива
  renderCard(element);//вызов функции для заполнения контейнера содержимым из template
});

enableValidation(config);// функция для включения валидации форм