// FISHEYE DATA
import FisheyeApi from "/source/js/utils/fisheyeApi.js";
// IMPORTS
import HomePageBuilder from "/source/js/modules/homePageBuilder.js";
import PhotographerPageBuilder from "/source/js/modules/photographerPageBuilder.js";
import ScrollToMainButton from "/source/js/modules/components/scroll.js";

new FisheyeApi()
  .getFishEyeData()
  .then((data) => {
    //figure out if the user is one the homepage or a phtographer page
    //select classes to build according to the page the user is in.

    if (window.location.href.indexOf("photographer-profil") > -1) {
      new PhotographerPageBuilder().displayPhotographerProfil(data);
      new PhotographerPageBuilder().displayPhotographerContactForm(data);
    } else {
      new HomePageBuilder().displayPhotographersCards(data);
    }
    new ScrollToMainButton().displayScrollToMainBtn();
  })
  //throw error if no data loaded
  .catch(() => {
    let errorMessage = `Une erreur est survenue. \nAucune donnée provenant de l'API FishEye n'est disponible.`;
    let errorMessageContainer = document.querySelector(".main-content").appendChild(document.createElement("div"));
    errorMessageContainer.classList.add("error-message");
    errorMessageContainer.innerHTML = errorMessage;
  });

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
