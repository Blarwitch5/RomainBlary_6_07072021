import ProfilBanner from "./components/banner.js";
import ContactModal from "./components/contactModal.js";
// import LightboxModal from "./components/lightboxModal.js";


class PhotographerPageBuilder {
  constructor() {
    this.contactModal = new ContactModal();
    // this.lightboxModal = new this.lightboxModal();
    this.photographerBanner = new ProfilBanner();
    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
    this.openBtns = document.querySelectorAll(".js-modal-btn-open");
    this.submitBtn = document.getElementById('form-validation-btn');
  }
  // getPhotographerId(){

  // }
  displayPhotographerProfil(data) {
    this.photographerBanner.displayProfilBanner(data);
  }
  displayPhotographerContactForm(data) {
    this.contactModal.initializeForm();
    this.contactModal.getPhotographerName();
  }
}
export default PhotographerPageBuilder;
