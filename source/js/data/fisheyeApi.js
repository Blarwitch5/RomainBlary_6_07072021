function getFishEyeData() {
    let requestURL = "source/api/fisheye/fisheyeData.json";

    fetch(requestURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function(value){
          document.getElementById('returnTest')
          .innerHTML = value.photographers[0];
          console.log(value);
      })
      .catch(function (error) {
        console.log("Une erreur est survenue");
      });
  }
  document
  .getElementById("test")
  .addEventListener("click", getFishEyeData);
