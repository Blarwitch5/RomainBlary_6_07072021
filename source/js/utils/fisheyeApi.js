import buildDataFecthingErrorMessage from "./errorMessages.js";

export default class FisheyeApi {
  async getFishEyeData() {
    let requestURL = "/source/ressources/fisheyeData.json";
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw Error(buildDataFecthingErrorMessage());
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
