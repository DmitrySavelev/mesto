import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profilePopup = document.querySelector(".popup_edit");
const cardPopup = document.querySelector(".popup_card");
const zoomPopup = document.querySelector(".popup_zoom");

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonCloseEdit = document.querySelector(".popup__button-close_edit");
const popupFormEdit = document.querySelector(".popup__form_edit");
const popupFormPlace = document.querySelector(".popup__form_place");
const inputName = document.querySelector(".popup__input_name");
const inputJob = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const cardsContainer = document.querySelector(".elements__card"); //контейнер для вставки из template
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClosePlace = document.querySelector(".popup__button-close_place");
const nameInputPlace = document.querySelector(".popup__name-input-place");
const linkInputPlace = document.querySelector(".popup__link-input-place");
const buttonCloseImage = document.querySelector(".popup__button-close_image");
const imagePopup = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formEdit = document.querySelector('.popup__form_edit');
const formCard = document.querySelector('.popup__form_place');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

//функция закрытия попапа по клавише escape
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

//функция закрытия попапа по оверлею
const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

// функция открытия любого попапа
function openPopup(popup) {
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByOverlay);
  popup.classList.add("popup_opened");
}

// функция закрытия любого попапа
function closePopup(popup) {
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlay);
  popup.classList.remove("popup_opened");
}

function openPopupEdit() {
  inputName.value = profileName.textContent; //значение со страницы вставляется в инпут
  inputJob.value = profileJob.textContent; //значение со страницы вставляется в инпут
  openPopup(profilePopup);
}

function closePopupEdit() {
  closePopup(profilePopup);
}

function handleEditProfileFormSubmit(e) {
  //функция для отправки форм
  e.preventDefault(); //отмена действия браузера (в данном случае перезагрузки страницы)
  profileName.textContent = inputName.value; //на страницу переносится значение из инпута в попапе
  profileJob.textContent = inputJob.value; //на страницу переносится значение из инпута в попапе
  closePopup(profilePopup); //функция включения и отключения класса для отображения попапа
}

//функция включения и отключения класса для отображения попапа
function openPopupPlace() {
  openPopup(cardPopup);
}

function closePopupPlace() {
  //функция включения и отключения класса для отображения попапа
  closePopup(cardPopup);
}

function closePopupImage() {
  closePopup(zoomPopup);
}

function handleOpenPopupZoom(name, link) {
  imagePopup.src = link;
  popupCaption.textContent = name;
  openPopup(zoomPopup);
}

function insertCard(element, container, needToPrepend = false) {
  if (needToPrepend) {
    container.prepend(element);
  } else {
    container.append(element);
  }
}

//функция для добавления новой карточки
function handleAddCardSubmit(e) {
  e.preventDefault();
  const objectCard = { name: nameInputPlace.value, link: linkInputPlace.value };
  const card = new Card(objectCard, '#template', handleOpenPopupZoom);
  insertCard(card.createCard(), cardsContainer, true);
  closePopupPlace();
  popupFormPlace.reset();
}

initialCards.forEach((cardElem) => {
  //перебор заданного массива
  const card = new Card(cardElem, '#template', handleOpenPopupZoom);
  insertCard(card.createCard(), cardsContainer);
});

const formValidatorEdit = new FormValidator(validationConfig, formEdit);
const formValidatorCard = new FormValidator(validationConfig, formCard);

formValidatorEdit.enableValidation();
formValidatorCard.enableValidation();

profileEditButton.addEventListener("click", openPopupEdit);
buttonCloseEdit.addEventListener("click", closePopupEdit);
popupFormEdit.addEventListener("submit", handleEditProfileFormSubmit);
buttonAdd.addEventListener("click", openPopupPlace);
buttonClosePlace.addEventListener("click", closePopupPlace);
buttonCloseImage.addEventListener("click", closePopupImage);
popupFormPlace.addEventListener("submit", handleAddCardSubmit);