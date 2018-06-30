$("document").ready(launchApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;
var clickable = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function launchApp() {
    $(".card").on("click", cardFlip);
    startStats();
}

function cardFlip() {
    if(clickable == false){
        return
    }
    if($(this).find(".back").addClass("hide")){
        return;
    }

    if(firstCardClicked === null){
        firstCardClicked = this;
        $(firstCardClicked).find(".back").addClass("hide");
    }else{
        secondCardClicked = this;
        $(secondCardClicked).find(".back").addClass("hide");
        clickable = false;
        var firstImage = $(firstCardClicked).find(".front > img").attr("src");
        var secondImage = $(secondCardClicked).find(".front > img").attr("src");
        if(firstCardClicked === secondCardClicked) {
            clickable = true;
            matchCounter++;
            matches++;
            firstCardClicked, secondCardClicked = null;
            displayStats();
            if (matchCounter === totalPossibleMatches) {
                $("#game-area").append($("<h1>").html("You Win"));
            } else {
                console.log("didn't win yet");
            }
        }else{
            setTimeout(flipBack, 2000);
            displayStats();
        }

    }
}

function flipBack() {
    $(firstCardClicked).find(".back").removeClass("hide");
    $(secondCardClicked).find(".back").removeClass("hide");
    firstCardClicked = null;
    secondCardClicked = null;
    clickable = true;
}

function startStats() {
    ++games_played;
    $(".gamesPlayed.value").text(games_played);
    $(".attempts.value").text(attempts);
    $(".accuracy.value").text(accuracy + "%");
}

function displayStats() {
    $(".gamesPlayed.value").text(games_played);
    $(".attempts.value").text(attempts);
    var accuracyPercentage = Math.round((matches/attempts) * 100) + "%";
    $(".accuracy.value").text(accuracy);
}

function reset() {
    console.log("reset game");
    firstCardClicked = null;
    secondCardClicked = null;
    totalPossibleMatches = 9;
    matchCounter = 0;
    attempts = 0;
    matches = 0;
}

