export default class Scroll {
  //get user position (y), to offer him the possibility to go back to the top of the photographers list
  displayScrollToMainBtn() {
    window.addEventListener("scroll", function () {
      const scrollToMainBtn = document.querySelector("#scroll-to-main");
      let y = window.scrollY;

      if (y <= 100) {
        scrollToMainBtn.style.display = "none";
      } else {
        scrollToMainBtn.style.display = "block";
      }
    });
  }
}
