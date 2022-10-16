export class Card {
  constructor(data, templateSelector, handleOpenPopupZoom) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupZoom = handleOpenPopupZoom;
  }

  createCard(out, needToPrepend = false) {
    //функция для заполнения контейнера содержимым из template
    this._element = this._getTemplate();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;

    this._setListeners();

    if (needToPrepend) {
      out.prepend(this._element);
    } else {
      out.append(this._element);
    }
  }

  _handleLike() {
    this._likeButton.classList.toggle("elements__like_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
    this._name = null;
    this._link = null;
  }

  _setListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._likeButton.addEventListener("click", () => this._handleLike());

    this._deleteButton = this._element.querySelector(".elements__delete");
    this._deleteButton.addEventListener("click", () => this._handleDelete());

    this._imageCard = this._element.querySelector(".elements__image");
    this._imageCard.addEventListener("click", () => this._handleOpenPopupZoom(this._name, this._link));
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }
}
