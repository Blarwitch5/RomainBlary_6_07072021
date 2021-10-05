import FisheyeApi from "./utils/fisheyeApi.js";
import Homepage from "./modules/homePageBuilder.js";
import PhotographerPage from "./modules/photographerPageBuilder.js";


//get data
new FisheyeApi()
  .getFishEyeData()
  .then((data) => {
    if (window.location.href.indexOf("photographer-profil") > -1) {
      const photographerPage = new PhotographerPage();
      photographerPage.getPhotographer(data);
    } else {
      const homepage = new Homepage();
      homepage.displayFilteredPhotographersList(data.photographers);
    }
  })
  //throw error if no data loaded
  .catch((error) => {
    console.log(error);
  });
/**
  //DOM element - Photographer Page
const photographerProfilPage = document.body.classList.contains("photographer-page");

if (photographerProfilPage) {

  //Event listeners
  const photographerPage = new PhotographerPageBuilder();

  window.onload = () => {
    console.log(photographerPage.openBtns);

    //le btn open est vide probablement parce qu'il est généré via js et ne fait pas parti encore parti du DOM

    photographerPage.closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        photographerPage.contactModal.hideModal(photographerPage.contactModal.contactElement);
        // photographerPage.lightboxModal.hideModal(photographerPage.lightboxModal.lightboxElement);
      });
    });
    photographerPage.openBtns.forEach((openBtn) => {
      openBtn.addEventListener("click", () => {
        photographerPage.contactModal.launchModal(photographerPage.contactModal.contactElement);
      });
    });
    photographerPage.submitBtn.addEventListener("click", () => {
      photographerPage.contactModal.submitContactForm();
    });
  };
}
*/
