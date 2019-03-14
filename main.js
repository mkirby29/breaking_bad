$(document).ready(launchApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function launchApp() {
    $(".video").addClass("hideElement");
    $(".gameContent").addClass("hideElement");
    $(".header").addClass("hideElement");
    $(".win").addClass("hideElement");
    $(".playAgain").addClass("hideElement");
    $(".play").on("click", modalStart);
    $(".resetButton").click(reset);
}

function modalStart(){
    console.log('clicked');
    $(".box").addClass("hideElement");
    $(".header").removeClass("hideElement");
    $(".gameContent").removeClass("hideElement");
    $(".win").addClass("hideElement");
    $("audio")[0].pause();
    shuffle();
    $(".card").on("click", cardFlip);
    startStats();
}

function playVid() { 
    $(".video")[0].play(); 
    $(".video").on("ended", function() {
        $(".video").addClass("hideElement");
        $(".win").removeClass("hideElement");
        $(".playAgain").removeClass("hideElement"); 
     });
    $(".playAgain").on("click", playAgain);
} 

function cardFlip() {
    console.log('CARD FLIP ACTIVATED');
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
                $(".gameContent").addClass("hideElement");
                $(".header").addClass("hideElement");
                $(".video").removeClass("hideElement");
                playVid();
            } else{
                console.log("You didn't win yet");
            }

        } else{
            setTimeout(flipBack, 1000);
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
    $(".matches .value").text(matches);
    $(".gamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    $(".accuracy .value").text(accuracy + "%");
}

function displayStats() {
    $(".matches .value").text(matches);
    $(".gamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    var accuracyPercentage = Math.round((matches/attempts) * 100) + "%";
    $(".accuracy .value").text(accuracyPercentage);
}

function reset() {
    console.log("reset game");
    $("#game-area").empty();
    firstCardClicked = null;
    secondCardClicked = null;
    totalPossibleMatches = 9;
    matchCounter = 0;
    attempts = 0;
    matches = 0;
    startStats();
    shuffle();
    $(".card").on("click", cardFlip);
    $(".card").find(".back").removeClass("hide");
}

function playAgain(){
    $(".gameContent").removeClass("hideElement");
    $(".header").removeClass("hideElement");
    $(".video").addClass("hideElement");
    $(".win").addClass("hideElement");
    $(".playAgain").addClass("hideElement");
    $("#game-area").empty();
    firstCardClicked = null;
    secondCardClicked = null;
    totalPossibleMatches = 9;
    matchCounter = 0;
    attempts = 0;
    matches = 0;
    startStats();
    shuffle();
    $(".card").on("click", cardFlip);
    $(".card").find(".back").removeClass("hide");
}

function shuffle(){
    var images = ["images/hank.jpg", "images/hank.jpg", "images/jesse.jpg", "images/jesse.jpg", "images/krazy8.jpg", "images/krazy8.jpg",
                  "images/marie.jpg", "images/marie.jpg", "images/skinnyPete.jpg", "images/skinnyPete.jpg", "images/skyler.jpg", "images/skyler.jpg",
                  "images/tuco.jpg", "images/tuco.jpg", "images/walt_images.jpg", "images/walt_images.jpg", "images/walter_white_season1.jpg", "images/walter_white_season1.jpg"];
    var randomImages = [];
    
    for(var index = 0; images.length > 0; index++){
        var rand = Math.floor(Math.random() * images.length);
        randomImages.push(images[rand]);
        images.splice(rand, 1);
    }
    for(var create = 0; create < randomImages.length; create++){
        var frontImage = $("<img>").attr("src", randomImages[create]).addClass("frontImage");
        var cardFront = $("<div>").addClass("front");
        // var backImage = $("<img>").attr("src", "images/season_1_poster.jpg");
        var cardBack = $("<div>").addClass("back");
        var card = $("<div>").addClass("card");
        
        // cardBack.append(backImage);
        card.append(cardFront, cardBack);
        cardFront.append(frontImage);
        $("#game-area").append(card);
    }
}