$(document).ready(function() {

    // VARIABLES ==========================================================

    var triviaQuizList = [ 
        { question : "Who was the voice of Sarabi in the Lion King 1994?",
        answers : ["Michelle Obama", "Willow Smith", "Gemma Collins","Alfre Woodard"],
        correct : "Michelle Obama",
        gif: "animated_gif_014_sarabi_baby_simba.gif" },

        { question: "Who was the voice of Rafiki in Lion King 2019?",
        answers : ["Rowan Atkinson", "John Kani", "Robert Guillaume", "Ernie Sabella"],
        correct : "John Kani",
        gif: "animated_gif_038_rafiki_talking.gif" },

        { question : "Who was the voice of Timon in Lion King 1994?",
        answers : ["John Oliver", "Cheech Marin", "Nathan Lane","Jim Cummings"],
        correct : "Nathan Lane",
        gif: "timon.webp" }
    ];


    // PAGE LOAD INITIALIZE ===================================

    $("#try-again").hide();
    $("#summary-section").hide();
    $("#scores").hide();

    // VARS ===================================================

    var countdown = 10;
    var intervalId = 0;
    var index = 0;
    var questions = triviaQuizList.length;
    var correct = 0;
    var wrong = 0;
    var timeouts = 0;

    // FUNCTIONS =============================================================

    // start again, initialize, and call startCountDown from first question
    function tryAgain () {
        // initialize in case trying again
        countdown = 10;
        intervalId = 0;
        index = 0;
        questions = triviaQuizList.length;
        correct = 0;
        wrong = 0;
        timeouts = 0;
        $("#try-again").hide();
        $("#time-section").show();
        $("#summary-section").hide();
        startCountdown();
    } // end tryAgain

    // start countdown and show question
    function startCountdown() { 
        // hide the start button
        $("#start").hide();
        $("#time-message").text("Time Remaining:");
        $("#time-section").show();
        $("#summary-section").hide();
        $("#scores").show();
        // display a question and its answers
        showQuestion(index);
        // set countdown
        countdown = 10;
        // setInterval returns a value every second
        // start decrementing the clock
        intervalId = setInterval(decrement, 1000);
    }; // startCountdown

    // decrement the stopwatch and show in html
    function decrement() {
        countdown--;
        $("#time-number").text(countdown);
        // what to do when time is up
        if (countdown === 0 ) { // if time runs out
            clearInterval(intervalId);
            // set index to next question
            index++;
            // increment the losses
            timeouts++;
            $("#timeout").text(timeouts);
            console.log("index = " + index);
            if (index >= questions) {  // game is over
                clearInterval(intervalId);
                // show summary message
                showSummary();
            } else { // go to next question
                startCountdown();
            } // end if else
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
        // display all the answers
        for ( var j = 0 ; j <= 3 ; j++ ) {
            var answer = trivia.answers[j];
            var truth = trivia.correct;
            var answerHTML = '<li class="list-group-item" id="answer" value="' + truth + '">' + answer + '</li>';
            $("#question").append(answerHTML);
        } // end for
    } // end function

    // give a summary after the last question
    function showSummary() {
        $("#try-again").show();
        $("#time-section").hide();
        $("#question").empty();
        $("#answer-list").empty();
        $("#summary-section").show();
        $("#summary-message").html("<h5>Here's how you did</h5>");
        $("#total-correct").text("Correct answers: " + correct);
        $("#total-wrong").text("Wrong answers: " + wrong);
        $("#total-timeout").text("Timeouts: " + timeouts);
    } // end showSummary

    function waitForIt() {
        setTimeout(function(){ 
            startCountdown }, 5000);
    } // end waitForIt

    
// PROGRAM STARTS HERE WITH ON CLICK EVENTS ========================================

    // start the game with Start button click event
    $("#start").on("click", startCountdown );

    // restart the game with Try Again button click event
    $("#try-again").on("click", tryAgain );

    // compare item selected value to trivia array correct answer
    $(document).on("click", "li", function () {

        // capture selection and correct values
        var selection = $(this).text();
        console.log("selection: " + selection);
        var correctAnswer = $(this).attr("value");
        console.log("correct answer = " + correctAnswer);

        // stop the clock and hide time section
        alert("intervalId: " + intervalId);
        clearInterval(intervalId);
        alert("intervalId cleared: " + intervalId);
        $("#time-section").hide();

        // empty the question and answer-list sections
        $("#question").empty();
        $("#answer-list").empty();
        
        // increment the question index
        index++;
        
        // if there is a match -------------------------------
        if ( selection === correctAnswer ) {
            alert("we have a match: " + selection + " = " + correctAnswer);

            // increment the correct counter and assign to html element
            correct++;
            $("#correct").text(correct);

            // create a message and display it
            var message = "Yes! " + correctAnswer + " is correct!";
            $("#summary-message").html("<h5>" + message + "</h5>");
            $("#summary-message").show();

            // wait 5 seconds before startCountDown function
            waitForIt();

        } // end if
        
        else {  // else must be a mismatch ---------------------------
            alert("we have a mismatch: " + selection + " != " + correctAnswer);

            // increment the correct counter and assign to html element
            wrong++;
            $("#wrong").text(wrong);

            // create a message and display it
            var message = "Sorry! The correct answer is " + correctAnswer + ".";
            $("#summary-message").html("<h5>" + message + "</h5>");
            $("#summary-message").show();

            // wait 5 seconds before startCountDown function
            waitForIt();

        } // end else
    });

}); // document ready end

