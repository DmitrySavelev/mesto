class Card {

  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  renderCard(card, needToPrepend = false) {
    if (needToPrepend) {
      cardsContainer.prepend(this._createCard(card));
    } else {
      cardsContainer.append(this._createCard(card));
    }
  }

  _handleLike() {
    this.likeButton.classList.toggle("elements__like_active");
  }

  _handleDelete() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  _zoomCard = () => {
    imagePopup.src = this._link;
    popupCaption.textContent = this._name;
    openPopup(zoomPopup);
  };

  _setListeners() {
    this.likeButton = this._element.querySelector(".elements__like");
    this.likeButton.addEventListener("click", () => this._handleLike());

    this.deleteButton = this._element.querySelector(".elements__delete");
    this.cardElement = this._element.querySelector(".elements__list");
    this.deleteButton.addEventListener("click", () => this._handleDelete());

    this.imageCard = this._element.querySelector(".elements__image");
    this.imageCard.addEventListener("click", this._zoomCard);
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  _createCard() {
    //функция для заполнения контейнера содержимым из template
    this._element = this._getTemplate();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;

    this._setListeners();

    return this._element;
  }
}
