import { showFilterMessage } from "../../../utils/messages.js";

export default class Filter {
  constructor() {
    this.photographers = document.querySelectorAll(".photographer");
    this.tagList = document.querySelector(".tags");
    this.tags = document.querySelectorAll(".tags__item");
  }
  filterTags() {
    this.tags.forEach((tag) => {
      tag.addEventListener("click", (event) => {
        let tagClass = event.target.parentNode.classList.value;

        if (tagClass.indexOf("selected") === -1) {
          event.target.parentNode.classList.add("selected");
        } else {
          event.target.parentNode.classList.remove("selected");
        }

        this.sortPhotographers(this.photographers);

        //if no photographers match the selected filters, a message is displayed
        if (this.getNumberOfSelectedPhotographers() === 0) {
          if (!document.querySelector(".error-message")) {
            showFilterMessage();
          }
        } else if (this.getNumberOfSelectedPhotographers() !== 0 && document.querySelector(".error-message")) {
            document.querySelector(".error-message").remove();
        }
      });
    });
  }
  /**
   *
   * @returns an array with the value of the selected filters
   */
  getSelectedFilters() {
    let chosenFilters = document.querySelectorAll(".tags__item.selected");
    let selectedFilters = [];

    chosenFilters.forEach((chosenFilter) => {
      let dataFilterValue = chosenFilter.getAttribute("data-filter");
      selectedFilters.push(dataFilterValue);
    });
    return selectedFilters;
  }
  /**
   *
   * @param {*} photographer
   * @returns if one of the photographer's classes matches the selected filter
   */
  compareFilters(photographer) {
    let filters = this.getSelectedFilters();
    let photographerCardClassList = photographer.classList.value;
    let classes = photographerCardClassList.split(" ");

    let match = filters.filter((value) => classes.includes(value));

    return filters.length === match.length;
  }
  /**
   * show/hide photographers according to selected filters by user
   * @param {*} photographers
   */
  sortPhotographers(photographers) {
    photographers.forEach((photographer) => {
      if (this.compareFilters(photographer)) {
        photographer.style.display = "flex";
        photographer.classList.add("shown");
      } else {
        photographer.style.display = "none";
        photographer.classList.remove("shown");
      }
    });
  }

  /**
   * @returns the number of selected photographers displayed on the page
   */
  getNumberOfSelectedPhotographers() {
    let presentPhotographers = [];
    this.photographers.forEach((photographer) => {
      let selectedPhotographer = photographer.classList.contains("shown");
      if (selectedPhotographer === true) {
        presentPhotographers.push(selectedPhotographer);
      }
    });
    return presentPhotographers.filter(Boolean).length;
  }
}
