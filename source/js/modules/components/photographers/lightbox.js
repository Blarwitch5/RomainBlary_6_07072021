import HtmlMarkup from "../../factory/htmlMarkups.js";

export default class Lightbox {
  constructor() {
    this.body = document.querySelector("body");
    this.lightbox = document.querySelector(".lightbox");
    this.mainContent = document.querySelector(".main-content");
    this.mediaName = document.querySelector(".lightbox__media-title");
    this.lightboxContent = document.querySelector(".lightbox__content");

    this.html = new HtmlMarkup();
    this.currentMediaIndex = 0;
  }
  initialize(currentMedia, currentMediaTitle) {
    let mediasArray = Array.from(document.querySelectorAll(".media"));

    this._buildDom();

    mediasArray.forEach((mediaItem, index) =>
      mediaItem.addEventListener("click", () => {
        let mediaContainer = document.querySelector(".lightbox__media-container");
        let source = currentMedia[index];
        let sourceTitle = `<figcaption class="lightbox__media-title">${currentMediaTitle[index]}</figcaption>`;
        this.currentMediaIndex = index;

        this.lightbox.style.position = "fixed";
        this.lightbox.setAttribute("aria-hidden", "false");
        this.mainContent.setAttribute("aria-hidden", "true");
        this.body.style.overflow = "hidden";

        mediaContainer.innerHTML = `${source} ${sourceTitle}`;
      })
    );
    mediasArray.forEach((mediaItem, index) =>
      mediaItem.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === "Space") {
          console.log('hello')
          let mediaContainer = document.querySelector(".lightbox__media-container");
          let source = currentMedia[index];
          let sourceTitle = `<figcaption class="lightbox__media-title">${currentMediaTitle[index]}</figcaption>`;
          this.currentMediaIndex = index;

          this.lightbox.style.position = "fixed";
          this.lightbox.setAttribute("aria-hidden", "false");
          this.mainContent.setAttribute("aria-hidden", "true");
          this.body.style.overflow = "hidden";

          mediaContainer.innerHTML = `${source} ${sourceTitle}`;
        }
      })
    );
    this.goToPrevious(document.querySelector(".previous"), currentMedia, currentMediaTitle);
    this.goToNext(document.querySelector(".next"), currentMedia, currentMediaTitle);
    this.closeLightbox();
    this.keyboardAccessibility(currentMedia, currentMediaTitle);
    return this;
  }

  /**
   * builds the lightbox DOM elements
   */
  _buildDom() {
    this.lightbox.innerHTML = this.html.lightbox();
  }

  closeLightbox() {
    document.querySelector(".js-modal-btn-close").addEventListener("click", (event) => {
      this.body.style.overflow = "auto";
      this.body.style.position = "relative";
      this.lightbox.style.display = "none";
      this.lightbox.setAttribute("aria-hidden", "true");
      this.mainContent.setAttribute("aria-hidden", "false");
    });
  }
  goToPrevious(element, media, title) {
    element.addEventListener("click", () => {
      this.currentMediaIndex -= 1;
      let mediaContainer = document.querySelector(".lightbox__media-container");

      if (this.currentMediaIndex < 0) {
        this.currentMediaIndex = media.length - 1;
        this.currentMediaIndex = title.length - 1;
      }

      let source = media[this.currentMediaIndex];
      let sourceTitle = `<figcaption class="lightbox__media-title">${title[this.currentMediaIndex]}</figcaption>`;

      mediaContainer.innerHTML = `${source} ${sourceTitle}`;
    });
  }
  goToNext(element, media, title) {
    element.addEventListener("click", () => {
      this.currentMediaIndex += 1;
      let mediaContainer = document.querySelector(".lightbox__media-container");

      if (this.currentMediaIndex > title.length - 1) {
        this.currentMediaIndex = 0;
      }

      let source = media[this.currentMediaIndex];
      let sourceTitle = `<figcaption class="lightbox__media-title">${title[this.currentMediaIndex]}</figcaption>`;

      mediaContainer.innerHTML = `${source} ${sourceTitle}`;
    });
  }
  keyboardAccessibility(currentMedia, currentMediaTitle) {
    let mediaContainer = document.querySelector(".lightbox__media-container");

    document.addEventListener("keydown", (key) => {
      //   const key = event.key;

      if (key.code == "ArrowLeft") {
        this.currentMediaIndex -= 1;

        if (this.currentMediaIndex < 0) {
          this.currentMediaIndex = currentMedia.length - 1;
          this.currentMediaIndex = currentMediaTitle.length - 1;
        }

        let source = currentMedia[this.currentMediaIndex];
        let sourceTitle = `<figcaption class="lightbox__media-title">${currentMediaTitle[this.currentMediaIndex]}</figcaption>`;

        mediaContainer.innerHTML = `${source} ${sourceTitle}`;
      } else if (key.code == "ArrowRight") {
        this.currentMediaIndex += 1;

        if (this.currentMediaIndex > currentMediaTitle.length - 1) {
          this.currentMediaIndex = 0;
        }

        let source = currentMedia[this.currentMediaIndex];
        let sourceTitle = `<figcaption class="lightbox__media-title">${currentMediaTitle[this.currentMediaIndex]}</figcaption>`;

        mediaContainer.innerHTML = `${source} ${sourceTitle}`;
      } else if (key.code == "Escape") {
        this.body.style.overflow = "auto";
        this.body.style.position = "relative";
        this.lightbox.style.display = "none";
        this.lightbox.setAttribute("aria-hidden", "true");
        this.mainContent.setAttribute("aria-hidden", "false");
      }
    });
  }
}
