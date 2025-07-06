function fibonacci(n){
  var result = [];
  if(n==1){
    result[0] = 0;
    return document.getElementById("result").innerHTML = result;

  }
  else{
    result[0] = 0;
    result[1] = 1;
    for(var i=2; i<n; i++){
      result[i] = result[i-1] + result[i-2];
    }
    return document.getElementById("result").innerHTML = result;
  }

}