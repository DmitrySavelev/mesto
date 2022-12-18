
export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer; // this._renderer = (item) => section.addItem(createCard(item), false)
    this._container = document.querySelector(selector);
  }

  renderItems(data) { // отвечает за отрисовку всех элементов
    data.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(itemHtml, needToPost) {   // принимает DOM-элемент и добавляет его в контейнер
    if (needToPost) {
      this._titleCard = itemHtml.querySelector(".elements__title").textContent;
      this._imageCard = itemHtml.querySelector(".elements__image").src;
      this._likeCard = itemHtml.querySelector(".elements__like_count").textContent;

      this._container.prepend(itemHtml);
    } else {
      this._container.append(itemHtml);
    }
  }

}
