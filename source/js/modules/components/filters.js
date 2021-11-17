export default function DropDown(dropdownElement) {
  const [toggler, menu] = dropdownElement.children;

  // this.getPhotographer(data, this.dropdownBtn.children[0].innerHTML);


  const handleClickOut = (event) => {
    if (!dropdownElement) {
      return document.removeEventListener("click", handleClickOut);
    }

    if (!dropdownElement.contains(event.target)) {
      this.toggle(false);
    }
  };

  const setValue = (item) => {
    const val = item.textContent;
    toggler.textContent = val;
    this.value = val;
    this.toggle(false);
    dropdownElement.dispatchEvent(new Event("change"));
    toggler.focus();
  };

  const handleItemKeyDown = (event) => {
    event.preventDefault();

    if (event.keyCode === 38 && event.target.previousElementSibling) {
      // up
      event.target.previousElementSibling.focus();
    } else if (event.keyCode === 40 && event.target.nextElementSibling) {
      // down
      event.target.nextElementSibling.focus();
    } else if (event.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (event.keyCode === 13 || event.keyCode === 32) {
      // enter or spacebar key
      setValue(event.target);
    }
  };

  const handleToggleKeyPress = (event) => {
    event.preventDefault();

    if (event.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (event.keyCode === 13 || event.keyCode === 32) {
      // enter or spacebar key
      this.toggle(true);
    }
  };

  toggler.addEventListener("keydown", handleToggleKeyPress);
  toggler.addEventListener("click", () => this.toggle());
  [...menu.children].forEach((item) => {
    item.addEventListener("keydown", handleItemKeyDown);
    item.addEventListener("click", function () {
      setValue(item);
    });
  });

  this.element = dropdownElement;

  this.value = toggler.textContent;

  this.toggle = (expand = null) => {
    expand = expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;

    menu.setAttribute("aria-expanded", expand);

    if (expand) {
      toggler.classList.add("active");
      menu.children[0].focus();
      document.addEventListener("click", handleClickOut);
      dropdownElement.dispatchEvent(new Event("opened"));
    } else {
      toggler.classList.remove("active");
      dropdownElement.dispatchEvent(new Event("closed"));
      document.removeEventListener("click", handleClickOut);
    }
  };
}
