/**
 * BUILD A GRID CONTAINING ALL THE PHOTOGRAPHERS BY DEFAULT
 */
import ElementsFactory from "./components/factory.js";

export default class Homepage {
  constructor() {
    this.elementFactory = new ElementsFactory();
    this.photographersContainer = document.querySelector(".photographers");
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
}
