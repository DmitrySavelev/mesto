class FormValidator {
  constructor(config, classForm) {
    this.formSelector = config.formSelector;  //formSelector: ".popup__form",
    this.inputSelector = config.inputSelector;    //inputSelector: ".popup__input",
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;

    this.classForm = classForm;
    this.formList = Array.from(document.querySelectorAll(this.formSelector));//это мы создаем массив всех форм
    this.inputList = Array.from(this.classForm.querySelectorAll(this.inputSelector)); //массив всех полей формы
    this.buttonElement = this.classForm.querySelector(this.submitButtonSelector); // кнопка данной формы
  }


  //функция которая добавляет класс с ошибкой
  _showInputError(inputElement) {
    const errorElement = this.classForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.errorClass);
  };

  //функция которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this.classForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  };

  //функция которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement
      );
    } else {
      this._hideInputError(inputElement);
    }
  };

  //проверяем все инпуты на валидность
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //устанавливаем статус кнопки (активна или неактивна)
  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", "true");
      this.buttonElement.disabled = "true";
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };

  //блокирование кнопки при открытии попапа добавления новой карточки
  _disableButton() {
    this.buttonElement.classList.add(this.inactiveButtonClass);
    this.buttonElement.setAttribute("disabled", true);
  }

  //Установить слушателИ событий (для всех полей в данной форме)
  _setEventListeners() {
    this._toggleButtonState(this.inputList, this.buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement);
      });
    });
    this.classForm.addEventListener("reset", () =>
      this._disableButton()
    );
  };

  // добавление обработчиков всем формам
  enableValidation = () => {
    this.formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };
}
