/*-----------------------------------------------------------*/
/*-------------------------- MODAL --------------------------*/
/*-----------------------------------------------------------*/
const modal = document.querySelector(".js-modal");
// const modalBtnClose = document.querySelector(".js-modal-btn-close");
const modalBtnOpen = document.querySelector(".js-modal-btn-open");
const formDataFields = document.querySelectorAll(".form__field");
const formValidationBtn = document.getElementById("form-validation-btn");

const modalCloseBtns = document.querySelectorAll(".js-modal-btn-close");
const modalEnd = document.getElementById("js-modal-end");

// launch modal form
function launchModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}
// close modal form
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// launch 2nd modal when form is valid and submitted
function launchModalFormSubmitted() {
  modalEnd.style.display = "block";
  document.body.style.overflow = "hidden";
}
// close 2nd modal when form is valid and submitted
function closeModalFormSubmitted() {
  modalEnd.style.display = "none";
  document.body.style.overflow = "";
}

// launch modal event
modalBtnOpen.addEventListener("click", launchModal);

// close modal events
// get js-modal-close-btn of both modals and give them a listener on click => close modal
for (let index = 0; index < modalCloseBtns.length; index++) {
  let closeBtn = modalCloseBtns[index];

  if (closeBtn.classList.contains("modal-end__close-btn")) {
    closeBtn.addEventListener("click", closeModalFormSubmitted);
  } else {
    closeBtn.addEventListener("click", closeModal);
  }
}

