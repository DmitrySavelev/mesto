const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input-name');
const inputJob = document.querySelector('.popup__input-job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const container = document.querySelector('.elements__card');//контейнер для вставки из template
const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_new-place');
const closeButtonPlace = document.querySelector('.popup__button-close_place');
const popupFormPlace = document.querySelector('.popup__form_place');
const nameInputPlace = document.querySelector('.popup__name-input-place');
const linkInputPlace = document.querySelector('.popup__link-input-place');
const popupZoomCard = document.querySelector('.popup_zoom-card');
const closeButtonImage = document.querySelector('.popup__button-close_image');

function togglePopup() {//функция включения и отключения класса для отображения попапа
  popup.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}

function closePopup() {
  popup.classList.remove('popup_opened');//отключается класс для отображения попапа
  inputName.value = profileName.textContent;//значение со страницы вставляется в инпут
  inputJob.value = profileJob.textContent;//значение со страницы вставляется в инпут
}

function formSubmitHandler(e) {//функция для отправки форм
  e.preventDefault();//отмена действия браузера (в данном случае перезагрузки страницы)
  profileName.textContent = inputName.value;//на страницу переносится значение из инпута в попапе
  profileJob.textContent = inputJob.value;//на страницу переносится значение из инпута в попапе
  closePopup();//функция включения и отключения класса для отображения попапа
}

function togglePopupPlace() {//функция включения и отключения класса для отображения попапа
  popupNewPlace.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}

function createCard(e) {//функция для добавления новой карточки
  e.preventDefault();
  let obj = { name: nameInputPlace.value, link: linkInputPlace.value };
  initialCards.unshift(obj);
  renderItem(obj);
  togglePopupPlace();
  nameInputPlace.value = 'Название';
  linkInputPlace.value = 'Ссылка на картинку';
}

function togglePopupImage() {
  popupZoomCard.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', togglePopupPlace);
closeButtonPlace.addEventListener('click', togglePopupPlace);
popupFormPlace.addEventListener('submit', createCard);

closeButtonImage.addEventListener('click', togglePopupImage);

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

function renderList(data) {//функция для добавления карточек из массива на страницу
  data.forEach(function (item) {//перебор заданного массива
    renderItem(item);//вызов функции для заполнения контейнера содержимым из template
  })
};

function renderItem(element) {//функция для заполнения контейнера содержимым из template
  const templateElement = document.querySelector('#template').content;
  const listElement = templateElement.cloneNode(true);//клонирование шаблона
  const titleElement = listElement.querySelector('.elements__title');//переменная содержащая заголовок
  titleElement.textContent = element.name;//берем из массива элемент с ключом name
  const elementImage = listElement.querySelector('.elements__image');//переменная содержащая ссылку на картинку
  elementImage.src = element.link;//берем из массива элемент с ключом link

  const likeButton = listElement.querySelector('.elements__like');//переменная содержащая кнопку лайк
  likeButton.addEventListener('click', function (e) {//функция для переключения состояния лайка
    e.target.classList.toggle('elements__like_active');
  });

  const trash = listElement.querySelector('.elements__trash');//переменная содержащая кнопку удаления карточки
  trash.addEventListener('click', function () {//функция для удаления карточки по кнопке контейнера
    trash.closest('.elements__list').remove();
  });

  const imageCard = listElement.querySelector('.elements__image');
  imageCard.addEventListener('click', function zoomImage() {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = imageCard.src;
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = titleElement.textContent;
    togglePopupImage();
  });

  if (initialCards.length < 7) {
    container.append(listElement);
  }
  else {
    container.prepend(listElement);
  }
}

renderList(initialCards);//вызов функции с изначальным массивом