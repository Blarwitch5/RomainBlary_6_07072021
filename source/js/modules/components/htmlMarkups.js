// creation of the html markup
export default class HtmlMarkup{
    photographerCardHtmlMarkup({id, name, city, country, tagline, price, tags, image_url}){
        return `
        <article class='photographer'>
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
    // photographerProfilBannerHtmlMarkup(){}
    // lightbox
    
    //etc
    
}
