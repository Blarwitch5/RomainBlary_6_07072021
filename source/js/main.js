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
      const photographerPage = new PhotographerPage(data);
      const contactModal = new ContactModal(data);
      const dropdownElement = document.querySelector(".dropdown");
      const dropdownFilterList = document.querySelector(".dropdown__menu");

      contactModal.getCurrentPhotographerName(data);
      photographerPage.getPhotographer(data);
      photographerPage.submitBtn.addEventListener("click", () => {
        photographerPage.contactModal.submitContactForm();
      });
      photographerPage.dropdownBtn.addEventListener("click", () => {
        photographerPage.showFilters(dropdownElement);
      });
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

      //activate validation process on form submit button
      window.onload = () => {
        photographerPage.submitBtn.addEventListener("click", () => {
          photographerPage.contactModal.initializeForm();
        });
      };
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
