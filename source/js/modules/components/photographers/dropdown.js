import Gallery from "../../factory/gallery.js";

export default class Dropdown {
  constructor(data) {
    this.medias = data.media;
    this.dropdownElement = document.querySelector(".dropdown");
    this.toggler = document.querySelector(".dropdown__toggle");
    this.menu = document.querySelector(".dropdown__menu");
    this.sortMedia = this.sortMedias();
  }
  initialize() {
    const handleClickOut = function (event) {
      if (!this.dropdownElement) {
        return document.removeEventListener("click", handleClickOut);
      }

      if (!this.dropdownElement.contains(event.target)) {
        this.toggle(false);
      }
    };

    const setValue = (item) => {
      const val = item.textContent;
      this.toggler.textContent = val;
      this.value = val;
      this.toggle(false);
      this.dropdownElement.dispatchEvent(new Event("change"));
      this.toggler.focus();
    };

    // const handleItemKeyDown = (event) => {
    //   event.preventDefault();

    //   if (event.key === "ArrowUp" && event.target.previousElementSibling) {
    //     // up
    //     event.target.previousElementSibling.focus();
    //   } else if (event.key === "ArrowDown" && event.target.nextElementSibling) {
    //     // down
    //     event.target.nextElementSibling.focus();
    //   } else if (event.key === "Escape") {
    //     // escape key
    //     this.toggle(false);
    //   } else if (event.key === "Enter" || event.key === 32) {
    //     // enter or spacebar key
    //     setValue(event.target);
    //     this.sortMedia;
    //   }
    // };

    const handleToggleKeyPress = (event) => {
      event.preventDefault();

      if (event.key === "Escape") {
        // escape key
        this.toggle(false);
      } else if (event.key === "Enter" || event.key === 32) {
        // enter or spacebar key
        this.toggle(true);
      }
    };

    this.toggler.addEventListener("keydown", handleToggleKeyPress);
    this.toggler.addEventListener("click", () => this.toggle());
    [...this.menu.children].forEach((item) => {
      item.addEventListener("keydown", (event) => {
        event.preventDefault();

        if (event.key === "ArrowUp" && event.target.previousElementSibling) {
          // up
          event.target.previousElementSibling.focus();
        } else if (event.key === "ArrowDown" && event.target.nextElementSibling) {
          // down
          event.target.nextElementSibling.focus();
        } else if (event.key === "Escape") {
          // escape key
          this.toggle(false);
        } else if (event.key === "Enter" || event.key === 32) {
          // enter or spacebar key
          setValue(event.target);
          this.sortMedias();
        }
      });
      item.addEventListener("click", () => {
        setValue(item);
        this.sortMedias();
      });
    });

    this.element = this.dropdownElement;

    this.value = this.toggler.textContent;

    this.toggle = (expand = null) => {
      expand = expand === null ? this.menu.getAttribute("aria-expanded") !== "true" : expand;

      this.menu.setAttribute("aria-expanded", expand);

      if (expand) {
        this.toggler.classList.add("active");
        this.menu.children[0].focus();
        document.addEventListener("click", handleClickOut);
        this.dropdownElement.dispatchEvent(new Event("opened"));
      } else {
        this.toggler.classList.remove("active");
        this.dropdownElement.dispatchEvent(new Event("closed"));
        document.removeEventListener("click", handleClickOut);
      }
    };
  }

  sortMedias() {
    let sortedMediasArray = [];
    let sortBtns = [...this.menu.children];

    sortBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        switch (index) {
          case 0:
            sortedMediasArray = this.medias.sort((a, b) => {
              return b.likes - a.likes;
            });
            this.displaySortedMedias(sortedMediasArray);
            break;
          case 1:
            sortedMediasArray = this.medias.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });
            this.displaySortedMedias(sortedMediasArray);
            break;
          case 2:
            sortedMediasArray = this.medias.sort((a, b) => {
              return a.title.localeCompare(b.title);
            });
            this.displaySortedMedias(sortedMediasArray);
            break;

          //by default, alphabetic order
          default:
            sortedMediasArray = this.medias.sort((a, b) => {
              return a.title.localeCompare(b.title);
            });
            this.displaySortedMedias(sortedMediasArray);
            break;
        }
      });
      btn.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === 32) {
          switch (index) {
            case 0:
              sortedMediasArray = this.medias.sort((a, b) => {
                return b.likes - a.likes;
              });
              this.displaySortedMedias(sortedMediasArray);
              break;
            case 1:
              sortedMediasArray = this.medias.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              });
              this.displaySortedMedias(sortedMediasArray);
              break;
            case 2:
              sortedMediasArray = this.medias.sort((a, b) => {
                return a.title.localeCompare(b.title);
              });
              this.displaySortedMedias(sortedMediasArray);
              break;

            //by default, alphabetic order
            default:
              sortedMediasArray = this.medias.sort((a, b) => {
                return a.title.localeCompare(b.title);
              });
              this.displaySortedMedias(sortedMediasArray);
              break;
          }
        }
      });
    });
  }
  displaySortedMedias(sortedMediasArray) {
    document.querySelector(".gallery__list").innerHTML = "";
    new Gallery().builder(sortedMediasArray);
  }
}
