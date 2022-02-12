export default class Likes {
  constructor() {
    this.likes = [];
    this.likePriceSection = document.querySelector(".likes-price");
    this.totalLikesNumberContainer = document.querySelector(".total-likes-number");
    this.totalLikesNumber = parseInt(document.querySelector(".total-likes-number").innerHTML);
    this.likesIndex = new Set();

    this.likeBtns = document.querySelectorAll(".btn-likes");

    this.likeBtns.forEach((likeBtn) => {
      if ([...this.likesIndex].includes(likeBtn.getAttribute("data-id"))) {
        likeBtn.classList.add("hasBeenliked");
        this.totalLikesNumber += 1;
        this.totalLikesNumberContainer.innerHTML = this.totalLikesNumber;
      }
      likeBtn.addEventListener("click", () => {
        let totalLikesNumber = document.querySelector(".total-likes-number");

        if (likeBtn.classList.contains("hasBeenliked")) {
          let likesInteger = parseInt(likeBtn.previousElementSibling.innerHTML);
          let updatedLikes = likesInteger - 1;
          likeBtn.previousElementSibling.innerHTML = updatedLikes;
          this.totalLikesNumber -= 1;
          totalLikesNumber.innerHTML = this.totalLikesNumber;
        } else {
          let likedId = likeBtn.getAttribute("data-id");
          this.likesIndex.add(likedId);
          let likesInteger = parseInt(likeBtn.previousElementSibling.innerHTML);
          let updatedLikes = likesInteger + 1;
          likeBtn.previousElementSibling.innerHTML = updatedLikes;
          this.totalLikesNumber += 1;
          totalLikesNumber.innerHTML = this.totalLikesNumber;
        }
        if (likeBtn.classList.contains("hasBeenliked")) {
          likeBtn.classList.remove("hasBeenliked");
        } else {
          likeBtn.classList.add("hasBeenliked");
        }
      });
    });
  }
}
