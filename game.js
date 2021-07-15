var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];

// To keep track whether the game has started or not.
var started = false;


// To set the game level to zero.
var level = 0;


// To check whether the key is being pressed to start the game.
$(document).keypress(function(){
    if (!started) //If statement to check for the game status whether the user has started the game.
    {
        $("#level-title").text("Level:" + level);
        nextSequence();
        started = true;  //If the user has started the game then the game start status is upsdated to true.
    }
});



// To store the clicked buttons by the user in the userClickedPattern array and play the sounds accordingly.

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);


    checkAnswer(userClickedPattern.length-1);


    //To animate the buttons on user clicks,
    animatePress(userChosenColour);


    //To play the audio accordingly to the colour clicked by the user.
    playSound(userChosenColour);

    
});




// Function to check the answer the user is entering in the sequence and also calling the random generator function when the user follows the correct sequence.
function checkAnswer(currentLevel)
{

// Condtion to check whether the user Sequence is going correct.

//If the user sequence goes correct.
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }


//If the user sequence goes wrong.    
    else
    {
        playSound("wrong");

        //To animate the whole page to alert type when the game is over.
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any Key to Restart");

        reset();
    }
}

// Function to generate random sequence in the game.
function nextSequence() {

    // To reset the user Clicked Pattern to an empty array once the function is being triggered.
    userClickedPattern = [];

// To Increase the level after every pass.
    level++;

    // To update the text according to the variable level.
    $("#level-title").text("Level:" + level);



    // To generate and push the random generated colour to the array.
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour); 

//To Animate the buttons according whenever the function is Called
$("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//To play the audio whenever the function is called to generate the random functions.
playSound(randomChosenColour);


//To animate the buttons on the random buttons generations.
animatePress(randomChosenColour);
}


// Function to animate the buttons whenever the user clicks on the buttons.
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");



    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
}



//Function to play the sounds accordingly either by the user or the random sounds genarated by the nextSequence function.
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function reset()
{
    level = 0;
    gamePattern = [];
    started = false;
}
