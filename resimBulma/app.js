const formWrapper=document.querySelector(".from-wrapper");
const form=document.querySelector("#form");
const searchInput=document.querySelector("#searchInput");
const buttonWrapper=document.querySelector(".button-wrapper");
const searchButton=document.querySelector("#searchButton");
const clearButton=document.querySelector("#clearButton");
const imageListWrapper=document.querySelector(".imagelist-wrapper")

runEventListeners();

function runEventListeners(){
form.addEventListener("subit",search)
}
function search(e){
    console.log("emircan")
    e.preventDefault();
}