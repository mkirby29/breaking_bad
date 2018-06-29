$("document").ready(launchApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;

function launchApp() {
    $(".card").on("click", cardFlip);
}

function cardFlip() {
    $(this).find(".back").addClass(".hide");

    if(firstCardClicked === null){
        firstCardClicked = this;
    }else{
        secondCardClicked = this;
        if(firstCardClicked === secondCardClicked){
            matchCounter++;
            firstCardClicked, secondCardClicked = null;
            if(matchCounter === totalPossibleMatches){
                $("#game-area").append($("<h1>").html("You Win"));
            }
        }else{
            
        }
    }
}

