let buttonColours = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

const animatePress = function (name) {
  $("#" + name)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

const playSound = function (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// ================================================================ game pattern
const nextSequence = function () {
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
};

// ================================================================ user pattern
$(".btn").click(function () {
  if (started) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  } else {
    gameover();
  }
});

// ================================================================ checking

const checkAnswer = function (currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    gameover();
  }
};

// ================================================================ game over

const gameover = function () {
  playSound("wrong");
  $("body").addClass("game-over");

  $("#level-title").text("GameOver!, Press any key to restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);

  startOver();
};

// ================================================================= reseting game

const startOver = function () {
  gamePattern = [];
  userClickedPattern = [];

  started = false;
  level = 0;
};
