export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, userId, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;// id для каждой конкретной карточки
    this._ownerId = data.owner._id;//id любого из студентов для установки корзины
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._userId = userId;// мой личный owner._id
    this._handleLikeClick = handleLikeClick;
  }

  isLiked() {
    const userLikedActive = this._likes.find(user => user._id === this._userId);
    return userLikedActive;
  }

  setLikeCountCard(newLikes) {
    this._likes = newLikes;
    this._likeCountCard.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("elements__like_active");
    } else {
      this._likeButton.classList.remove("elements__like_active");
    }
  }

  createCard() {
    //функция для заполнения контейнера содержимым из template
    this._element = this._getTemplate();

    this.titleCard = this._element.querySelector(".elements__title");
    this.titleCard.textContent = this._name;

    this._imageCard = this._element.querySelector(".elements__image");
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._element.id = this._id;

    this._deleteCard = this._element.querySelector(".elements__delete");

    this._likeCountCard = this._element.querySelector(".elements__like_count");

    this._isOwner();
    this._setListeners();
    this.setLikeCountCard(this._likes);

    return this._element;
  }

  _isOwner() {
    if (this._ownerId !== this._userId) {
      this._deleteCard.remove();
      this._deleteButton = null;
    }
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._likeButton.addEventListener("click", () => this._handleLikeClick(this._id));

    this._deleteButton = this._element.querySelector(".elements__delete");
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleCardDelete(this._id);
      });
    }

    this._imageCard.addEventListener("click", () => this._handleImageClick());
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }
}
