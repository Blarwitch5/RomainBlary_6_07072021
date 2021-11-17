import ElementsFactory from "./components/factory.js";

import ContactModal from "./components/contactModal.js";
// import Lightbox from "./components/lightbox.js";

export default class PhotographerPage {
  constructor(data) {
    //Contact Form Selector
    this.submitBtn = document.querySelector("input[type=submit]");
    this.contactModal = new ContactModal(data);
    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
    this.openBtns = document.querySelectorAll(".js-modal-btn-open");
    this.submitBtn = document.getElementById("form-validation-btn");

    // this.lightbox = new Lightbox();

    this.elementFactory = new ElementsFactory();
    this.photographerBanner = document.querySelector(".photographer-profil");
    this.photographerGallery = document.querySelector(".gallery__list");

    //price selectors
    this.likesCounter;
    this.likePriceSection = document.querySelector(".likes-price");
    this.likesBtn = document.querySelectorAll("btn-likes");

    this.tag = this.getTag();

    //filter dropdown selectors
    this.dropdown = document.querySelector(".dropdown");
    this.dropdownBtn = document.querySelector(".dropdown__toggle");
    this.dropdownFilterList = document.querySelector(".dropdown__menu");
  }
  getId() {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    return id;
  }
  getTag() {
    const url = new URL(window.location.href);
    let parameters = new URLSearchParams(url.search);
    let tag = parameters.get("tag");
    return tag;
  }

  getPhotographer(data, filterParam) {
    const id = this.getId();

    //gets all current photographer's infos
    const filteredPhotographer = data.photographers.filter(function (element) {
      if (element.id === id) {
        return element;
      }
    });
    const currentPhotographer = filteredPhotographer[0];
    this.displayPhotographerInfo(currentPhotographer);

    //gets all the current photographer's media
    const filteredMedia = data.media.filter(function (element) {
      if (element.photographerId === id) {
        return element;
      }
    });
    const sortedMedia = this.sortMedia(filteredMedia, filterParam);
    this.displayMedia(sortedMedia);
  }

  displayPhotographerInfo({ id, name, city, country, tagline, tags, portrait, price }) {
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
    const photographerPriceAndLikes = this.elementFactory.createPhotographerPriceAndLikes({
      price: price,
      totalLikes: this.totalLikes,
    });

    this.photographerBanner.innerHTML = banner;

    //show price and likes
    this.likePriceSection.innerHTML = photographerPriceAndLikes;

    // activate the button to show the contact modal
    this.openBtns = document.querySelectorAll(".js-modal-btn-open");

    this.openBtns.forEach((openBtn) => {
      openBtn.addEventListener("click", () => {
        this.contactModal.launchModal(this.contactModal.contactElement);
      });
    });
  }

  displayMedia(filteredMedia) {
    this.photographerGallery.innerHTML = "";
    this.likesCounter = 0;

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

        } else {
          mediaList = this.elementFactory.createMediaGallery("image", {
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
     
  }
  sortMedia(medias, filterParam) {
    switch (filterParam) {
      case "Options":
        return medias;
        break;
      case "Date":
        return medias.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        break;
      case "Titre":
        return medias.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case "Popularité":
        return medias.sort((a, b) => {
          return b.likes - a.likes;
        });
        break;
      default:
        return medias;
        break;
    }
  }
  sortOnFilterClick(data, element) {
    element.addEventListener("click", (event) => {
      this.getPhotographer(data, event.target.innerHTML);
    });
  }
  showFilters(dropdownElement) {
    this.elementFactory.createDropdownFilterList(dropdownElement);
  }
}
