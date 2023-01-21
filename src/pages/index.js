import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupDelete from "../components/PopupDelete.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  validationConfig,
  containerSelector,
  buttonEdit,
  buttonAdd,
  buttonUpdateAvatar,
  formEdit,
  formCard,
  formAvatar,
  configApi,
} from "../utils/constants.js";

let userId;
const api = new Api(configApi);

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes,
      _id: cardData._id,
      owner: cardData.owner,
    },
    '#template',
    popupImage.open.bind(popupImage),
    popupDelete.open.bind(popupDelete),
    userId,
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikeCountCard(res.likes)
          })
          .catch(error => console.error(error));
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikeCountCard(res.likes)
          })
          .catch(error => console.error(error));
      }
    },
  );
  return card.createCard();// здесь уже готовый элемент для вставки в контейнер
}

const section = new Section({
  renderer: (item) => section.addItem(createCard(item), false)//renderer: функция которая описывает логику
  // создания новой карточки
},
  containerSelector
);

const handleProfileFormSubmit = (formValue) => {
  api.editProfile({ name: formValue.inputName, about: formValue.inputJob })
    .then((data) => {
      userInfo.setUserInfo(data)
      popupEdit.close();
    })
    .catch(error => console.error(error))
    .finally(() => popupEdit.renderLoading(false))
}

const handleCardFormSubmit = (formValue) => {
  api.addNewCard(formValue)
    .then((data) => {
      section.addItem(createCard(data), true);//section.addItem - добавление готового элемента в контейнер
      popupAdd.close();
    })
    .catch(error => console.error(error))
    .finally(() => popupAdd.renderLoading(false))
}

const handleAvatarFormSubmit = (formValue) => {
  api.updateAvatar(formValue.link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch(error => console.error(error))
    .finally(() => popupAvatar.renderLoading(false))
}

const handleDeleteCard = (formValue) => {
  api.deleteCard(formValue)
    .then((data) => {
      console.log(data);
      const elem = document.getElementById(formValue);
      console.log(elem);
      elem.remove();
      popupDelete.close();
    })
    .catch(error => console.error(error));
}

const popupDelete = new PopupDelete('.popup_delete', handleDeleteCard);
const popupImage = new PopupWithImage('.popup_zoom');
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit);
const popupEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_card', handleCardFormSubmit);
const userInfo = new UserInfo(".profile__name", ".profile__job", ".profile__avatar-img");
const formValidatorEdit = new FormValidator(validationConfig, formEdit);
const formValidatorCard = new FormValidator(validationConfig, formCard);
const formValidatorAvatar = new FormValidator(validationConfig, formAvatar);

function handleEditProfileButtonClick() {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
}

function handleAddCardButtonClick() {
  popupAdd.open();
}

function handleUpdateAvatarButtonClick() {
  popupAvatar.open();
}

api.getData()
  .then(([userData, cardsData]) => {
    userId = userData._id;
    section.renderItems(cardsData);
    userInfo.renderUserInfo(userData);
  })
  .catch(error => console.error(error));

buttonEdit.addEventListener('click', handleEditProfileButtonClick);
buttonAdd.addEventListener('click', handleAddCardButtonClick);
buttonUpdateAvatar.addEventListener('click', handleUpdateAvatarButtonClick);

formValidatorEdit.enableValidation();
formValidatorCard.enableValidation();
formValidatorAvatar.enableValidation();

popupAvatar.setEventListeners();
popupDelete.setEventListeners();
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();