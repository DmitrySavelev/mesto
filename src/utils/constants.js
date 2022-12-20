export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

export const containerSelector = '.elements__card'; //селектор контейнера, в который добавляем созданные элементы
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const buttonUpdateAvatar = document.querySelector('.profile__avatar');
export const formEdit = document.querySelector('.popup__form_edit');
export const formCard = document.querySelector('.popup__form_place');
export const formAvatar = document.querySelector('.popup__form_avatar');
export const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    "content-type": "application/json",
    authorization: 'a7b314d6-1385-42b9-9441-5dfc8867843a',
  },
}
