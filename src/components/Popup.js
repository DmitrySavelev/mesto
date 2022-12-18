export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener("keydown", this._closePopupByEsc);
    this._popup.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._closePopupByEsc);
    this._popup.classList.remove("popup_opened");
    this._currentCardId = null;
  }

  _closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    })
  }



}





