"use strict";
// JavaScript Document
/*------------------- header menu laten zien ---------------------*/
var kruisKnopje = document.querySelector("header nav > button");
var menuKnop = document.querySelector("header button");
var menuSection = document.querySelector("header > nav");

function toonSection() {
  menuSection.classList.toggle("toonSection");
}

kruisKnopje.addEventListener("click", toonSection);
menuKnop.addEventListener("click", toonSection);


var form = document.querySelectorAll("main ul li form, main article div form");

for (var i=0; i < form.length; i++){
  form[i].addEventListener('submit', function(e) {
    if (!window.confirm("Are you sure you want to delete this person?")) {
      e.preventDefault()
    }
  })
}