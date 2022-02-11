//object containing the list of error messages for each field
export let errorMessages = {
  firstName: {
    specialChars: `Certains caractères spéciaux ou espaces ne sont pas admis`,
    empty: `Le champ prénom ne doit pas être vide`,
    length: `Le nombre de caractère du champ prénom doit être compris entre 2 et 50`,
  },
  lastName: {
    specialChars: `Certains caractères spéciaux ne sont pas admis`,
    empty: `Le champ ne doit pas être vide`,
    length: `Le nombre de caractère du champ nom doit être compris entre 2 et 50`,
  },
  email: `Le format de l'email n'est pas valide`,
  message: {
    specialChars: `Certains caractères spéciaux ne sont pas admis`,
    empty: `Le champ ne doit pas être vide`,
    length: `Le message doit contenir entre 2 et 500 caractères`,
  },
  termsConditions: `Pour vous inscrire, vous devez accepter les termes et conditions`,
};

//build message dom
function buildMessageDom(message){
  // let errorMessage = `Une erreur est survenue. \nAucune donnée provenant de l'API FishEye n'est disponible.`;
  let messageContainer = document.querySelector(".main-content").appendChild(document.createElement("div"));
  messageContainer.classList.add("error-message");
  messageContainer.innerHTML = message;
};

//fetch data error message
export function showFetchErrorMessage() {
  let errorMessage = `Une erreur est survenue. \nAucune donnée provenant de l'API FishEye n'est disponible.`;
  buildMessageDom(errorMessage);
}

//show no items selected message
export function showFilterMessage() {
  let message = `Aucun photographe ne correspond au(x) filtre(s) selectionné(s)`;
  buildMessageDom(message);
}
