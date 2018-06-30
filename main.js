$("document").ready(launchApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function launchApp() {
    $(".card").on("click", cardFlip);
    $(".resetButton").click(reset);
    startStats();
}

function cardFlip() {
    if($(this).find(".back").hasClass("hide") === true){
        return;
    }

    if(firstCardClicked !== null && secondCardClicked !== null){
        return;
    }

    $(this).find(".back").addClass("hide");

    if(firstCardClicked === null){
        firstCardClicked = this;
    }
    else{
        secondCardClicked = this;
        attempts++;
        displayStats();
        if($(firstCardClicked).find(".front > img").attr("src") === $(secondCardClicked).find(".front > img").attr("src")){
            matchCounter++;
            matches++;
            firstCardClicked = null;
            secondCardClicked = null;
            displayStats();
            if(matchCounter === totalPossibleMatches){
                console.log("You Win");
            } else{
                console.log("You didn't win yet");
            }

        } else{
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
}

function startStats() {
    games_played++;
    $(".gamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    $(".accuracy .value").text(accuracy + "%");
}

function displayStats() {
    $(".gamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    var accuracyPercentage = Math.round((matches/attempts) * 100) + "%";
    $(".accuracy .value").text(accuracyPercentage);
}

function reset() {
    console.log("reset game");
    firstCardClicked = null;
    secondCardClicked = null;
    totalPossibleMatches = 9;
    matchCounter = 0;
    attempts = 0;
    matches = 0;
    startStats();
    $(".card").on("click", cardFlip);
    $(".card").find(".back").removeClass("hide");
}

