// import Modal from './modal.js';
// import FormValidator from './contactForm.js';

import ProfilBanner from "./components/banner.js";

export default class PhotographerPageBuilder {
  displayPhotographerProfil(data) {
    new ProfilBanner().displayProfilBanner(data);
  }
}
