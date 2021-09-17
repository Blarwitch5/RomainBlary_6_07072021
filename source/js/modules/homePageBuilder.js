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

// import PhotographersTags from "./modules/components/filters.js";

// export default class HomePageBuilder {

//   displayPhotographersCards(data) {
//     let photographers = data.photographers;
//     photographers.map(function (photographer) {
//       let photographersContainer = document.getElementById("photographers");
//       let photographerCard = document.createElement("article");
//       // photographerCard.classList.add("photographer");
//       photographerCard.className = photographer.tags.join(' ') + ' photographer';

//       let photographerMarkup = `
//         <a class="photographer__link" href="/source/pages/photographer-profil.html?id=${photographer.id}" title="${photographer.name}">
//             <figure class="photographer__figure">
//                 <img class="photographer__image" src="public/img/photographers/${photographer.id}/${photographer.portrait}" alt="Portrait de ${photographer.name}" />
//             </figure>
//             <h2 class="photographer__name">${photographer.name}</h2>
//         </a>
//         <p class="photographer__location">${photographer.city}, ${photographer.country}</p>
//         <p class="photographer__baseline">${photographer.tagline}</p>
//         <p class="photographer__price">${photographer.price} € / jour</p>
//         <ul class="photographer__tags tags">
//         ${photographer.tags
//           .map((tag) => {
//             return `
//             <li class="tags__item" data-filter="${tag}"><span>tag </span>#${tag}</li>`;
//           })
//           .join("")}
//         </ul>`;

//       photographersContainer.appendChild(photographerCard);
//       photographerCard.innerHTML = photographerMarkup;
//     })
//   }
// }
