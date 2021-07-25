// FISHEYE DATA
import getFishEyeData from "./data/fisheyeApi.js";
import HomePageBuilder from "./modules/home/homePageBuilder.js";
import PhotographerPageBuilder from "./modules/photographer/photographerPageBuilder.js";
import ScrollToMainButton from "./modules/home/scroll.js";

getFishEyeData()
  // get the data and build pages and components
  .then(function (data) {
      //figure out if the user is one the homepage or a phtographer page
      const homePage = document.body.classList.contains('homepage');
      const photographerPage = document.body.classList.contains('photographer-page');

      //select classes to build according to the page the user is in.
      if(homePage){
        new HomePageBuilder().displayPhotographersCards(data);
        new ScrollToMainButton().displayScrollToMainBtn();
      }else if(photographerPage){
        new PhotographerPageBuilder();
      }else{}

  })
  //throw error if no data loaded
  .catch(function (error) {
    let errorMessage = `Une erreur est survenue. \n Aucune donnée provenant de l'API FishEye n'est disponible.`;
    let errorMessageContainer = document.querySelector(".main-content").appendChild(document.createElement("div"));
    errorMessageContainer.classList.add("error-message");
    errorMessageContainer.innerHTML = errorMessage;
    console.error(errorMessage);
  });
