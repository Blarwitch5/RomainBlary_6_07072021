import Modal from "./modal.js";
import Form from "./form.js";
import HtmlMarkup from "../../factory/htmlMarkups.js";

export default class PhotographerProfil {
  constructor(data) {
    this.photographersData = data.photographers;
    this.id = this._getId();
    this.currentPhotographerData = this._getCurrentPhotographer();
    this.sectionPhotographerProfil = document.querySelector(".photographer-profil");
    this.photographerTemplate = new HtmlMarkup().photographerBannerHtmlMarkup(this.currentPhotographerData);

    this.form = document.querySelector("#contact-form");
    this.fields = ["first-name", "last-name", "email", "message", "terms-conditions"];
  }

  displayPhotographerProfil() {
    //SEO - Adds the name of the photographe in page title
    document.title = `FishEye | Profil du photographe : ${this.currentPhotographerData.name}`;

    this.sectionPhotographerProfil.innerHTML = this.photographerTemplate;
    new Modal(this.photographersData).buildModal();
    new Form(this.form, this.fields).initialize();
  }
  /**
   *
   * @returns the ID of a photographer from the url
   */
  _getId() {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    return id;
  }
  /**
   *
   * @returns a photographer object with all current photographer data
   */
  _getCurrentPhotographer() {
    const id = this.id;
    //gets all current photographer's infos
    const photographer = this.photographersData.filter(function (element) {
      if (element.id === id) {
        return element;
      }
    });
    const currentPhotographer = photographer[0];
    return currentPhotographer;
  }

  // constructor() {
  //   this.elementFactory = new ElementsFactory();

  //   //Contact Form Selector

  //   this.contactModal = new ContactModal();
  //   this.submitBtn = document.querySelector("input[type=submit]");
  //   this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
  //   this.openBtns = document.querySelectorAll(".js-modal-btn-open");
  //   this.submitBtn = document.getElementById("form-validation-btn");

  //   //lightbox selectors
  //   this.lightbox = new Lightbox();
  //   this.previousMedia = document.querySelector(".previous");
  //   this.nextMedia = document.querySelector(".next");

  //   this.photographerBanner = document.querySelector(".photographer-profil");
  //   this.photographerGallery = document.querySelector(".gallery__list");

  //   //likes feature selectors
  //   this.likePriceSection = document.querySelector(".likes-price");
  //   this.likeBtns = [];
  //   this.likes = [];
  //   this.totalLikesCounter = 0;
  //   this.totalLikesNumber = document.querySelector(".total-likes-number");
  //   this.likesIndex = new Set();

  //   //filter dropdown selectors
  //   this.dropdown = document.querySelector(".dropdown");
  //   this.dropdownBtn = document.querySelector(".dropdown__toggle");
  //   this.dropdownFilterList = document.querySelector(".dropdown__menu");

  //   this.tag = this.getTag();
  //   this.title = document.title;
  // }
  // /**
  //  *
  //  * @returns the photographers ID from URL parameter
  //  */
  // getId() {
  //   const url = new URL(window.location.href);
  //   let idValue = url.searchParams.get("id");
  //   let id = parseInt(idValue);
  //   return id;
  // }
  // /**
  //  *
  //  * @returns the category tag from URL parameter
  //  */
  // getTag() {
  //   const url = new URL(window.location.href);
  //   let parameters = new URLSearchParams(url.search);
  //   let tag = parameters.get("tag");
  //   return tag;
  // }
  // /*
  // J'ai créé deux method getCurrentPhotographerParams et getCurrentPhotographerMedia qui sont appelées dans la method buildCurrentPhotographer. L'idée est de pouvoir réutiliser la method getCurrentPhotographerParams pour afficher le nom du photographe dans le formulaire de contact dans la class ContactModal
  // */
  // getCurrentPhotographerParams(data) {
  //   const id = this.getId();
  //   //gets all current photographer's infos
  //   const filteredPhotographer = data.photographers.filter(function (element) {
  //     if (element.id === id) {
  //       return element;
  //     }
  //   });
  //   const currentPhotographer = filteredPhotographer[0];
  //   return currentPhotographer;
  // }
  // getCurrentPhotographerMedia(data) {
  //   const id = this.getId();
  //   //gets all the current photographer's media
  //   const filteredMedia = data.media.filter(function (element) {
  //     if (element.photographerId === id) {
  //       return element;
  //     }
  //   });
  //   return filteredMedia;
  // }
  // /**
  //  * Fetches the photographer's data (infos and media, can be filtered)
  //  * @param {*} data = fisheye data
  //  * @param {string} filterParam = filter selected by user
  //  */
  // buildCurrentPhotographer(data, filterParam) {
  //   const currentPhotographer = this.getCurrentPhotographerParams(data);
  //   this.displayPhotographerInfo(currentPhotographer);

