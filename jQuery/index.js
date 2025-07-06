$(document).ready(function() {
  $("h1").css("color", "red");
});

$("h1").click(function() {
  $("h1").css("color", "blue");
});

$("button").click(function() {
  $("h1").css("color","yellow");
  $("h1").text("Hello World!");
});

$("input").keypress(function(event) {
  $("h1").text(event.key);
});

$(document).on("mouseover", "h1", function() {
  $("h1").css("color", "green");
});

$("button").on("click", function() {
  $("h1").fadeToggle();
});

$(".btn-outline-light").on("click", function () {
  $("ul").slideToggle();
});

$(".btn-warning").on("click", function () {
  $("ul").slideUp().slideDown().animate({opacity: 0.5});
});

$("h1").on("click", function() {
  $("h1").animate({opacity: 0.5})
});
