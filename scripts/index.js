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

function openPopup(popup) {// функция открытия любого попапа
  popup.classList.add('popup_opened');
}
function closePopup(popup) {//// функция закрытия любого попапа
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
buttonAdd.addEventListener('click', openPopupPlace);

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
  imageCard.addEventListener('click', function zoomImage() {
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

//Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6
//Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6
//Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6 Практическая работа 6

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement) => {//Установить слушателИ событий (для всех полей в данной форме)
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();











profilePopup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {closePopupEdit()}
});

cardPopup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopupPlace();
  }
});

zoomPopup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopupImage();
  }
});

elemet.forEach((button) => {

  button.addEventListener('click', (event)=> {

    const comPopup = event.target.closest('.popup');
    if(event.target === event.currentTarget) {

      close(comPopup);
    }

  });

});






document.addEventListener('keydown', (evt) => {
  // const popup = document.querySelectorAll('.popup');
  if(evt.key === 'Escape') {

    closePopup(evt.target);

    // closePopupEdit();
  }
})


// function handleEscape(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(evt.target);
//   }
// };




// function handleOverlay(evt) {
//   if (evt.target === modalWindow) {
//     closePopup(modalWindow);
//   }
// };


