$("document").ready(launchApp);

function launchApp() {
    $(".card").on("click", cardFlip)
}

function cardFlip() {
    $(this).find(".back").hide();
}