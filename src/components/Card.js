export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    //функция для заполнения контейнера содержимым из template
    this._element = this._getTemplate();

    this.titleCard = this._element.querySelector(".elements__title");
    this.titleCard.textContent = this._name;

    this._imageCard = this._element.querySelector(".elements__image");
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._setListeners();

    return this._element;
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("elements__like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._likeButton.addEventListener("click", () => this._handleLikeClick());

    this._deleteButton = this._element.querySelector(".elements__delete");
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick());

    this._imageCard.addEventListener("click", () => this._handleImageClick());
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }
}
