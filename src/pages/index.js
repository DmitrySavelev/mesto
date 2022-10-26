import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
} from "../utils/constants.js";

function createCard(cardData) {
  const card = new Card(
    { name: cardData.name, link: cardData.link },
    '#template',
    popupImage.open.bind(popupImage),
  );
  return card.createCard();
}

const section = new Section({
  items: initialCards,
  renderer: (item) => section.addItem(createCard(item), true),
},
  containerSelector
);

const handleProfileFormSubmit = (formValue) => {
  userInfo.setUserInfo(formValue.inputName, formValue.inputJob);
  popupEdit.close();
}

const handleCardFormSubmit = (formValue) => {
  section.addItem(createCard(formValue));
  popupAdd.close();
}

const popupImage = new PopupWithImage('.popup_zoom');
const popupEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_card', handleCardFormSubmit);
const userInfo = new UserInfo(".profile__name", ".profile__job");
const formValidatorEdit = new FormValidator(validationConfig, formEdit);
const formValidatorCard = new FormValidator(validationConfig, formCard);

function handleEditProfileButtonClick() {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
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

section.renderItems();