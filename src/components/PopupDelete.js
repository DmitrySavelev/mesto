import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._currentCardId = null;
  }

  open(currentCardId) {
    super.open();
    this._currentCardId = currentCardId;
  }

  close() {
    super.close();
    this._currentCardId = null;
  }

  _handlerDeleteClick() {
    const elem = document.getElementById(this._currentCardId);
    elem.remove();
    this._handleDeleteCard(this._currentCardId);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    const popupButtonDelete = document.querySelector(".popup__button_delete");
    popupButtonDelete.addEventListener('click', () => {
      this._handlerDeleteClick();
    })
  }

}