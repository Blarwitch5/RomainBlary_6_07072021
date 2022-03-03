import { errorMessages } from "../../../utils/messages.js";
import HtmlMarkup from "../../factory/htmlMarkups.js";

export default class Form {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.inputs = document.querySelectorAll(".form__input");
    this.submitBtn = form.querySelector("#form-validation-btn");

    this.modal = document.querySelector(".contact-modal");
    this.modalBody = document.querySelector(".modal__body");

    this.contactForm = document.querySelector("#contact-form");
    this.formFields = document.querySelectorAll(".form__field");
    this.formInputs = document.querySelectorAll(".form__input");

    this.closeBtns = document.querySelectorAll(".js-modal-btn-close");
    this.validationMessage = new HtmlMarkup().contactValidationMessage();
  }
  /**
   *
   * @returns the contact form
   */
  initialize() {
    //intialize the validator if form exists
    if (this.form) {
      this.removeDefaultBrowserBehavior();
      this.validateOnEntry();
      this.validateOnSubmit();
    } else {
      return;
    }
  }
  /**
   * Removes the validation default behavior of the browser
   */
  removeDefaultBrowserBehavior() {
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);
      // prevent the browser from showing default error bubble / hint
      input.addEventListener(
        "invalid",
        (event) => {
          event.preventDefault();
        },
        true
      );
    });
  }
  /**
   * Validates the form fields when the user sends the form
   */
  validateOnSubmit() {
    this.submitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        this.validateFields(input);
      });
      if (this.isValid) {
        this.submitContactForm();
      }
    });
  }
  /**
   * Vzalidates the form fields when the user is typing
   */
  validateOnEntry() {
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);

      //validation of the input when the user leaves the input field
      input.addEventListener("input", () => {
        this.validateFields(input);
      });
    });
  }
  /**
   *
   * @param {*} field
   * Check if the fields input are correct and displays the style accordingly
   */
  validateFields(field) {
    const input = field;
    const inputName = field.name;
    const inputValue = field.value;

    //regex
    const emailRegex = /\S+@\S+\.\S+/;
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const firstnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,50}$/;
    const lastnameRegex = /^(([A-Za-zÀ-ÖØ-öø-ÿ]\s)*[A-Za-zÀ-ÖØ-öø-ÿ'-]){2,50}$/;
    const messageRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ- !'",;.:@()%€?]{2,500}$/;

    // all validation functions
    switch (inputName) {
      case "first-name":
        const errorFirstName = errorMessages.firstName.specialChars;
        const errorFirstNameEmpty = errorMessages.firstName.empty;
        const errorFirstNameLength = errorMessages.firstName.length;

        //function : checks if the input isn't empty, chars between 2 and 50, and without some special chars
        if (inputValue == null || inputValue == "") {
          this.setInputStatus(input, errorFirstNameEmpty, "error");
        } else if (inputValue.trim().length > 50 || inputValue.trim().length < 2) {
          this.setInputStatus(input, errorFirstNameLength, "error");
        } else if (!firstnameRegex.test(inputValue)) {
          this.setInputStatus(input, errorFirstName, "error");
        } else {
          this.setInputStatus(input, null, "success");
        }

        break;

      case "last-name":
        const errorLastName = errorMessages.lastName.specialChars;
        const errorLastNameEmpty = errorMessages.lastName.empty;
        const errorLastNameLength = errorMessages.lastName.length;

        //function : checks if the input isn't empty, chars between 2 and 50, and without some special chars
        if (inputValue == null || inputValue == "") {
          this.setInputStatus(input, errorLastNameEmpty, "error");
        } else if (inputValue.trim().length > 500 || inputValue.trim().length < 2) {
          this.setInputStatus(input, errorLastNameLength, "error");
        } else if (!lastnameRegex.test(inputValue)) {
          this.setInputStatus(input, errorLastName, "error");
        } else {
          this.setInputStatus(input, null, "success");
        }

        break;
      case "email":
        //function : checks if the email format is valid
        let errorEmail = errorMessages.email;
        if (!emailRegex.test(inputValue)) {
          this.setInputStatus(input, errorEmail, "error");
        } else {
          this.setInputStatus(input, null, "success");
        }

        break;
      case "message":
        const errorMessage = errorMessages.message.specialChars;
        const errorMessageEmpty = errorMessages.message.empty;
        const errorMessageLength = errorMessages.message.length;
        //function : verify is the message isn't empty, less than 500 chars and without some special chars
        if (inputValue == null || inputValue == "") {
          this.setInputStatus(input, errorMessageEmpty, "error");
        } else if (inputValue.trim().length > 500 || inputValue.trim().length < 2) {
          this.setInputStatus(input, errorMessageLength, "error");
        } else if (!messageRegex.test(inputValue)) {
          this.setInputStatus(input, errorMessage, "error");
        } else {
          this.setInputStatus(input, null, "success");
        }

        break;
      case "terms-conditions":
        let errorTerms = errorMessages.termsConditions;
        //function : verify if the checkbox is checked
        if (input.checked) {
          this.setInputStatus(input, null, "success");
        } else {
          this.setInputStatus(input, errorTerms, "error");
        }
        break;
      default:
        return {
          error: "error",
        };
    }
    return "";
  }
  /**
   * displays the error/valid message and the error/valid icon
   * @param {*} input
   * @param {*} message
   * @param {*} status
   */
  setInputStatus(input, message, status) {
    const successIcon = input.parentNode.querySelector(".modal__icon--success");
    const errorIcon = input.parentNode.querySelector(".modal__icon--error");
    const errorMessage = input.parentNode.querySelector(".modal__error-message");

    if (input.name === "terms-conditions") {
      switch (status) {
        case "success":
          if (errorMessage) {
            errorMessage.innerText = "";
            errorMessage.classList.remove("visible");
            errorMessage.classList.add("unvisible");
          }
          input.classList.remove("input-error");
          input.classList.add("input-valid");
          break;

        case "error":
          if (status === "error") {
            input.parentElement.querySelector(".modal__error-message").innerText = message;
            errorMessage.classList.remove("unvisible");
            errorMessage.classList.add("visible");
            input.classList.remove("input-valid");
            input.classList.add("input-error");
          }
          break;
      }
    } else {
      switch (status) {
        case "success":
          if (errorIcon) {
            errorIcon.classList.add("unvisible");
          }
          if (errorMessage) {
            errorMessage.innerText = "";
            errorMessage.classList.remove("visible");
            errorMessage.classList.add("unvisible");
          }
          successIcon.classList.remove("unvisible");
          input.classList.remove("input-error");
          input.classList.add("input-valid");
          break;
        case "error":
          if (successIcon) {
            successIcon.classList.add("unvisible");
          }
          input.parentElement.querySelector(".modal__error-message").innerText = message;
          errorIcon.classList.remove("unvisible");
          errorMessage.classList.remove("unvisible");
          errorMessage.classList.add("visible");
          input.classList.remove("input-valid");
          input.classList.add("input-error");
          break;
      }
    }
  }
  /**
   *
   * @param {*} inputs
   * @returns a boolean value, true is all fields or ready to be submited
   */
  isValid(inputs) {
    let error = [];
    inputs.forEach((input) => {
      error = [...error, input.classList];
    });
    let checker;
    for (let i = 0; i < inputs.length; i++) {
      checker = () => error[i].contains("input-error");
    }

    if (error.every(checker)) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Creates and adds the success validation message
   */
  displayValidationMessage() {
    this.modalBody.insertAdjacentHTML("afterbegin", this.validationMessage);
    this.contactForm.style.display = "none";
  }
  //
  /**
   * submit (log) form if all values are true
   */
  submitContactForm() {
    let firstnameFieldValue = document.querySelector(`input[name=${this.fields[0]}]`).value,
      lastnameFieldValue = document.querySelector(`input[name=${this.fields[1]}]`).value,
      emailFieldValue = document.querySelector(`input[name=${this.fields[2]}]`).value,
      messageFieldValue = document.querySelector(`textarea[name=${this.fields[3]}]`).value,
      termsFieldValue = document.querySelector(`input[name=${this.fields[4]}]`).checked;

    if (firstnameFieldValue || lastnameFieldValue || emailFieldValue || messageFieldValue !== "" || !termsFieldValue) {
      const valid = this.isValid(this.formInputs);
      if (valid) {
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
}
