export default class Modal {
  constructor(data) {
    this.data = data;
    this.validationModal = document.querySelector(".validation-modal");
    this.modal = document.querySelector(".contact-modal");
    this.mainContent = document.querySelector(".main-content");
    this.openBtns = document.querySelector(".js-modal-btn-open");
    this.closeBtns = document.querySelector(".js-modal-btn-close");
    this.body = document.querySelector("body");

    this.focusableElements = this.modal.querySelectorAll("a[href], button, textarea, select, input");
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    this.tabKeyCode = 9;
  }
  buildModal() {
    if (this.openBtns) {
      this.openBtns.addEventListener("click", () => {
        this.launchModal();
      });
      this.openBtns.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === "Space") {
          this.launchModal();
        }
      });
      this._diplaysPhotographerName(this.data);
    }
    if (this.closeBtns) {
      this.closeBtns.addEventListener("click", () => {
        this.hideModal();
      });
    }
   this.modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.hideModal();
      }
    });
    //close modal if click outside
    window.addEventListener("click", (event) => {
      if (event.target === dialog) {
        this.hideModal();
      }
    });
  }
  launchModal() {
    this.body.style.overflow = "hidden";
    this.modal.setAttribute("aria-hidden", "false");
    this.mainContent.setAttribute("aria-hidden", "true");

    this.modal.addEventListener("keydown", (event) => {
      if (event.key === "Tab" || event.keyCode === this.tabKeyCode) {
        if (event.shiftKey) {
          /* shift + tab */
          if (document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            // event.preventDefault();
          }
        } else {
          /* tab */
          if (document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            // event.preventDefault();
          }
        }
      }
    });
    //   Focus first input when dialog opens
    this.modal.querySelector("input").focus();
  }
  hideModal() {
    this.body.style.overflow = "auto";
    this.body.style.position = "relative";
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
