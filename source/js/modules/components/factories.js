/**
 *  1 - Photographers list
 *  2 - photographer profil info
 *  3 - Photographers price and likes
 *  4 - photographer media list
 *  5 - price and likes informations
 *  6 - Lightbox
 *  7 - Dropdown
 * ...
 */
import HtmlMarkup from "./htmlMarkups.js";
import DropDown from "./dropdown.js";

export default class ElementsFactory {
  constructor() {
    //photographers list
    this.createPhotographersList = (dataPhotographer) => {
      const media = new HtmlMarkup();
      const PhotographerListHtmlMarkup = media.photographerCardHtmlMarkup(dataPhotographer);

      return PhotographerListHtmlMarkup;
    };
    //photographer profil info
    this.createPhotographerBanner = (dataPhotographer) => {
      const media = new HtmlMarkup();
      const PhotographerBannerHtmlMarkup = media.photographerBannerHtmlMarkup(dataPhotographer);

      return PhotographerBannerHtmlMarkup;
    };
    //photographer price and likes
    this.createPhotographerPriceAndLikes = (dataPhotographer) => {
      const htmlMarkup = new HtmlMarkup();
      const PhotographerPriceAndLikesHtmlMarkup = htmlMarkup.photographerPriceAndLikes(dataPhotographer);

      return PhotographerPriceAndLikesHtmlMarkup;
    };
    //media list
    this.createMediaGallery = (type, media) => {
      let htmlMarkup;
      let video;
      let image;

      if (type === "video") {
        htmlMarkup = new HtmlMarkup();
        video = htmlMarkup.mediaVideoHtmlMarkup(media);
        return video;
      }
      if (type === "image") {
        htmlMarkup = new HtmlMarkup();
        image = htmlMarkup.mediaImageHtmlMarkup(media);
        return image;
      }
    };

    //price informations
    this.createLikesAndPriceInfo = () => {
      const htmlMarkup = new HtmlMarkup();
      const likesAndPriceInfo = htmlMarkup.photographerLikesAndPriceInfoHtmlMarkup();
      return likesAndPriceInfo;
    };

    //lightbox
    this.createLightbox = (type, media) => {
      let htmlMarkup;
      let video;
      let image;

      if (type === "video") {
        htmlMarkup = new HtmlMarkup();
        video = htmlMarkup.lightboxVideoHtmlMarkup(media);
        return video;
      }
      if (type === "image") {
        htmlMarkup = new HtmlMarkup();
        image = htmlMarkup.lightboxImageHtmlMarkup(media);
        return image;
      }
    };

    //dropdown
    this.createDropdownFilterList = (dropdownElement) => {
      const filtersDropdown = new DropDown(dropdownElement);
      return filtersDropdown;
    };
  }
}
