let sortingContainer = document.querySelector(".sorting__options");

//Create array of options to be added
let optionsArray = ["Popularité","Date","Titre"];

//Create the option list
let sortingList = document.createElement("ul");
sortingContainer.appendChild(sortingList);

//function allowing to add several attributes to an HTML element
function setAttributes(element, attributes){
  for (let key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}
//adding id and class to the option list
setAttributes(sortingList, {"id": "js-sorting-list", "class": "sorting__list"});
//adding the list in the container 'sortingContainer'
sortingContainer.appendChild(sortingList);

//Create and append the options
for (let i = 0; i < optionsArray.length; i++) {
    let sortingOption = document.createElement("li");
    sortingOption.setAttribute("class", "sorting__option");
    sortingList.appendChild(sortingOption);
    sortingOption.innerHTML = optionsArray[i];
}
