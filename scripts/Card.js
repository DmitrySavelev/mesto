class Card {
  constructor() {

  }

  //функция для добавления новой карточки
  handleAddCardSubmit(e) {
    e.preventDefault();
    const obj = { name: nameInputPlace.value, link: linkInputPlace.value };
    this.renderCard(obj, true);
    closePopupPlace();
    popupFormPlace.reset();
  }

  renderCard(card, needToPrepend = false) {
    if (needToPrepend) {
      cardsContainer.prepend(this.createCard(card));
    } else {
      cardsContainer.append(this.createCard(card));
    }
  }

  createCard(card) {
    //функция для заполнения контейнера содержимым из template
    const listCard = cardTemplate.cloneNode(true); //клонирование шаблона
    const titleCard = listCard.querySelector(".elements__title"); //переменная содержащая заголовок
    titleCard.textContent = card.name; //берем из массива элемент с ключом name
    const cardImage = listCard.querySelector(".elements__image"); //переменная содержащая ссылку на картинку
    cardImage.src = card.link; //берем из массива элемент с ключом link
    cardImage.alt = card.name; //присваиваем картинке из объекта альт с названием из объекта же

    const likeButton = listCard.querySelector(".elements__like"); //переменная содержащая кнопку лайк
    likeButton.addEventListener("click", () => {
      //функция для переключения состояния лайка
      likeButton.classList.toggle("elements__like_active");
    });

    const deleteButton = listCard.querySelector(".elements__delete"); //переменная содержащая кнопку удаления карточки
    const cardElement = listCard.querySelector(".elements__list");
    deleteButton.addEventListener("click", function () {
      //функция для удаления карточки по кнопке контейнера
      cardElement.remove();
    });

    const imageCard = listCard.querySelector(".elements__image");
    const zoomCard = () => {
      imagePopup.src = card.link;
      popupCaption.textContent = card.name;
      openPopupImage();
    };
    imageCard.addEventListener("click", zoomCard);

    return listCard;
  }






}
