export default class Modal {
  constructor(data) {
    this.data = data;
    this.modal = document.querySelector(".contact-modal");
    this.mainContent = document.querySelector(".main-content");
    this.openBtns = document.querySelector(".js-modal-btn-open");
    this.closeBtns = document.querySelector(".js-modal-btn-close");
    this.body = document.querySelector("body");
  }
  buildModal() {
    if (this.openBtns) {
      this.openBtns.addEventListener("click", () => {
        this.launchModal();
      });
      this._diplaysPhotographerName(this.data);
    }
    if (this.closeBtns) {
      this.closeBtns.addEventListener("click", () => {
        this.hideModal();
      });
    }
  }
  launchModal() {
    this.body.style.overflow = "hidden";
    this.modal.setAttribute("aria-hidden", "false");
    this.mainContent.setAttribute("aria-hidden", "true");
  }
  hideModal() {
    this.body.style.overflow = "auto";
    this.body.style.position = "relative";
    this.modal.style.display = "none";
    this.modal.setAttribute("aria-hidden", "true");
    this.mainContent.setAttribute("aria-hidden", "false");
  }
  _getCurrentPhotographerName(data) {
    const url = new URL(window.location.href);
    let urlId = url.searchParams.get("id");
    let id = parseInt(urlId);
    const photographer = data.filter(function (element) {
      if (element.id === id) {
        return element;
      }
    });
    let photographerNameValue = `${photographer[0].name}`;
    return photographerNameValue;
  }
  _diplaysPhotographerName(data) {
    let currentPhotographerName = this._getCurrentPhotographerName(data);
    let photographerNameDomElement = document.getElementById("js-photographer-name");
    photographerNameDomElement.innerHTML = currentPhotographerName;
  }
}
