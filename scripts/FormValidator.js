export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;  //formSelector: ".popup__form",
    this._inputSelector = config.inputSelector;    //inputSelector: ".popup__input",
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); //массив всех полей формы
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); // кнопка данной формы
  }

  //функция которая добавляет класс с ошибкой
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //функция которая проверяет валидность поля и управляет состоянием ошибки инпута
  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //проверяем все инпуты на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //устанавливаем статус кнопки (активна или неактивна)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  //блокирование кнопки при открытии попапа добавления новой карточки
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //Установить слушателИ событий (для всех полей в данной форме)
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
    this._formElement.addEventListener("reset", () =>
      this._disableButton()
    );
  };

  // добавление обработчиков всем формам
  enableValidation() {
    this._setEventListeners();
  };
}
