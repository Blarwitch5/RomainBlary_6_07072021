/**
 * BUILD A GRID CONTAINING ALL THE PHOTOGRAPHERS BY DEFAULT
 */
import ElementsFactory from "./components/factory.js";

export default class Homepage {
  constructor() {
    this.elementFactory = new ElementsFactory();
    this.photographersContainer = document.querySelector(".photographers");
    this.tags = document.querySelectorAll(".tags__item");
  }
  displayFilteredPhotographersList(photographers) {
    let tag = this.getTag();

    if (tag === null) {
      this.displayPhotographersList(photographers);
    } else {
      let filteredPhotographer = [];
      photographers.map((photographer) => {
        if (photographer.tags.includes(tag)) {
          filteredPhotographer = [...filteredPhotographer, photographer];
        }
        this.displayPhotographersList(filteredPhotographer);
      });
    }
    this.addActiveState(tag);
  }
  displayPhotographersList(photographers) {
    this.photographersContainer.innerHTML = "";

    photographers.map(({ id, name, city, country, tagline, price, tags, portrait }) => {
      const photographerList = this.elementFactory.createPhotographersList({
        id: id,
        name: name,
        city: city,
        country: country,
        tagline: tagline,
        price: price,
        tags: tags,
        image_url: portrait,
      });
      this.photographersContainer.innerHTML += photographerList;
    });
  }
  getTag() {
    const url = new URL(window.location.href);
    let tag = url.searchParams.get("tag");
    return tag;
  }
  addActiveState(tag) {
    let activeTag = document.querySelector(`#${tag}`);
    
    // let activePhotographers= document.querySelectorAll(`.${tag}`);
    // activePhotographers.forEach((activePhotographer) => {
    //   if(activePhotographer.classList.contains('is-animated')){
    //     activePhotographer.classList.remove("is-animated");
    //   }
    // });
    // activePhotographers.classList.add("is-animated");

    let tags = document.querySelectorAll(".tags__item");
    tags.forEach((tag) => {
      if(tag.classList.contains('active')){
        tag.classList.remove("active");
      }
    });
    activeTag.classList.add("active");
  }
}
