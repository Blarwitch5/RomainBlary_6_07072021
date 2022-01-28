import FisheyeApi from "./utils/fisheyeApi.js";
import Homepage from "./modules/homePageBuilder.js";
import PhotographerPage from "./modules/photographerPageBuilder.js";
import ScrollToMainButton from "./modules/components/scroll.js";
import ContactModal from "./modules/components/contactModal.js";

//get data
new FisheyeApi()
  .getFishEyeData()
  .then((data) => {
    //if photographer page
    if (window.location.href.indexOf("photographer-profil") > -1) {
      const photographerPage = new PhotographerPage(data),
        contactModal = new ContactModal(data),
        dropdownElement = document.querySelector(".dropdown"),
        dropdownFilterList = document.querySelector(".dropdown__menu");

      contactModal.getCurrentPhotographerName(data);
      photographerPage.getPhotographer(data);
      photographerPage.contactModal.validator.initialize();

      photographerPage.showFilters(dropdownElement);

      photographerPage.dropdownFilterList.querySelectorAll("li").forEach((li) => {
        photographerPage.sortOnFilterClick(data, li);
      });

      //activate close buttons on click
      photographerPage.closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          photographerPage.lightbox.hideModal(photographerPage.lightbox.lightboxElement);
          photographerPage.contactModal.hideModal(photographerPage.contactModal.contactElement);
        });
      });
      photographerPage.submitBtn.addEventListener("click", (event) => {
        photographerPage.contactModal.submitContactForm();
      });
      return;
    } else {
      //else it is homepage
      const homepage = new Homepage();
      homepage.displayFilteredPhotographersList(data.photographers);
    }

    //display scroll btn
    const scrollBtn = new ScrollToMainButton();
    scrollBtn.displayScrollToMainBtn();
  })
  //throw error if no data loaded
  .catch((error) => {
    console.log(error);
  });
