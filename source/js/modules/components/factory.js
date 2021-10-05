/**
 *  - gallery creation (video and/or img)
 *  - lightbox creation
 *  - photographer list
 *  - photographer banner
 * ...
 */
import HtmlMarkup from './htmlMarkups.js';

export default class ElementsFactory{
    constructor(){
        //photographers list
        this.createPhotographersList = (dataPhotographer) => {

            const media = new HtmlMarkup();
            const htmlMarkup = media.photographerCardHtmlMarkup(dataPhotographer);

            return htmlMarkup;
        }
        //photographer profil info
        this.createPhotographerBanner = (dataPhotographer) => {

            const media = new HtmlMarkup();
            const htmlMarkup = media.photographerBannerHtmlMarkup(dataPhotographer);

            return htmlMarkup;
        }
        //media list 
        this.createMediaGallery = (type, media) => {
            let markup;
            let video;
            let image;

            if (type === 'video'){
                markup = new HtmlMarkup();
                video = markup.mediaVideoHtmlMarkup(media);
                return video;
            }
            if (type === 'image'){
                markup = new HtmlMarkup();
                image = markup.mediaImageHtmlMarkup(media);
                return image;
            }
        }
        //création de la lightbox
        // this.createLightbox = function(){}

        //etc
    }
}
