import ElementsFactory from "./factories.js";
import Modal from "./modal.js";

export default class Lightbox extends Modal {
  constructor() {
    super();
    this.modal = document.querySelector(".lightbox");
    this.modalMediaImage = document.querySelector(".photographer-media");
    this.modalMediaName = document.querySelector(".lightbox__media-title");
    this.lightboxContent = document.querySelector(".lightbox__content");
    this.elementFactory = new ElementsFactory();
    this.currentMediaIndex = 0;
  }
  displayMediaInLightbox(type, { photographerId, video, image, id, title, altText }) {
    this.lightboxContent.innerHTML = "";
    let lightboxMedia;

    if (!type) {
      lightboxMedia = this.elementFactory.createLightbox("video", {
        id: id,
        title: title,
        video_url: video,
        photographerId: photographerId,
        altText: altText
      });
    } else {
      lightboxMedia = this.elementFactory.createLightbox("image", {
        id: id,
        title: title,
        image_url: image,
        photographerId: photographerId,
        altText: altText
      });
    }
    this.lightboxContent.innerHTML = lightboxMedia;
  }
  initializeLightbox(mediaId, allMedia) {
    let idInteger = parseInt(mediaId);

    const selectedMedia = allMedia.find((media) => media.id === idInteger);

    const { id, photographerId, video, image, title, altText } = selectedMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
      altText
    });
  }

  goToPrevious(allMedia) {
    const currentMediaId = parseInt(document.querySelector(".photographer-media").id);
    this.currentMediaIndex = allMedia.findIndex((image) => image.id === currentMediaId);
    console.log(this.currentMediaIndex);

    //get the previous index
    let previousMediaIndex;
    if (this.currentMediaIndex === 0) {
      // if index = 0 => display the last media
      previousMediaIndex = allMedia.length - 1;
    } else {
      // if index > 0 => display the currentmedia -1
      previousMediaIndex = this.currentMediaIndex - 1;
    }

    const previousMedia = allMedia[previousMediaIndex];
    const { id, photographerId, video, image, title, altText } = previousMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
      altText
    });
  }

  goToNext(allMedia) {
    const currentMediaId = parseInt(document.querySelector(".photographer-media").id);

    this.currentMediaIndex = allMedia.findIndex((image) => image.id === currentMediaId);
    console.log(this.currentMediaIndex);

    //get the previous index
    let nextMediaIndex;
    if (this.currentMediaIndex === allMedia.length - 1) {
      // if index = 0 => display the last media
      nextMediaIndex = 0;
    } else {
      // if index > 0 => display the currentmedia -1
      nextMediaIndex = this.currentMediaIndex + 1;
    }

    const nextMedia = allMedia[nextMediaIndex];
    const { id, photographerId, video, image, title, altText } = nextMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
      altText
    });
  }
}
