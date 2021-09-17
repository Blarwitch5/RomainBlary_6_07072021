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
        //création de la liste des photographes
        this.createPhotographersList = (dataPhotographer) => {

            const media = new HtmlMarkup();
            const htmlMarkup = media.photographerCardHtmlMarkup(dataPhotographer);

            return htmlMarkup;
        }
        //création de la lightbox
        // this.createLightbox = function(){}

        //etc
    }
}
