export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector, api) {
    this._api = api;
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  renderUserInfo() {
    this._api.getUserInfo()
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        this._avatarSelector.src = data.avatar;
      })
      .catch(error => console.error(error));
  }

  //   Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent
    }
  }

  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, job) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job
  }
}