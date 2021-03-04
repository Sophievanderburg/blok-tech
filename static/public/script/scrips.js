// variables
var removeButton = document.querySelector("main ul li > button");
var popUp = document.querySelector("main article.popup");
var buttonCancelPopup = document.querySelector("main article.popup button:last-of-type");

// eventhandlers
function showPopup () {
    console.log("show Pop-up");
    popUp.classList.remove("invisible");
}

function hidePopup () {
    console.log("hide Pop-up");
    popUp.classList.add("invisible");
}

// eventlisteners
removeButton.addEventListener('click', showPopup);
buttonCancelPopup.addEventListener('click', hidePopup);