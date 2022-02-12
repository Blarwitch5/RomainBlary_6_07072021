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
}
