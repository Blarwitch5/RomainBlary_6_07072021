// creation of the html markup
export default class HtmlMarkup {
  photographerCardHtmlMarkup({ id, name, city, country, tagline, price, tags, image_url }) {
    return `
        <article class='photographer ${tags
          .map((tag) => {
            return `${tag}`;
          })
          .join(" ")}'>
            <a class="photographer__link" href="/source/pages/photographer-profil.html?id=${id}" title="${name}">
                <figure class="photographer__figure">
                    <img class="photographer__image" src="public/img/photographers/${id}/${image_url}" alt="Portrait de ${name}" />
                </figure>
                <h2 class="photographer__name">${name}</h2>
            </a>
            <p class="photographer__location">${city}, ${country}</p>
            <p class="photographer__baseline">${tagline}</p>
            <p class="photographer__price">${price} € / jour</p>
            <ul class="photographer__tags tags">
            ${tags
              .map((tag) => {
                return `
                <li class="tags__item" data-filter="${tag}"><span>tag </span>#${tag}</li>`;
              })
              .join("")}
            </ul>
        </article>
        `;
  }
  photographerBannerHtmlMarkup({ id, name, city, country, tagline, tags, image_url, price }) {
    return `
            <div class="photographer-profil__banner">
                <div class="photographer-profil__informations">
                    <h1 class="photographer-profil__name">${name}</h1>
                    <p class="photographer-profil__location">${city}, ${country}</p>
                    <p class="photographer-profil__baseline">${tagline}</p>
                    <ul class="tags">
                    ${tags
                      .map((tag) => {
                        return `
                        <li class="tags__item">
                          <a href="/index.html?tag=${tag}"><span>tag </span>#${tag}</a>
                          <!-- Link used if tags in photographer bio are used to filter media by category  -->
                          <!--<a href="/source/pages/photographer-profil.html?id=${id}&tag=${tag}"><span>tag </span>#${tag}</a>-->
                        </li>`;
                      })
                      .join("")}
                    </ul>
                </div>
                <div class="photographer-profil__contact">
                    <button class="btn btn-regular js-modal-btn-open" title="Contactez moi">Contactez-moi</button>
                </div>
                <div class="photographer-profil__picture">
                    <img src="/public/img/photographers/${id}/${image_url}" alt="Portrait de ${name}" />
                </div>
            </div>
`;
  }
  //image media markup
  mediaImageHtmlMarkup({ photographerId, image_url, likes, title, price, id }) {
    return `
            <article class="item">
                <div class="item__media">
                    <figure class="item__figure">
                        <img data-id="${id}" loading="lazy" class="item__image" src="../../public/img/photographers/${photographerId}/media/${image_url}" alt="${title}">
                        <figcaption class="item__meta">
                            <h2 class="item__title">${title}</h2>
                            <span class="item__price"> ${price} € </span>
                            <span class="likes item__likes">
                              <span class="likes__counter"> ${likes} </span>
                              <button role="button" aria-label="Cliquez pour aimer la photo" class="likes__icon btn-likes" data-id=${id}>
                                  <svg class="heart-main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path
                                      d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                                      stroke-linecap="square"
                                      stroke-miterlimit="10"
                                  />
                                  </svg>
                                  <svg class="heart-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
          </article>
    `;
  }
  //video media markup
  mediaVideoHtmlMarkup({ photographerId, video_url, likes, title, price, id }) {
    return `
            <article class="item">
                <div class="item__media">
                    <figure class="item__figure">
                        <video data-id="${id}" loading="lazy" class="item__video" controls="controls" role="button" alt="${title}">
                            <source src="/public/img/photographers/${photographerId}/media/${video_url}" type="video/mp4">
                        </video>
                        <figcaption class="item__meta">
                          <h2 class="item__title">${title}</h2>
                          <span class="item__price"> ${price} € </span>
                          <span class="likes item__likes">
                              <span class="likes__counter"> ${likes} </span>
                              <button role="button" aria-label="Cliquez pour aimer la vidéo" class="likes__icon btn-likes" data-id=${id}>
                                  <svg class="heart-main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path
                                  d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                                  stroke-linecap="square"
                                  stroke-miterlimit="10"
                                  />
                                  </svg>
                                  <svg class="heart-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                
            </article>`;
  }
  photographerPriceAndLikes({ price, totalLikes }) {
    return `
      <div class="likes-price__wrapper">
          <span class="likes total-likes">
            <span class="likes__counter total-likes-number"> ${totalLikes} </span>
            <svg class="likes__icon" aria-label="likes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                stroke-linecap="square"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
          </span>
          <span class="price" aria-label="${price} par jour"> ${price}€ / jour </span>
      </div>`;
  }

  // lightbox
  lightboxImageHtmlMarkup({ photographerId, image_url, id, title }) {
    return `
    <figure class="lightbox__media-container" id=${id}>
      <img id=${id} class="photographer-media" src="/public/img/photographers/${photographerId}/media/${image_url}" alt="${title}" />
      <figcaption class="lightbox__media-title">${title}</figcaption>
    </figure>
    `;
  }

  lightboxVideoHtmlMarkup({ photographerId, video_url, id, title }) {
    return `
    <figure class="lightbox__media-container" id=${id}>
      <video preload="metadata" id=${id} title="${title}" class="photographer-media" controls>
        <source src="/public/img/photographers/${photographerId}/media/${video_url}" type="video/mp4">
      </video>
      <figcaption class="lightbox__media-title">${title}</figcaption>
    </figure>
    `;
    //etc
  }
}
