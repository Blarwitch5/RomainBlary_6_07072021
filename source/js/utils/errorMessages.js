//object containing the list of error messages for each field
export let errorMessages = {
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

  //fetch data error message
  export default function buildDataFecthingErrorMessage(){
    let errorMessage = `Une erreur est survenue. \nAucune donnée provenant de l'API FishEye n'est disponible.`;
    let errorMessageContainer = document.querySelector(".main-content").appendChild(document.createElement("div"));
    errorMessageContainer.classList.add("error-message");
    errorMessageContainer.innerHTML = errorMessage;
  }
