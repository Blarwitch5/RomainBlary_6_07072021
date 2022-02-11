import HtmlMarkup from "./htmlMarkups.js";

export default class Video {
    constructor(){
        this.videoMediaHtml = new HtmlMarkup();
    }
    buildHtml(media){
        let video = this.videoMediaHtml.mediaVideoHtmlMarkup(media);
        return video;
    }
}
