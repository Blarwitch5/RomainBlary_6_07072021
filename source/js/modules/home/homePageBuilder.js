/**
 * BUILD A GRID CONTAINING ALL THE PHOTOGRAPHERS BY DEFAULT
 */
export default class HomePageBuilder {
  displayPhotographersCards(data) {
    let photographers = data.photographers;
    photographers.map(function(){
            let photographersContainer = document.getElementById('photographers');
            let photographerCard = document.createElement('article');
            photographerCard.classList.add('photographer');
            photographersContainer.appendChild(photographerCard);
    });
  }
}
