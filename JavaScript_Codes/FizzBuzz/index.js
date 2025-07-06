var result = [];

function fizzBuzz() {
  if (result.length === 0) {
    result.push(1);
  } else if (result.length >= 1) {

    if((result[result.length - 1]+1) % 3 === 0 && (result[result.length - 1]+1) % 5 === 0) {
      result.push("FizzBuzz");
    }
    else if ((result[result.length - 1]+1) % 3 === 0) {
      result.push("Fizz");
    } else if ((result[result.length - 1]+1) % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(result.length + 1);
    }

  }
  return document.getElementById("result").innerHTML = result;
}
