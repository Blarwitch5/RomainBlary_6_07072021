import ElementsFactory from "./factory.js";
import Modal from "./modal.js";

export default class Lightbox extends Modal {
  constructor() {
    super();
    this.modal = document.querySelector(".lightbox");
    // this.closeBtn = document.querySelector(".lightbox__close");
    this.modalMediaImage = document.querySelector(".photographer-media");
    this.modalMediaName = document.querySelector(".lightbox__media-title");
    this.lightboxContent = document.querySelector(".lightbox__content");
    this.elementFactory = new ElementsFactory();
  }
  displayMediaInLightbox(type, { photographerId, video, image, id, title }) {
    this.lightboxContent.innerHTML = "";
    let lightboxMedia;

    if (!type) {
      lightboxMedia = this.elementFactory.createLightbox("video", {
        id: id,
        title: title,
        // image_url: image,
        video_url: video,
        photographerId: photographerId,
      });
    } else {
      lightboxMedia = this.elementFactory.createLightbox("image", {
        id: id,
        title: title,
        image_url: image,
        // video_url: video,
        photographerId: photographerId,
      });
    }
    this.lightboxContent.innerHTML = lightboxMedia;
  }
  displayLightbox(mediaId, allMedia) {
    let idInteger = parseInt(mediaId);

    const selectedMedia = allMedia.find((media) => media.id === idInteger);

    const { id, photographerId, video, image, title } = selectedMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }

  goToPrevious(allMedia) {
    const currentMediaId = parseInt(document.querySelector(".photographer-media").id);

    const currentMediaIndex = allMedia.findIndex((object) => object.id == currentMediaId);

    //get the previous index
    let previousMediaIndex;
    if (currentMediaIndex === 0) {
      // if index = 0 => display the last media
      previousMediaIndex = allMedia.length - 1;
    } else {
      // if index > 0 => display the currentmedia -1
      previousMediaIndex = currentMediaIndex - 1;
    }

    const previousMedia = allMedia[previousMediaIndex];
    const { id, photographerId, video, image, title } = previousMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }

  goToNext(allMedia) {
    const currentMediaId = parseInt(document.querySelector(".photographer-media").id);
    const currentMediaIndex = allMedia.findIndex((object) => object.id == currentMediaId);

    //get the previous index
    let nextMediaIndex;
    if (currentMediaIndex === allMedia.length - 1) {
      // if index = 0 => display the last media
      nextMediaIndex = 0;
    } else {
      // if index > 0 => display the currentmedia -1
      nextMediaIndex = currentMediaIndex + 1;
    }

    const nextMedia = allMedia[nextMediaIndex];
    const { id, photographerId, video, image, title } = nextMedia;

    this.displayMediaInLightbox(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }

}
