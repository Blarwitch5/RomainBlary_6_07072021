import ElementsFactory from "./components/factory.js";

// import ContactModal from "./modules/components/contactModal.js";
// import Lightbox from "./components/lightbox.js";

export default class PhotographerPage {
  constructor() {
    // this.contactModal = new ContactModal();
    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
    this.openBtns = document.querySelectorAll(".js-modal-btn-open");
    this.submitBtn = document.getElementById("form-validation-btn");

    // this.lightbox = new Lightbox();

    this.elementFactory = new ElementsFactory();
    this.photographerBanner = document.querySelector(".photographer-profil");
    this.photographerGallery = document.querySelector(".gallery__list");
  }
  __getPhotographerId() {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    return id;
  }
  getPhotographer(data) {
    const id = this.__getPhotographerId();

    //gets all the current photographer's infos
    const filteredPhotographer = data.photographers.filter(function (element) {
      if (element.id === id) {
        return element;
      }
    });
    const currentPhotographer = filteredPhotographer[0];
    this.__displayPhotographerInfo(currentPhotographer);

    //gets all the current photographer's media
    const filteredMedia = data.media.filter(function (element) {
      if (element.photographerId === id) {
        return element;
      }
    });
    this.__displayMedia(filteredMedia);
  }

  __displayPhotographerInfo({ id, name, city, country, tagline, tags, portrait, price }) {
    this.photographerBanner.innerHTML = "";

    const banner = this.elementFactory.createPhotographerBanner({
      id: id,
      name: name,
      city: city,
      country: country,
      tagline: tagline,
      price: price,
      tags: tags,
      image_url: portrait,
    });

    //create price infos

    this.photographerBanner.innerHTML = banner;
    //show price
    //display contact button
  }
  __displayMedia(filteredMedia) {
    this.photographerGallery.innerHTML = "";

    filteredMedia.map(({ photographerId, image, video, likes, title, id, price }) => {
      let mediaList;

      //add condition for img or video
      if (!image) {
        mediaList = this.elementFactory.createMediaGallery("video", {
          price: price,
          photographerId: photographerId,
          video_url: video,
          likes: likes,
          title: title,
          id: id,
        });
      }else{
        mediaList = this.elementFactory.createMediaGallery('image', {
          photographerId: photographerId,
          price: price,
          image_url: image,
          likes: likes,
          title: title,
          id: id,
        });
      }

      //create price infos

      this.photographerGallery.innerHTML += mediaList;
    });

    // displayPhotographerContactForm(data) {
    //   this.contactModal.initializeForm();
    //   this.contactModal.getPhotographerName();
    // }
  }
}
