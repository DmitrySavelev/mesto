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

  // _handleLike () {
  //   this._element.querySelector(".elements__like").classList.toggle("elements__like_active");
  // }

  _setListeners() {
    const likeButton = this._element.querySelector(".elements__like"); //переменная содержащая кнопку лайк
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like_active");
    });
    const deleteButton = this._element.querySelector(".elements__delete"); //переменная содержащая кнопку удаления карточки
    const cardElement = this._element.querySelector(".elements__list");
    deleteButton.addEventListener("click", function () {
      //функция для удаления карточки по кнопке контейнера
      cardElement.remove();
    });

    const imageCard = this._element.querySelector(".elements__image");
    const zoomCard = () => {
      imagePopup.src = this._link;
      popupCaption.textContent = this._name;
      openPopupImage();
    };
    imageCard.addEventListener("click", zoomCard);
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

    this._setListeners()

    return this._element;
  }
}
