import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  initialCards,
  validationConfig,
  containerSelector,
  buttonEdit,
  inputName,
  inputJob,
  buttonAdd,
  formEdit,
  formCard,
  apiUrl,
  authCode
} from "../utils/constants.js";

const api = new Api(apiUrl, authCode);


fetch('https://nomoreparties.co/v1/cohort-52/users/me ', {
  headers: {
    "content-type": "application/json",
    authorization: authCode,
  },
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
   console.log(data);

  })
  .catch(error => console.error(error));



function createCard(cardData) {
  const card = new Card(
    { name: cardData.name, link: cardData.link },
    '#template',
    popupImage.open.bind(popupImage),
  );
  return card.createCard();// здесь уже готовый элемент для вставки в контейнер
}

const section = new Section({
  renderer: (item) => section.addItem(createCard(item), true),
},
  containerSelector, api
);

const handleProfileFormSubmit = (formValue) => {
  userInfo.setUserInfo(formValue.inputName, formValue.inputJob);
  popupEdit.close();
}

const handleCardFormSubmit = (formValue) => {
  section.addItem(createCard(formValue));//section.addItem - добавление готового элемента в контейнер
  popupAdd.close();
}


const popupImage = new PopupWithImage('.popup_zoom');
const popupEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_card', handleCardFormSubmit);
const userInfo = new UserInfo(".profile__name", ".profile__job", ".profile__avatar", api);
const formValidatorEdit = new FormValidator(validationConfig, formEdit);
const formValidatorCard = new FormValidator(validationConfig, formCard);

function handleEditProfileButtonClick() {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  console.log(userInfoObj);

  inputName.value = userInfoObj.name;
  inputJob.value = userInfoObj.job;
}

function handleAddCardButtonClick() {
  popupAdd.open();
}

buttonEdit.addEventListener('click', handleEditProfileButtonClick);
buttonAdd.addEventListener('click', handleAddCardButtonClick);

formValidatorEdit.enableValidation();
formValidatorCard.enableValidation();

popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

userInfo.renderUserInfo();
section.renderItems();




// import Popup from "../components/Popup.js";
// const popupDeleteCard = new Popup('.popup_delete');

// function handleEEE() {
//   // popupDeleteCard.open();
//   console.log('work');

// }
// const buttonDelete = document.querySelector('.elements__delete')
// buttonDelete.addEventListener('click', handleEEE);

// popupDeleteCard.setEventListeners();