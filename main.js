$("document").ready(launchApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;
var clickable = true;

function launchApp() {
    $(".card").on("click", cardFlip);
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
        if(firstCardClicked === secondCardClicked){
            clickable = true;
            matchCounter++;
            firstCardClicked, secondCardClicked = null;
            if(matchCounter === totalPossibleMatches){
                $("#game-area").append($("<h1>").html("You Win"));
            }else return;
        }else{

        }
    }
}

