import Modal from "./modal.js";
import FormValidator from "./formValidator.js";

export default class ContactModal extends Modal {
  constructor(data) {
    super();
    this.appData = data;
    this.contactModal = document.querySelector(".modal__body");
    this.form = document.querySelector("#contact-form");
    this.formFields = document.querySelectorAll(".form__field");
    this.formInputs = document.querySelectorAll(".form__input");
    this.fields = ["first-name", "last-name", "email", "message", "terms-conditions"];
    this.modal = new Modal();
    this.validator = new FormValidator(this.form, this.fields);
  }

  getCurrentPhotographerName(appData) {
    const url = new URL(window.location.href);
    let idValue = url.searchParams.get("id");
    let id = parseInt(idValue);
    const filteredPhotographer = appData.photographers.filter(function (element) {
      if (element.id === id) {
        return element;
      }
    });
    let photographerNameValue = `${filteredPhotographer[0].name}`;
    let photographerName = document.getElementById("js-photographer-name");
    photographerName.innerHTML = photographerNameValue;
  }
  displayValidationMessage() {
    const validationMessage = `
      <!-- Form submitted message -->
        <div class="validation">
          <div class="validation__message">
            <div class="validation__icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle class="path circle" fill="none" stroke="#079992" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <polyline class="path check" fill="none" stroke="#079992" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
              </svg>
            </div>
            Merci ! <br />
            Vos informations ont été transmises.
          </div>
          <button class="validation__close-btn btn btn-regular js-modal-btn-close" title="Fermer la fenêtre">Retour</button>
        </div>`;

    this.contactModal.insertAdjacentHTML("afterbegin", validationMessage);
    this.form.style.display = "none";

    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");

    this.closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        this.modal.hideModal(this.modal.contactElement);
      });
    });
  }
  //submit (log) form if all values are true
  submitContactForm() {
    let firstnameFieldValue = document.querySelector(`input[name=${this.fields[0]}]`).value,
      lastnameFieldValue = document.querySelector(`input[name=${this.fields[1]}]`).value,
      emailFieldValue = document.querySelector(`input[name=${this.fields[2]}]`).value,
      messageFieldValue = document.querySelector(`textarea[name=${this.fields[3]}]`).value,
      termsFieldValue = document.querySelector(`input[name=${this.fields[4]}]`).value;

    if (firstnameFieldValue || lastnameFieldValue || emailFieldValue || messageFieldValue || termsFieldValue !== "") {
      const error = this.isNotValid(this.formInputs);
      if (!error) {
        firstnameFieldValue = document.querySelector(`input[name=${this.fields[0]}]`).value;
        lastnameFieldValue = document.querySelector(`input[name=${this.fields[1]}]`).value;
        emailFieldValue = document.querySelector(`input[name=${this.fields[2]}]`).value;
        messageFieldValue = document.querySelector(`textarea[name=${this.fields[3]}]`).value;
        termsFieldValue = document.querySelector(`input[name=${this.fields[4]}]`).checked;

        //   show all inputs value in console
        console.group(`FishEye - Contact Message from ${firstnameFieldValue} ${lastnameFieldValue}`);
        console.log(
          "%cPrénom : " +
            firstnameFieldValue +
            "\n" +
            "Nom : " +
            lastnameFieldValue +
            "\n" +
            "Email : " +
            emailFieldValue +
            "\n" +
            "Message : " +
            messageFieldValue +
            "\n" +
            "Conditions d'utilisation : " +
            termsFieldValue,
          "color: #079992; font-style: italic;"
        );
        console.groupEnd();
        this.displayValidationMessage();
      }
    }
  }
  isNotValid(inputs) {
    let error = [];
    inputs.forEach((input) => {
      error = [...error, input.classList];
    });
    let checker;
    for (let i = 0; i < inputs.length; i++) {
      checker = () => error[i].contains("input-error");
    }
    if (error.every(checker)) {
      return true;
    } else {
      return false;
    }
  }
}
