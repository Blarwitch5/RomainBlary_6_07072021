import Gallery from "../../factory/gallery.js";
import Likes from "../photographers/likes.js";
import HtmlMarkup from "../../factory/htmlMarkups.js";

export default class MediaGrid {
  constructor() {
    this.gallery = new Gallery();
  }
  displayPhotographersMedias(data) {
    let mediaData = data.media;
    this.gallery.builder(mediaData);
    this.displayLikesAndPrice(this.gallery.totalLikes, data.photographers);
    new Likes();
  }

  displayLikesAndPrice(totalLikes, photographers) {
    const id = this._getId();
    photographers.forEach((photographer) => {
      if (id === photographer.id) {
        let likePriceBox = document.querySelector(".likes-price");
        let likePriceBoxTemplate = new HtmlMarkup().photographerPriceAndLikes(photographer.price, totalLikes);
        likePriceBox.innerHTML = likePriceBoxTemplate;
      }
    });
  }
  _getId() {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    return id;
  }
}
