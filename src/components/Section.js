export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() { // отвечает за отрисовку всех элементов
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(itemHtml, needToPrepend = false) {   // принимает DOM-элемент и добавляет его в контейнер
    if (needToPrepend) {
      this._container.append(itemHtml);
    } else {
      this._container.prepend(itemHtml);
    }
  }

}
