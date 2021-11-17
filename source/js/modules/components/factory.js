/**
 *  1 - Photographers list
 *  2 - photographer profil info
 *  3 - Photographers price and likes
 *  4 - photographer media list
 *  5 - price and likes informations
 *  6 - Lightbox
 * ...
 */
import HtmlMarkup from "./htmlMarkups.js";
import DropDown from "./filters.js";


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
      const markup = new HtmlMarkup();
      const PhotographerPriceAndLikesHtmlMarkup = markup.photographerPriceAndLikes(dataPhotographer);

      return PhotographerPriceAndLikesHtmlMarkup;
    };
    //media list
    this.createMediaGallery = (type, media) => {
      let markup;
      let video;
      let image;

      if (type === "video") {
        markup = new HtmlMarkup();
        video = markup.mediaVideoHtmlMarkup(media);
        return video;
      }
      if (type === "image") {
        markup = new HtmlMarkup();
        image = markup.mediaImageHtmlMarkup(media);
        return image;
      }
    };


    //price informations
    this.createLikesAndPriceInfo = () => {
      const htmlMarkup = new HtmlMarkup();
      const likesAndPriceInfo = htmlMarkup.photographerLikesAndPriceInfoHtmlMarkup();
      return likesAndPriceInfo;
    };
        //création de la lightbox
    // this.createLightbox = function(){}

    //dropdown
    this.createDropdownFilterList = (dropdownElement) => {
        //new dropdown
        const filtersDropdown = new DropDown(dropdownElement);
        return filtersDropdown;
    }
  }
}