  //   const filteredMedia = this.getCurrentPhotographerMedia(data);
  //   console.log(filteredMedia);

  //   const sortedMedia = this.sortMedia(filteredMedia, filterParam);
  //   this.displayMedia(sortedMedia);
  // }
  // //backup
  // // getPhotographer(data, filterParam) {
  // //   const id = this.getId();

  // //   //gets all current photographer's infos
  // //   const filteredPhotographer = data.photographers.filter(function (element) {
  // //     if (element.id === id) {
  // //       return element;
  // //     }
  // //   });
  // //   const currentPhotographer = filteredPhotographer[0];
  // //   this.displayPhotographerInfo(currentPhotographer);

  // //   //gets all the current photographer's media
  // //   const filteredMedia = data.media.filter(function (element) {
  // //     if (element.photographerId === id) {
  // //       return element;
  // //     }
  // //   });
  // //   const sortedMedia = this.sortMedia(filteredMedia, filterParam);
  // //   this.displayMedia(sortedMedia);
  // // }
  // /**
  //  * Displays the photographer infos in a banner
  //  * @param {object} photographer = photographer object containing all photographer's data
  //  */
  // displayPhotographerInfo({ id, name, city, country, tagline, tags, portrait, price, altText }) {
  //   this.photographerBanner.innerHTML = "";

  //   const banner = this.elementFactory.createPhotographerBanner({
  //     id: id,
  //     name: name,
  //     city: city,
  //     country: country,
  //     tagline: tagline,
  //     price: price,
  //     tags: tags,
  //     image_url: portrait,
  //     altText: altText,
  //   });

  //   //SEO - Adds the name of the photographe in page title
  //   document.title = `FishEye | Profil du photographe : ${name}`;

  //   //create price infos
  //   const photographerPriceAndLikes = this.elementFactory.createPhotographerPriceAndLikes({
  //     price: price,
  //     totalLikes: this.totalLikes,
  //   });

  //   this.photographerBanner.innerHTML = banner;

  //   //show price and likes
  //   this.likePriceSection.innerHTML = photographerPriceAndLikes;

  //   // activate the button to show the contact modal
  //   this.openBtns = document.querySelectorAll(".js-modal-btn-open");

  //   this.openBtns.forEach((openBtn) => {
  //     openBtn.addEventListener("click", () => {
  //       this.contactModal.launchModal(this.contactModal.contactElement);
  //     });
  //   });
  // }
  // /**
  //  * Displays the photographer's media (can be filtered) and likes counter
  //  * @param {object} allMedia = complete media list
  //  */
  // displayMedia(allMedia) {
  //   this.photographerGallery.innerHTML = "";
  //   this.totalLikesCounter = 0;
  //   this.totalLikesNumber = document.querySelector(".total-likes-number");
  //   // const tag = this.getTag();

  //   // if (tag === null) {
  //   allMedia.map(({ photographerId, image, video, likes, title, id, price, altText }) => {
  //     let mediaList;

  //     //add condition for img or video
  //     if (!image) {
  //       mediaList = this.elementFactory.createMediaGallery("video", {
  //         price: price,
  //         photographerId: photographerId,
  //         video_url: video,
  //         likes: likes,
  //         title: title,
  //         id: id,
  //         altText: altText,
  //       });

  //       this.totalLikesCounter += likes;
  //     } else {
  //       mediaList = this.elementFactory.createMediaGallery("image", {
  //         photographerId: photographerId,
  //         price: price,
  //         image_url: image,
  //         likes: likes,
  //         title: title,
  //         id: id,
  //         altText: altText,
  //       });
  //       this.totalLikesCounter += likes;
  //     }

  //     this.totalLikesNumber.innerHTML = this.totalLikesCounter;

  //     this.photographerGallery.innerHTML += mediaList;
  //   });

  //   //if tags in photographer bio are used to filter media by category

  //   // } else {
  //   //   let allFilteredMedia = allMedia.filter(function (filteredMedia) {
  //   //     if(filteredMedia.tags.includes(tag)){
  //   //       return filteredMedia;
  //   //     }
  //   //   });

  //   //   allFilteredMedia.map(({ photographerId, image, video, likes, title, id, price }) => {
  //   //     let mediaList;

  //   //     //add condition for img or video
  //   //     if (!image) {
  //   //       mediaList = this.elementFactory.createMediaGallery("video", {
  //   //         price: price,
  //   //         photographerId: photographerId,
  //   //         video_url: video,
  //   //         likes: likes,
  //   //         title: title,
  //   //         id: id,
  //   //         altText: altText
  //   //       });

