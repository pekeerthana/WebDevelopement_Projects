gamePattern = [];
userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
level = 0;

$(document).keypress(function() {
  console.log("level " + level);
  nextSequence();
});

$(document).on("click", ".btn", function (event) {
  var userChosenColor = document.getElementById(event.target.id).id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  console.log("User clicked: " + userClickedPattern[currentLevel]);
  console.log("Game pattern: " + gamePattern[currentLevel]);
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
 
}


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    animatePress(randomColor);
    playSound(randomColor);
    level++;
    $("h1").text("Level " + level);
}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
