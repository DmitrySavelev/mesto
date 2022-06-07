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
const popupNewPlace = document.querySelector('.popup_new-place');
const closeButtonPlace = document.querySelector('.popup__button-close_place');
const popupFormPlace = document.querySelector('.popup__form_place');
const nameInputPlace = document.querySelector('.popup__name-input-place');
const jobInputPlace = document.querySelector('.popup__job-input-place');
const popupImage = document.querySelector('.popup_zoom-card');
const closeButtonImage = document.querySelector('.popup__button-close_image');

function togglePopup() {//функция включения и отключения класса для отображения попапа
  popup.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
  if (popup.classList.contains('popup_opened')) {//если в попапе есть класс то...
    nameInput.value = profileName.textContent;//значение со страницы вставляется в инпут
    jobInput.value = profileJob.textContent;//значение из инпута в попапе вставляется на страницу
  }
}

function formSubmitHandler(e) {//функция для отправки форм
  e.preventDefault();//отмена действия браузера (в данном случае перезагрузки страницы)
  profileName.textContent = nameInput.value;//на страницу переносится значение из инпута в попапе
  profileJob.textContent = jobInput.value;//на страницу переносится значение из инпута в попапе
  togglePopup();//функция включения и отключения класса для отображения попапа
}

function togglePopupPlace() {//функция включения и отключения класса для отображения попапа
  popupNewPlace.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}

function createCard(e) {//функция для добавления новой карточки
  e.preventDefault();
  let obj = { name: nameInputPlace.value, link: jobInputPlace.value };
  initialCards.unshift(obj);
  renderItem(obj);
  togglePopupPlace();
}

function togglePopupImage() {
  popupImage.classList.toggle('popup_opened');//включается или отключается класс для отображения попапа
}


editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
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
  const elementItem = listElement.querySelector('.elements__item');//переменная содержащая ссылку на картинку
  elementItem.src = element.link;//берем из массива элемент с ключом link

  const likeButton = listElement.querySelector('.elements__like');//переменная содержащая кнопку лайк
  likeButton.addEventListener('click', function (e) {//функция для переключения состояния лайка
    e.target.classList.toggle('elements__like_active');
  });

  const trash = listElement.querySelector('.elements__trash');//переменная содержащая кнопку удаления карточки
  trash.addEventListener('click', function () {//функция для удаления карточки по кнопке контейнера
    trash.closest('.elements__list').remove();
  });

  const imageCard = listElement.querySelector('.elements__item');
  imageCard.addEventListener('click', function zoomImage() {
    togglePopupImage();
  });

  container.prepend(listElement);//добавляем в конец контейнера получившийся склонированный блок
}

renderList(initialCards.reverse());//вызов функции с изначальным массивом







// const button = document.querySelector('.button');
// function deleteSpan() {
//   button.closest('.test').remove();
// }
// button.addEventListener('click', deleteSpan);








