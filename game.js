var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//keeping track of if game started
var started = false;
//starting level
var level = 0;

// jquery detect keyboard key
$(document).keypress(function() {
  if (!started) {
    // manipulating level values
    $("#level-title").text("Level " + level);
    newSequence();
    started = true;
  }
});

// jquery detector for button clicks
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any key to Try Again");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// newSequence function
function newSequence() {
  userClickedPattern = [];
  // level advancement
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  // add color to pattern array
  gamePattern.push(randomChosenColor);
  // "flashing animation"
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

// function to add animation to button pressed
function animatePress(currentColor) {
  // add pressed class to button
  $("#" + currentColor).addClass("pressed");

  // set timeout to 1 second to remove the class that was added
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
