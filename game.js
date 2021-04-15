var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var startGame = false;
var level = 0;
var clicks = 0;


$(document).keypress(function(event){
    if(startGame == false){
      nextSequence();
      startGame = true;
    }
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColors = buttonColors[randomNumber];
  gamePattern.push(randomChooseColors);                         //adding colors to comp array
  $("#"+randomChooseColors).fadeOut(100).fadeIn(100);
  audioPlayer(randomChooseColors);
  level++;
  $("#level-title").text("Level "+level);
  console.log(gamePattern);
  console.log(userClickedPattern);
}

function checkAns(i){
    if(gamePattern[i] === userClickedPattern[i]){
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }else {
      audioPlayer("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function audioPlayer(soundName){
  var audio = new Audio("sounds/"+soundName+".mp3");
  audio.play();
}


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  audioPlayer(userChosenColor);
  checkAns(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  startGame = false;
}
