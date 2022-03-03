export default class Likes {
  // increment or decrement the counter when clicking on the 'like' icon
  constructor() {
    this.media = document.querySelector(".gallery__list");
    this.totalLikesNumber = document.querySelector(".total-likes-number");

    this.media.addEventListener("click", (event) => {
      let currentLikeBtn = event.target.parentNode.parentNode;
      let currentBtnClassList = typeof currentLikeBtn.classList === "undefined" ? [] : currentLikeBtn.classList.value.split(" ");
      let hasBtnClass = currentBtnClassList.indexOf("btn-likes") != -1;

      if (hasBtnClass) {
        let totalLikes = parseInt(this.totalLikesNumber.innerHTML);
        let likeCounter = currentLikeBtn.parentNode.firstElementChild;
        let likeValue = parseInt(likeCounter.innerHTML);
        let hasBeenliked = currentBtnClassList.indexOf("hasBeenliked") != -1;

        this.totalLikesNumber.innerHTML = hasBeenliked ? --totalLikes : ++totalLikes;
        likeCounter.innerHTML = hasBeenliked ? --likeValue : ++likeValue;

        if (hasBeenliked) {
          currentLikeBtn.classList.remove("hasBeenliked");
        } else {
          currentLikeBtn.classList.add("hasBeenliked");
        }
      }
    });
    this.media.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === "Space") {
        let currentLikeBtn = event.target       ;
        let currentBtnClassList = typeof currentLikeBtn.classList === "undefined" ? [] : currentLikeBtn.classList.value.split(" ");
        let hasBtnClass = currentBtnClassList.indexOf("btn-likes") != -1;   

        if (hasBtnClass) {
          let totalLikes = parseInt(this.totalLikesNumber.innerHTML);
          let likeCounter = currentLikeBtn.parentNode.firstElementChild;
          let likeValue = parseInt(likeCounter.innerHTML);
          let hasBeenliked = currentBtnClassList.indexOf("hasBeenliked") != -1;

          this.totalLikesNumber.innerHTML = hasBeenliked ? --totalLikes : ++totalLikes;
          likeCounter.innerHTML = hasBeenliked ? --likeValue : ++likeValue;

          if (hasBeenliked) {
            currentLikeBtn.classList.remove("hasBeenliked");
          } else {
            currentLikeBtn.classList.add("hasBeenliked");
          }
        }
      }
    });
  }
}
