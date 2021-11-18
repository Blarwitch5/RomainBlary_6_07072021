import { errorMessages } from "../../utils/errorMessages.js";

export default class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

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

  removeDefaultBrowserBehavior() {
    this.fields.forEach((field) => {
      const input = document.querySelectorAll(`#${field}`);
      // prevent the browser from showing default error bubble / hint
      input[0].addEventListener(
        "invalid",
        (event) => {
          event.preventDefault();
        },
        true
      );
    });
  }

  validateOnSubmit() {
    let self = this;
    //validation of the input when the user clicks on the submit btn
    this.form.addEventListener("submit", (event) => {
      //prevents page refresh
      event.preventDefault();
      self.fields.forEach((field) => {
        const input = document.querySelectorAll(`#${field}`);
        self.validateFields(input);
      });
    });
  }
  validateOnEntry() {
    let self = this;

    this.fields.forEach((field) => {
      const input = document.querySelectorAll(`#${field}`);

      //validation of the input when the user leaves the input field
      input[0].addEventListener("input", () => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    const input = field[0];
    const inputName = field[0].name;
    const inputValue = field[0].value;

    //regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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
          setInputStatus(input, errorFirstNameEmpty, "error");
        } else if (inputValue.trim().length > 50 || inputValue.trim().length < 2) {
          setInputStatus(input, errorFirstNameLength, "error");
        } else if (!firstnameRegex.test(inputValue)) {
          setInputStatus(input, errorFirstName, "error");
        } else {
          setInputStatus(input, null, "success");
        }

        break;

      case "last-name":
        const errorLastName = errorMessages.lastName.specialChars;
        const errorLastNameEmpty = errorMessages.lastName.empty;
        const errorLastNameLength = errorMessages.lastName.length;

        //function : checks if the input isn't empty, chars between 2 and 50, and without some special chars
        if (inputValue == null || inputValue == "") {
          setInputStatus(input, errorLastNameEmpty, "error");
        } else if (inputValue.trim().length > 500 || inputValue.trim().length < 2) {
          setInputStatus(input, errorLastNameLength, "error");
        } else if (!lastnameRegex.test(inputValue)) {
          setInputStatus(input, errorLastName, "error");
        } else {
          setInputStatus(input, null, "success");
        }

        break;
      case "email":
        //function : checks if the email format is valid
        let errorEmail = errorMessages.email;
        if (!emailRegex.test(inputValue)) {
          setInputStatus(input, errorEmail, "error");
        } else {
          setInputStatus(input, null, "success");
        }

        break;
      case "message":
        let errorMessage = errorMessages.message.specialChars;
        const errorMessageEmpty = errorMessages.message.empty;
        const errorMessageLength = errorMessages.message.length;
        //function : verify is the message isn't empty, less than 500 chars and without some special chars
        if (inputValue == null || inputValue == "") {
          setInputStatus(input, errorMessageEmpty, "error");
        } else if (inputValue.trim().length > 500 || inputValue.trim().length < 2) {
          setInputStatus(input, errorMessageLength, "error");
        } else if (!messageRegex.test(inputValue)) {
          setInputStatus(input, errorMessage, "error");
        } else {
          setInputStatus(input, null, "success");
        }

        break;
      case "terms-conditions":
        let errorTerms = errorMessages.termsConditions;
        //function : verify if the checkbox is checked
        if (input.checked) {
          setInputStatus(input, null, "success");
        } else {
          setInputStatus(input, errorTerms, "error");
        }
        break;
      default:
        return {
          error: "error",
        };
    }
  }
  // displays the error/valid message and the error/valid icon
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
}
