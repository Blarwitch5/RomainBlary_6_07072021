async function getFishEyeData() {
  let requestURL = "./source/api/fisheye/fisheyeData.json";
  let response = await fetch(requestURL);
  let data = await response.json();

  const dataPhotographers = [...data.photographers];
  const dataMedias = [...data.media];

  return {
      'photographers': dataPhotographers,
      'media': dataMedias
  };
}
export default getFishEyeData;
