export default class ProfilBanner {
  displayProfilBanner(data) {
    let photographerData = data.photographers;
    photographerData.map(function (photographer) {
      let photographerProfilContainer = document.querySelector(".photographer-profil");
      //get the photographer ID
      let url = new URL(window.location.href);
      let id = url.searchParams.get("id");
      let photographerId = parseInt(id); 
      //   console.log(url);

      let photographerProfilMarkup = `
            <div class="photographer-profil__banner">
            <div class="photographer-profil__informations">
                <h1 class="photographer-profil__name">${photographer.name}</h1>
                <p class="photographer-profil__location">${photographer.city}</p>
                <p class="photographer-profil__baseline">${photographer.tagline}</p>
                <ul class="tags">
                <li class="tags__item">
                    <a href=""><span>tag</span>#portrait</a>
                </li>
                <li class="tags__item">
                    <a href=""><span>tag</span>#events</a>
                </li>
                <li class="tags__item">
                    <a href=""><span>tag</span>#travel</a>
                </li>
                <li class="tags__item">
                    <a href=""><span>tag</span>#animals</a>
                </li>
                </ul>
            </div>
            <div class="photographer-profil__contact">
                <button class="btn btn-regular js-modal-btn-open" title="Contactez moi">Contactez-moi</button>
            </div>
            <div class="photographer-profil__picture">
                <img src="../../public/img/photographers/${photographer.id}/${photographer.portrait}" alt="Portrait de ${photographer.name}" />
            </div>
            </div>`;

      photographerProfilContainer.innerHTML = photographerProfilMarkup;
    });
  }
}
