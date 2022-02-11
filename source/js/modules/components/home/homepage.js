/**
 * BUILD A GRID CONTAINING ALL THE PHOTOGRAPHERS BY DEFAULT
 */
import Filter from "./filter.js";
import HtmlMarkup from "../../factory/htmlMarkups.js";

export default class Homepage {
  constructor(data) {
    this.photographers = data.photographers;
    this.sectionPhotographers = document.querySelector(".photographers");
    this.photographerCardTemplate = new HtmlMarkup();
  }
  displayListOfPhotographers() {
    this.photographers.map((photographer) => {
      let photographerCard = document.createElement('article');
      photographerCard.className = 'photographer ' + photographer.tags.join(' ');
      let currentPhotographerCardTemplate = this.photographerCardTemplate.photographerCardHtmlMarkup(photographer);


      this.sectionPhotographers.appendChild(photographerCard);
      photographerCard.innerHTML = currentPhotographerCardTemplate;
    });

    //adds the filters
    new Filter().filterTags();
  }
}
