/**
 *  1 - Photographers card
 *  2 - photographer profil
 *  3 - Media image
 *  4 - Media video
 *  5 - price and likes
 *  6 - Lightbox Image
 *  7 - Lightbox Video
 *  8 - Contact Validation Message
 * ...
 */

export default class HtmlMarkup {
  photographerCardHtmlMarkup({ name, id, city, country, tags, tagline, price, portrait, altText }) {
    return `
            <a class="photographer__link" href="photographer-profil.html?id=${id}" >
                <figure class="photographer__figure" role="img" aria-label="Photo de profil du photographe qui se nomme ${name}" >
                    <img class="photographer__image" src="./public/img/photographers/${id}/${portrait}" alt="${altText}"  />
                </figure>
                <h2 class="photographer__name">${name}</h2>
            </a>
            <p class="photographer__location">${city}, ${country}</p>
            <p class="photographer__baseline">${tagline}</p>
            <p class="photographer__price" >${price} € / jour</p>
            <ul class="photographer__tags tags" aria-label="Liste des étiquettes associées à ce photographe">
            ${tags
              .map((tag) => {
                return `
                <li class="tags__item" data-filter="${tag}"><span class="sr-only">Étiquette</span>#${tag}</li>`;
              })
              .join("")}
            </ul>
        `;
  }
  photographerBannerHtmlMarkup({ id, name, city, country, tagline, tags, portrait, altText }) {
    return `
            <div class="photographer-profil__banner">
                <div class="photographer-profil__informations">
                    <h1 class="photographer-profil__name">${name}</h1>
                    <p class="photographer-profil__location">${city}, ${country}</p>
                    <p class="photographer-profil__baseline">${tagline}</p>
                    <ul class="tags" aria-label="Liste des étiquettes associées à ce photographe">
                    ${tags
                      .map((tag) => {
                        return `
                        <li class="tags__item">
                          <a href="/index.html?tag=${tag}"><span class="sr-only">Étiquette </span>#${tag}</a>
                          <!-- Link used if tags in photographer bio are used to filter media by category  -->
                          <!--<a href="photographer-profil.html?id=${id}&tag=${tag}"><span class="sr-only">Étiquette</span>#${tag}</a>-->
                        </li>`;
                      })
                      .join("")}
                    </ul>
                </div>
                <div class="photographer-profil__contact">
                    <button class="btn btn-regular js-modal-btn-open" title="Contactez moi" aria-haspopup="dialog"
                    aria-controls="dialog">Contactez-moi</button>
                </div>
                <div class="photographer-profil__picture" role="img" aria-label="Photo de profil du photographe qui se nomme ${name}">
                    <img src="public/img/photographers/${id}/${portrait}" alt="${altText}" />
                </div>
            </div>
`;
  }
  //media markup
  mediaHtmlMarkup({ likes, title, price }) {
    return `
                <div class="item__media">
                    <figure class="item__figure">
                    <!-- Image or video media -->
                        <figcaption class="item__meta">
                            <h2 class="item__title" lang="en">${title}</h2>
                            <span class="item__price"> ${price} € </span>
                            <span class="likes item__likes">
                              <span class="likes__counter"> ${likes} </span>
                              <button aria-label="Cliquez pour aimer la photo dont le titre est ${title}" class="likes__icon btn-likes">
                                  <svg class="heart-main" focusable='false' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path
                                      d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                                      stroke-linecap="square"
                                      stroke-miterlimit="10"
                                  />
                                  </svg>
                                  <svg class="heart-background" focusable='false' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path
                                      d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                                      stroke-linecap="square"
                                      stroke-miterlimit="10"
                                  />
                                  </svg>
                              </button>
                          </span>
                      </figcaption>
                    </figure>
                </div>
    `;
  }
  //image media markup
  mediaImageHtmlMarkup({ photographerId, image, altText }) {
    return `<a href="#" class="media">
              <img loading="lazy" class="item__image" src="public/img/photographers/${photographerId}/media/${image}" alt="${altText}">
            </a>`;
  }
  //video media markup
  mediaVideoHtmlMarkup({ photographerId, video, altText }) {
    return `<div class="media">
              <video class="item__video media" controls>
                </source src="public/img/photographers/${photographerId}/media/${video}" type="video/mp4">
                ${altText}
              </video>
            </div>`;
  }
  photographerPriceAndLikes(price, totalLikes) {
    return `
      <div class="likes-price__wrapper">
          <span class="likes total-likes">
            <span class="likes__counter total-likes-number"> ${totalLikes} </span>
            <svg class="likes__icon" role='img' focusable='false' aria-label="Ce photographe a un totel de ${totalLikes} j'aime" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                stroke-linecap="square"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
          </span>
          <span class="price"> ${price}€ / jour </span>
      </div>`;
  }

  // lightbox
  lightboxImageHtmlMarkup({ photographerId, image, id, altText }) {
    return `<img id=${id} class="photographer-media" src="public/img/photographers/${photographerId}/media/${image}" alt="${altText}" />`;
  }

  lightboxVideoHtmlMarkup({ photographerId, video, id, title, altText }) {
    return `<video preload="metadata" id=${id} title="${altText}" class="photographer-media" controls>
              </source src="./public/img/photographers/${photographerId}/media/${video}" type="video/mp4">
            </video>`;
  }
  lightbox() {
    return `
    <article class="lightbox__container">
      <button class="lightbox__close js-modal-btn-close">Fermer</button>
      <button class="lightbox__next next">Suivant</button>
      <button class="lightbox__prev previous">Précédent</button>
        <div class="lightbox__content">
          <!-- Lightbox Media -->
          <figure class="lightbox__media-container">
          </figure>
        </div>
      </article>`;
  }
  contactValidationMessage() {
    return `
    <!-- Form submitted message -->
    <div class="validation">
      <div class="validation__message">
        <div class="validation__icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#079992" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#079992" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
          </svg>
        </div>
        Merci ! <br />
        Vos informations ont été transmises.
      </div>
    </div>`;
  }
  //etc
}
