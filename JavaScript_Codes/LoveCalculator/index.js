function loveCalculator() {
    var name1 = prompt("Enter your name:");
    var name2 = prompt("Enter your partner's name:");

    if (name1 === "" || name2 === "") {
        alert("Please enter both names.");
        return;
    }

    var loveScore = Math.floor(Math.random() * 100) + 1;
    var resultText = "Your love score is " + loveScore + "%.";

    if (loveScore > 70) {
        resultText += " You are a match made in heaven!";
    } else if (loveScore > 40) {
        resultText += " You have a good chance of making it work.";
    } else {
        resultText += " You might want to reconsider.";
    }

   return alert(resultText);
}