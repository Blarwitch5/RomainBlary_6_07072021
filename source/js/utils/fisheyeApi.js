class FisheyeApi {
  async getFishEyeData() {
    let requestURL = "/source/ressources/fisheyeData.json";
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw Error(`Attention ! Une erreur est survenue. \nAucune donnée provenant de l'API FishEye n'est disponible.`);
    } else {
      let data = await response.json();

      const dataPhotographers = [...data.photographers];
      const dataMedias = [...data.media];

      return {
        photographers: dataPhotographers,
        media: dataMedias,
      };
    }
  }
}
export default FisheyeApi;
