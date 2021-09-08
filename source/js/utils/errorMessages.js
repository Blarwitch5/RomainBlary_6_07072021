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

export default errorMessages;
