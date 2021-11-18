export default class Modal {
  constructor() {
    this.contactElement = document.querySelector(".contact-modal");
    this.contactEndElement = document.querySelector(".contact-end-modal");
    this.mainContent = document.querySelector(".main-content");
    this.openBtns = document.querySelectorAll("js-modal-btn-open");
    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
    this.lightboxElement = document.querySelector(".lightbox");
    this.body = document.querySelector("body");
  }
  launchModal(modal) {
    this.body.style.overflow = "hidden";
    modal.setAttribute("aria-hidden", "false");
    this.mainContent.setAttribute("aria-hidden", "true");
    this.lightboxElement.style.position = "fixed";
  }
  hideModal(modal) {
    this.body.style.overflow = "auto";
    this.body.style.position = "relative";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    this.mainContent.setAttribute("aria-hidden", "false");
  }
}
