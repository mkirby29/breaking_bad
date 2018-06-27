$(document).ready(initializeApp());

function initializeApp() {
    themeMusic();
}

function themeMusic() {
    var x = document.getElementById("theme");
    document.getElementById("music").innerHTML = x;
}
