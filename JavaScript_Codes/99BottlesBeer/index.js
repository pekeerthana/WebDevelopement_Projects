function bottlesBeer() 
{
  let song = "";
  let i = 99;
  while(i > 1){
    song += i + " bottles of beer on the wall, " + i + " bottles of beer.";
    song += "\nTake one down and pass it around, " + (i-1) + " bottles of beer on the wall.\n\n";
    i--;
  }
  song += "1 bottle of beer on the wall, 1 bottle of beer.";
  song += "\nTake one down and pass it around, no more bottles of beer on the wall.\n\n";
  
  song += "No more bottles of beer on the wall, no more bottles of beer.";
  song += "\nGo to the store and buy some more, 99 bottles of beer on the wall.";

  // Replace newlines with <br> for HTML
  song = song.replace(/\n/g, "<br>");

  document.getElementById("song").innerHTML = song;
}
