class ProfilBanner {
  displayProfilBanner(data) {
    let photographerProfilContainer = document.querySelector(".photographer-profil");

    if (photographerProfilContainer) {
      //get the photographer ID
      let url = new URL(window.location.href);
      let id = url.searchParams.get("id");
      let photographerId = parseInt(id);

      let photographerData = data.photographers;

      const photographer = !photographerId ? photographerData : photographerData.filter((photographer) => photographer.id == photographerId);
      console.log(photographer[0].tags);

      //photographer tags list function
      //       photographer[0].tags.map(function (tag){
      //         return `<li class="tags__item">
      //         <a href="index.html"><span>tag</span>#${tag}</a>
      //     </li>`;
      // ;      });

      let photographerProfilMarkup = `
              <div class="photographer-profil__banner">
                <div class="photographer-profil__informations">
                    <h1 class="photographer-profil__name">${photographer[0].name}</h1>
                    <p class="photographer-profil__location">${photographer[0].city}, ${photographer[0].country}</p>
                    <p class="photographer-profil__baseline">${photographer[0].tagline}</p>
                    <ul class="tags">
                    ${photographer[0].tags
                      .map((tag) => {
                        return `
                        <li class="tags__item">
                          <a href="../source/pages/photographer-profil.html?tag=${tag}&id=${id}"><span>tag </span>${tag}</a>
                        </li>`;
                      })
                      .join("")}
                    </ul>
                </div>
                <div class="photographer-profil__contact">
                    <button class="btn btn-regular js-modal-btn-open" title="Contactez moi">Contactez-moi</button>
                </div>
                <div class="photographer-profil__picture">
                    <img src="../../public/img/photographers/${photographer[0].id}/${photographer[0].portrait}" alt="Portrait de ${photographer[0].name}" />
                </div>
              </div>`;

      photographerProfilContainer.innerHTML = photographerProfilMarkup;
    } else {
      return;
    }
  }
}
export default ProfilBanner;