  //   //       this.totalLikesCounter += likes;
  //   //     } else {
  //   //       mediaList = this.elementFactory.createMediaGallery("image", {
  //   //         photographerId: photographerId,
  //   //         price: price,
  //   //         image_url: image,
  //   //         likes: likes,
  //   //         title: title,
  //   //         id: id,
  //   //         altText: altText
  //   //       });
  //   //       this.totalLikesCounter += likes;
  //   //     }
  //   //     this.totalLikesNumber.innerHTML = this.totalLikesCounter;

  //   //     this.photographerGallery.innerHTML += mediaList;
  //   //   });
  //   // }

  //   // likes feature
  //   this.likeBtns = document.querySelectorAll(".btn-likes");

  //   this.likeBtns.forEach((likeBtn) => {
  //     if ([...this.likesIndex].includes(likeBtn.getAttribute("data-id"))) {
  //       likeBtn.classList.add("hasBeenliked");
  //       this.totalLikesCounter += 1;
  //       document.querySelector(".total-likes-number").innerHTML = this.totalLikesCounter;
  //     }
  //     likeBtn.addEventListener("click", () => {
  //       let totalLikesNumber = document.querySelector(".total-likes-number");

  //       if (likeBtn.classList.contains("hasBeenliked")) {
  //         let likesInteger = parseInt(likeBtn.previousElementSibling.innerHTML);
  //         let updatedLikes = likesInteger - 1;
  //         likeBtn.previousElementSibling.innerHTML = updatedLikes;
  //         this.totalLikesCounter -= 1;
  //         totalLikesNumber.innerHTML = this.totalLikesCounter;
  //       } else {
  //         let likedId = likeBtn.getAttribute("data-id");
  //         this.likesIndex.add(likedId);
  //         let likesInteger = parseInt(likeBtn.previousElementSibling.innerHTML);
  //         let updatedLikes = likesInteger + 1;
  //         likeBtn.previousElementSibling.innerHTML = updatedLikes;
  //         this.totalLikesCounter += 1;
  //         totalLikesNumber.innerHTML = this.totalLikesCounter;
  //       }
  //       if (likeBtn.classList.contains("hasBeenliked")) {
  //         likeBtn.classList.remove("hasBeenliked");
  //       } else {
  //         likeBtn.classList.add("hasBeenliked");
  //       }
  //     });
  //   });

  //   //open the media lightbox on click
  //   let allMediaElements = document.querySelectorAll(".media");

  //   allMediaElements.forEach((mediaElement) => {
  //     mediaElement.addEventListener("click", (event) => {
  //       const mediaId = event.target.getAttribute("data-id");
  //       this.lightbox.launchModal(this.lightbox.lightboxElement);
  //       this.lightbox.initializeLightbox(mediaId, allMedia);
  //     });
  //   });
  //   //go to previous Media
  //   this.previousMedia.addEventListener("click", () => {
  //     this.lightbox.goToPrevious(allMedia);
  //   });
  //   //go to next Media
  //   this.nextMedia.addEventListener("click", () => {
  //     this.lightbox.goToNext(allMedia);
  //   });
  // }
  // /**
  //  * Sorts media by popularity, date or title
  //  * @param {object} allMedia = media list
  //  * @param {string} filterParam  = filter parameter selected by the user
  //  * @returns
  //  */
  // sortMedia(allMedia, filterParam) {
  //   switch (filterParam) {
  //     case "Date":
  //       return allMedia.sort((a, b) => {
  //         return new Date(a.date) - new Date(b.date);
  //       });
  //       break;
  //     case "Titre":
  //       return allMedia.sort((a, b) => {
  //         return a.title.localeCompare(b.title);
  //       });
  //       break;
  //     case "Popularité":
  //       return allMedia.sort((a, b) => {
  //         return b.likes - a.likes;
  //       });
  //       break;
  //     //by default, alphabetic order
  //     default:
  //       return allMedia.sort((a, b) => {
  //         return a.title.localeCompare(b.title);
  //       });
  //       break;
  //   }
  // }
  // /**
  //  * Get the corresponding photographer according to selected filter
  //  * @param {object} data = fisheye data
  //  * @param {element} element
  //  */
  // sortOnFilterClick(data, element) {
  //   element.addEventListener("click", (event) => {
  //     this.buildCurrentPhotographer(data, event.target.innerHTML);
  //   });
  // }
  // /**
  //  * Displays the dropdown filter list
  //  * @param {*} dropdownElement
  //  */
  // showFilters(dropdownElement) {
  //   this.elementFactory.createDropdownFilterList(dropdownElement);
  // }
}
