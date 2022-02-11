import HtmlMarkup from "./htmlMarkups.js";

export default class Image {
  constructor() {
    this.imageMediaHtml = new HtmlMarkup();
  }
  buildHtml(media) {
    let image = this.imageMediaHtml.mediaImageHtmlMarkup(media);
    return image;
  }
}
