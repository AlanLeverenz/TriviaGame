$(document).ready(function() {

// page loads and a start button appears midscreen

// when user clicks on the start button, a function starts moving through the question array

// question and possible answers appear on the page
// when user clicks on start 
    // the timer appears
    // the question appears
    // the answers appear

// when the user clicks on an answer a function tests if the "guess" attr is true or false
// the question object as four questions and a gif
    // if false the answer div is replaced by "Nope!", the correct answer, and a gif below
    // if time runs out answer div is replaced by "Out of Time!", the correct answer and a gif below
    // if true answer div is replaced by "Correct!" and a gif below
    
    // 5-second timeout, and the next question appears (next index in question object array)

    // after final question:
        // a summary of right, wrong, and unanswered questions appears with "Start Over?" option


// set up trivia question-answer object array

// VARIABLES ==========================================================
var triviaQuizList = [ 
    { question : "Who was the voice of Sarabi in the Lion King 1994?",
    answers : [ "Michelle Obama", "Willow Smith", "Gemma Collins","Alfre Woodard"],
    gif: "animated_gif_014_sarabi_baby_simba.gif" },

    { question: "Who was the voice of Rafiki in Lion King 2019?",
    answers : [ "Rowan Atkinson", "John Kani", "Robert Guillaume", "Ernie Sabella"],
    gif: "animated_gif_038_rafiki_talking.gif" },

    { question : "Who was the voice of Timon in Lion King 1994?",
    answers : [ "John Oliver", "Cheech Marin", "Nathan Lane","Jim Cummings"],
    gif: "timon.webp" }
];


// FUNCTIONS ===================================================

var number = 11;
var intervalId = 0;
var index = 0;

  // run
function run() {
    $("#time-message").text("Time Remaining:");
    showQuestion(index);
    // setInterval returns an interval every second
    number = 10;
    intervalId = setInterval(decrement, 1000);
};

// decrement the stopwatch and show in html
function decrement() {
    number--;
    $("#time-number").text(number);
    // what to do when time is up
    if (number === 0 ) {
        // set index to next question
        index++;
        console.log("index = " + index);
        run();
        if (index > 3) {
            clearInterval(intervalId);
            number = 11;
        } else {
            run();
        }
    } // end if
}; // end decrement


// display question answer set
function showQuestion (i) {
    // empty current html question first
    $("#question").empty();
    var trivia = triviaQuizList[i];
    var question = trivia.question;
    $("#question").html("<h5>" + question + "</h5>");
    // empty current html answer list first
    $("#answer-list").empty();
    for ( var j = 0 ; j <= 3 ; j++ ) {
        var answer = trivia.answers[j];
        var answerHTML = '<li class="list-group-item" id="answer" value="' + answer + '">' + answer + '</li>';
        $("#question").append(answerHTML);
    }    
}

function waitForIt() {
    setTimeout(function(){ console.log("waitForIt"); }, 5000);
}

// START THE PROGRAM ========================================

  // capture click events
  $("#start").on("click", run);


}); // document ready end


// var myVar = setInterval(myTimer, 1000);
// function myTimer() {
//     var d = new Date();
//     var t = d.toLocaleTimeString();
//     $(".stopwatch").html(t);
// }
// function myStopFunction() {
//    clearInterval(myVar);
// }

