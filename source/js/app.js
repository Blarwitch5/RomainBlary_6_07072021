// imports the app data
import FisheyeApi from "./utils/fisheyeApi.js";

// homepage
import Homepage from "./modules/components/home/homepage.js";

// Photographers pages
import PhotographerProfil from "./modules/components/photographers/photographerProfil.js";
import Dropdown from "./modules/components/photographers/dropdown.js";
import MediaGrid from "./modules/components/photographers/mediaGrid.js";

//accessibility
import Scroll from "./utils/scroll.js";

//get data
new FisheyeApi()
  .getFishEyeData()
  .then((data) => {
    //if photographer page
    if (window.location.href.indexOf("photographer-profil") > -1) {
      //show photographer bio
      new PhotographerProfil(data).displayPhotographerProfil();

      // show dropdown filters menu
      new Dropdown(data).initialize();
      // show photographers gallery with likes
      new MediaGrid().displayPhotographersMedias(data);

      return;
    } else {
      //or it is homepage, then show lis
      new Homepage(data).displayListOfPhotographers();
    }
    //displays the go to content button, for accessibility, on all pages
    new Scroll().displayScrollToMainBtn();
  })
  //throw error if no data loaded
  .catch((error) => {
    console.log(error);
  });
