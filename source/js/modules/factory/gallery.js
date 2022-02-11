import Media from "./media.js";
import HtmlMarkup from "./htmlMarkups.js";
import Lightbox from "../components/photographers/lightbox.js";

export default class Gallery {
  constructor() {
    this.totalLikes = 0;
    this.mediaFactory = new Media();
    this.html = new HtmlMarkup();
    this.photographerGallery = document.querySelector(".gallery__list");
  }
  /**
   *
   * @param {all medias} mediaData
   * @returns the media grid
   */
  builder(mediaData) {
    const id = this._getId();
    let currentMedia = [];
    let currentMediaTitle = [];

    mediaData.forEach((media) => {
      if (id === media.photographerId) {
        let galleryItem = document.createElement("article");
        let galleryItemTemplate = this.html.mediaHtmlMarkup(media);
        galleryItem.innerHTML = galleryItemTemplate;
        let domGalleryItem = this.photographerGallery.appendChild(galleryItem);
        galleryItem.classList.add("item");
        let mediaHtml = this.mediaFactory.renderMedia(media);

        let mediaHtmlLocations = domGalleryItem.querySelector(".item__meta");

        mediaHtmlLocations.insertAdjacentHTML("beforebegin", mediaHtml);

        this.totalLikes += parseInt(media.likes);

        currentMedia.push(mediaHtml);
        currentMediaTitle.push(media.title);

        new Lightbox().initialize(currentMedia, currentMediaTitle);
      }
    });
    return this;
  }
  /**
   *
   * @returns the ID of current photographer from URL
   */
  _getId() {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    return id;
  }
}