//object formInputs containing all form input values
let formInputs = {
  firstName: document.getElementById("first-name"),
  lastName: document.getElementById("last-name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
  termsConditions: document.getElementById("terms-conditions"),
};
//object containing the list of error messages for each field
let errorMessages = {
  firstName: {
    specialChars: `Certains caractères spéciaux ou espaces ne sont pas admis`,
    empty: `Le champ prénom ne doit pas être vide`,
    length: `Le nombre de caractère du champ prénom doit  être compris entre 2 et 50`,
  },
  lastName: {
    specialChars: `Certains caractères spéciaux ne sont pas admis`,
    empty: `Le champ ne doit pas être vide`,
    length: `Le nombre de caractère du champ nom doit  être compris entre 2 et 50`,
  },
  email: `Le format de l'email n'est pas valide`,
  message: {
    specialChars: `Certains caractères spéciaux ne sont pas admis`,
    empty: `Le champ ne doit pas être vide`,
    length: `Le message ne doit pas dépasser 500 caractères`,
  },
  termsConditions: `Pour vous inscrire, vous devez accepter les termes et conditions`,
};

/*------------------------------------------------------------------------*/
/*----------    List of all event listeners on form inputs    ------------*/
/*------------------------------------------------------------------------*/
const inputFirstname = formInputs.firstName;
inputFirstname.addEventListener("input", firstnameValidation);

const inputLastname = formInputs.lastName;
inputLastname.addEventListener("input", lastnameValidation);

const inputEmail = formInputs.email;
inputEmail.addEventListener("input", emailValidation);

const inputMessage = formInputs.message;
inputMessage.addEventListener("change", messageValidation);

const inputTermsConditions = formInputs.termsConditions;
inputTermsConditions.addEventListener("input", termsConditionsValidation);

/*------------------------------------------------------------------------*/
/*----------            remove HTML5 default validation       ------------*/
/*------------------------------------------------------------------------*/
//get all .form-field elements from form
for (let index = 0; index < formDataFields.length; index++) {
  let formField = formDataFields[index];
  formField.addEventListener(
    "invalid",
    function (event) {
      event.preventDefault(); // prevent the browser from showing default error bubble / hint
    },
    true
  );
}

/*------------------------------------------------------------------------*/
/*----------     function get error message from object       ------------*/
/*----------          and show / hide error message           ------------*/
/*------------------------------------------------------------------------*/
function setInputStatus(field, message, status) {
  const successIcon = field.parentNode.querySelector(".modal__icon--success");
  const errorIcon = field.parentNode.querySelector(".modal__icon--error");
  const errorMessage = field.parentNode.querySelector(".modal__error-message");
  if (field === formInputs.termsConditions) {
    if (status === "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
        errorMessage.classList.remove("visible");
        errorMessage.classList.add("unvisible");
      }
      field.classList.remove("input-error");
      field.classList.add("input-valid");
    }

    if (status === "error") {
      field.parentElement.querySelector(".modal__error-message").innerText = message;
      errorMessage.classList.remove("unvisible");
      errorMessage.classList.add("visible");
      field.classList.remove("input-valid");
      field.classList.add("input-error");
    }
  } else {
    if (status === "success") {
      if (errorIcon) {
        errorIcon.classList.add("unvisible");
      }
      if (errorMessage) {
        errorMessage.innerText = "";
        errorMessage.classList.remove("visible");
        errorMessage.classList.add("unvisible");
      }
      successIcon.classList.remove("unvisible");
      field.classList.remove("input-error");
      field.classList.add("input-valid");
    }

    if (status === "error") {
      if (successIcon) {
        successIcon.classList.add("unvisible");
      }
      field.parentElement.querySelector(".modal__error-message").innerText = message;
      errorIcon.classList.remove("unvisible");
      errorMessage.classList.remove("unvisible");
      errorMessage.classList.add("visible");
      field.classList.remove("input-valid");
      field.classList.add("input-error");
    }
  }
}
/*------------------------------------------------------------------------*/
/*----------            input validation functions            ------------*/
/*------------------------------------------------------------------------*/
//test text
function textFirstName(txt) {
  let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,50}$/;
  return regex.test(txt);
}
function textLastName(txt) {
  let regex = /^(([A-Za-zÀ-ÖØ-öø-ÿ]\s)*[A-Za-zÀ-ÖØ-öø-ÿ'-]){2,50}$/;
  return regex.test(txt);
}
function textMessage(txt) {
  let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ- !'",;.:@()%€?]{2,500}$/;
  return regex.test(txt);
}

// check is text input is valid
// function checkErrorAndSetStatus(value, input, message) {
//   if (value == null || value == "") {
//     setInputStatus(input, message, "error");
//   } else if (valueLength > 500) {
//     setInputStatus(input, message, "error");
//   } else if (!textCheckFunction) {
//     setInputStatus(input, message, "error");
//   } else {
//     testResult = true;
//     setInputStatus(input, null, "success");
//   }
// }
//validate text form inputs
function textInputCheck(inputId) {
  let testResult = false;
  const input = document.getElementById(inputId);
  let value = input.value;
  let valueLength = value.length;

  let textCheckFunction;

  if (inputId === "first-name") {
    textCheckFunction = textFirstName(value);
    let errorFirstName = errorMessages.firstName.specialChars;
    let errorFirstNameEmpty = errorMessages.firstName.empty;
    let errorFirstNameLength = errorMessages.firstName.length;

    // check is text input is valid
    if (value == null || value == "") {
      setInputStatus(input, errorFirstNameEmpty, "error");
    } else if (valueLength > 500 || valueLength < 2) {
      setInputStatus(input, errorFirstNameLength, "error");
    } else if (!textCheckFunction) {
      setInputStatus(input, errorFirstName, "error");
    } else {
      testResult = true;
      setInputStatus(input, null, "success");
    }
  } else if (inputId === "last-name") {
    textCheckFunction = textLastName(value);
    let errorLastName = errorMessages.lastName.specialChars;
    let errorLastNameEmpty = errorMessages.lastName.empty;
    let errorLastNameLength = errorMessages.lastName.length;
    // check is text input is valid
    if (value == null || value == "") {
      setInputStatus(input, errorLastNameEmpty, "error");
    } else if (valueLength > 500 || valueLength < 2) {
      setInputStatus(input, errorLastNameLength, "error");
    } else if (!textCheckFunction) {
      setInputStatus(input, errorLastName, "error");
    } else {
      testResult = true;
      setInputStatus(input, null, "success");
    }
  } else if (inputId === "message") {
    textCheckFunction = textMessage(value);
    let errorMessage = errorMessages.message.specialChars;
    let errorMessageEmpty = errorMessages.message.empty;
    let errorMessageLength = errorMessages.message.length;

    // check is text input is valid
    if (value == null || value == "") {
      setInputStatus(input, errorMessageEmpty, "error");
    } else if (valueLength > 500 || valueLength < 2) {
      setInputStatus(input, errorMessageLength, "error");
    } else if (!textCheckFunction) {
      setInputStatus(input, errorMessage, "error");
    } else {
      testResult = true;
      setInputStatus(input, null, "success");
    }
  }

  return testResult;
}

//validate email form inputs
function emailCheck(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

// validation of firstname input field
function firstnameValidation() {
  return textInputCheck("first-name");
}
// validation of lastname input field
function lastnameValidation() {
  return textInputCheck("last-name");
}

// validation of email input field
function emailValidation() {
  let testResult = false;
  const input = formInputs.email;
  let inputValue = input.value;
  let errorMessage = errorMessages.email;

  if (!emailCheck(inputValue)) {
    setInputStatus(input, errorMessage, "error");
  } else {
    testResult = true;
    setInputStatus(input, null, "success");
  }
  return testResult;
}

// check if birthdate is a valid date
function messageValidation() {
  return textInputCheck("message");
}

// check if termsConditions is checked
function termsConditionsValidation() {
  let testResult = false;
  const input = formInputs.termsConditions;
  let errorMessage = errorMessages.termsConditions;

  if (!input.checked) {
    setInputStatus(input, errorMessage, "error");
  } else {
    testResult = true;
    setInputStatus(input, null, "success");
  }
  return testResult;
}

/*------------------------------------------------------------------------*/
/*----------                   form validation                ------------*/
/*------------------------------------------------------------------------*/
formValidationBtn.addEventListener("click", formValidation);
let isValid =
  firstnameValidation() === true &&
  lastnameValidation() === true &&
  emailValidation() === true &&
  messageValidation() === true &&
  termsConditionsValidation() === true;

function formValidation(event) {
  let validForm = false;

  firstnameValidation();
  lastnameValidation();
  emailValidation();
  messageValidation();
  termsConditionsValidation();

  if (isValid) {
    validForm = true;
    event.preventDefault();
    closeModal();
    launchModalFormSubmitted();

    //show all inputs value in console
    console.log(
      "Prénom : " +
        formInputs.firstName.value +
        "\n" +
        "Nom : " +
        formInputs.lastName.value +
        "\n" +
        "Email : " +
        formInputs.email.value +
        "\n" +
        "Message : " +
        formInputs.message.value +
        "\n" +
        "Conditions d'utilisation : " +
        termsConditionsValidation()
    );
  } else {
    validForm = false;
    event.preventDefault();
  }
  return validForm;
}
/*-----------------------------------------------------------*/
/*------------------------- LIGHTBOX ------------------------*/
/*-----------------------------------------------------------*/
// creer la structure html de la lightbox + style
