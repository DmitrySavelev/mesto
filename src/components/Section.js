export default class Section {
  constructor({ renderer }, selector, api) {
    this._renderer = renderer;
    this._api = api;
    this._container = document.querySelector(selector);
  }

  renderItems() { // отвечает за отрисовку всех элементов
    this._api.getAllCards()
      .then((data) => {
        data.forEach(item => {
          this._renderer(item);
        });
      })
      .catch(error => console.error(error));
  }

  addItem(itemHtml, needToPrepend = false) {   // принимает DOM-элемент и добавляет его в контейнер
    if (needToPrepend) {
      this._container.append(itemHtml);
    } else {
      this._container.prepend(itemHtml);
    }
  }

}
