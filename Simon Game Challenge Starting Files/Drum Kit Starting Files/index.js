
for (var i = 0; i < document.querySelectorAll("button").length; i++) {
document.querySelectorAll("button")[i].addEventListener("click", function()
{
  // this refers to the BUTTON that was clicked
  handleClick(this.innerHTML)
  buttonAnimation(this.innerHTML);
});
}

function handleClick(key)
{
  var audio;

  switch (key) 
  {
    case "w":
      audio = new Audio("sounds/crash.mp3");
      audio.play();
    case "a":
      audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
    case "s":
      audio = new Audio("sounds/snare.mp3");
      audio.play();
    case "d":
      audio = new Audio("sounds/tom-1.mp3");
      audio.play();
    case "j":
      audio = new Audio("sounds/tom-2.mp3");
      audio.play();
    case "k":
      audio = new Audio("sounds/tom-3.mp3");
      audio.play();
    case "l":
      audio = new Audio("sounds/tom-4.mp3");
      audio.play();
    default:
      console.log(this.innerHTML);
      break;
  }


}

// Detecting keyboard Press
addEventListener("keypress", function (event) {
  handleClick(event.key);
  buttonAnimation(event.key);
});

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function(){ activeButton.classList.remove("pressed")}, 100);

}

