let loader = document.getElementById("preloader");


if(localStorage.getItem("loaded")){
    loader.style.display = "none";
}

/*
window.addEventListener("load", function () {
    loader.style.display = "none";
    localStorage.setItem("loaded", "true");
})
*/

setTimeout(function(){
    loader.style.display = "none";
    localStorage.setItem("loaded", "true");
},4600);