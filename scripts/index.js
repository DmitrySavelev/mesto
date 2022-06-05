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
const popupFormPlace = document.querySelector('.popup__form_place');
const nameInputPlace = document.querySelector('.popup__name-input-place');
const jobInputPlace = document.querySelector('.popup__job-input-place');


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

function addCard(e) {//функция для добавления новой карточки
  e.preventDefault();
  let obj = {name:nameInputPlace.value, link:jobInputPlace.value};
  initialCards.unshift(obj);
  // container.prepend(obj);
  renderItem(obj);
  togglePopupPlace();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', togglePopupPlace);
closeButtonPlace.addEventListener('click', togglePopupPlace);
popupFormPlace.addEventListener('submit', addCard);




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
  data.forEach(function(item) {//перебор заданного массива
    renderItem(item);//вызов функции для заполнения контейнера содержимым из template
  })
};

function renderItem(element) {//функция для заполнения контейнера содержимым из template
  const listElement = cloneTemplate(document.querySelector('#template'));//клонирование шаблона
  const titleElement = listElement.querySelector('.elements__title');//элемент содержащий заголовок
  titleElement.textContent = element.name;//берем из массива элемент с ключом name
  const elementItem = listElement.querySelector('.elements__item');//элемент содержащий ссылку на картинку
  elementItem.src = element.link;//берем из массива элемент с ключом link
  container.prepend(listElement);//добавляем в конец контейнера получившийся склонированный блок
  // if (listElement == false) {
  //   container.prepend(listElement);//добавляем в конец контейнера получившийся склонированный блок
  // } else {
  //   container.append(listElement);//добавляем в конец контейнера получившийся склонированный блок
  // }
}

function cloneTemplate(container) {
  const templateElement = container.content;
  const newElement = templateElement.cloneNode(true);
  return newElement;
}

renderList(initialCards.reverse());//вызов функции с изначальным массивом








// function createCard(e) {\\может пригодится
//   e.preventDefault();
//   let arr = [];
//   arr.push({
//     name: `${nameInputPlace.value}`,
//     link: `${jobInputPlace.value}`
//   });
//   // let obj = {name:nameInputPlace.value, link:jobInputPlace.value};
//   initialCards.concat(arr);
//   // initialCards.unshift(obj);
//   // container.prepend(obj);
//   togglePopupPlace();
// }