$(document).ready(function() {

        // VARIABLES ==========================================================

        var triviaQuizList = [ 
            { question : "Who was the voice of Simba in the Lion King 2019?",
            answers : ["Michael Cera", "Donald Glover", "Billy Eichner", "Matthew Broderick"],
            correct : "Donald Glover",
            gif : "assets/images/simba-bug.webp" },
            
            { question : "Who was the voice of Sarabi in the Lion King 1994?",
            answers : ["Michelle Obama", "Willow Smith", "Gemma Collins","Alfre Woodard"],
            correct : "Michelle Obama",
            gif: "assets/images/animated_gif_014_sarabi_baby_simba.gif" },
    
            { question : "Who was the voice of Zazu in the Lion King 1994?",
            answers : ["John Oliver", "Hugh Grant", "John Hannah", "Rowan Atkinson"],
            correct : "Rowan Atkinson",
            gif : "assets/images/zazu.webp" },
    
            { question : "Who was the voice of Scar in in the Lion King 2019?",
            answers : ["Daniel-Day Lewis", "Jeremy Irons", "James Earl Jones", "Chiwetel Ejiofor"],
            correct : "Chiwetel Ejiofor",
            gif : "assets/images/scar.webp" },
    
            { question : "Who was the voice of Rafiki in Lion King 2019?",
            answers : ["Rowan Atkinson", "John Kani", "Robert Guillaume", "Ernie Sabella"],
            correct : "John Kani",
            gif : "assets/images/animated_gif_038_rafiki_talking.gif" },
    
            { question : "Who wrote the music score for the Lion King?",
            answers : ["Bill Conti", "David Newman", "Hans Zimmer", "James Horner"],
            correct : "Hans Zimmer",
            gif : "assets/images/cute-simba.webp" },
    
            { question : "Who directed the Lion King 2019?",
            answers : ["Stephen Spielberg", "Wes Anderson", "Christopher Nolan", "Jon Favreau"],
            correct : "Jon Favreau",
            gif : "assets/images/rafiki-painting.webp" },
    
            { question : "Who was the voice of Nala in Lion King 1994?",
            answers : ["Beyonce", "Shahadi Wright Joseph", "Moira Kelly", "Madge Sinclair"],
            correct : "Moira Kelly",
            gif : "assets/images/nala.webp" },
    
            { question : "Who was the voice of Timon in Lion King 1994?",
            answers : ["John Oliver", "Cheech Marin", "Nathan Lane","Jim Cummings"],
            correct : "Nathan Lane",
            gif: "assets/images/timon.webp" }
    
        ];
        // VARS ===================================================
    
        var countdown = 10;
        var intervalId = 0;
        var index = 0;
        var questions = triviaQuizList.length;
        var correct = 0;
        var wrong = 0;
        var timeouts = 0;
        var start;
        var summaryMessageDiv = "<div id='summary-message'>";
        var tryAgainHTML = '<button type="button" id="try-again" onclick="tryAgain()" class="btn btn-info">Try Again</button>';
    
        // hide scores when loading page
        $("#scores").hide();
    
    
        // start countdown and show question ==========================
        function startCountdown() { 
    
            // test if game is over, if true show summary
            if (index >= questions) {  
                clearInterval(intervalId);
                // show summary message
                $("#summary-section").empty();
                showSummary();
            } else {
                // hide/show elements
                $("#run").empty();
                $("#time-section").show();
                $("#scores").show();
                $("#giphy").hide();
                $("#time-message").text("Time Remaining:");
                $("#summary-section").empty();  // empty summary-section
                // display a question and its answers
                showQuestion(index);
                // set countdown
                countdown = 10;
                // start decrementing the clock
                intervalId = setInterval(decrement, 1000);
            } // end else
        }; // end startCountdown
    
        function tryAgain() {
            countdown = 10;
            intervalId = 0;
            index = 0;
            correct = 0;
            wrong = 0;
            timeouts = 0;
            $("#timeout").text(timeouts);
            $("#wrong").text(wrong);
            $("#correct").text(correct);
            startCountdown();
        }; // end tryAgain
    
        // decrement the stopwatch and show in html ====================
        function decrement() {
            countdown--;
            $("#time-number").text(countdown);
            // what to do when time is up
            if (countdown === 0 ) { 
                // clearInterval and remove number from countdown
                clearInterval(intervalId);
                $("#time-number").html("&nbsp;");
                // increment the timeout and update html
                timeouts++;
                $("#timeout").text(timeouts);
                // hide the time section
                $("#time-section").hide();
                // empty the question and answer-list sections
                $("#question").empty();
                $("#answer-list").empty();
                // create a message and display it
                var correctAns = triviaQuizList[index].correct;
                var timeoutAlert = "Time's up! The correct answer is " + correctAns + ".";
                // make summary message div
                $("#summary-section").append(summaryMessageDiv);
                // append message
                $("#summary-message").html("<h5>" + timeoutAlert + "</h5>");
                $("#summary-message").show();
                // show the gif assigned in the question function
                $("#giphy").fadeIn(2000);
    
                // set index to next question
                index++;
                // wait 4 seconds before startCountDown function
                waitForIt();
            } // end if
        }; // end decrement
    
        // display question answer set =================================
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
            // insert image object (not displayed)
            var image = "<img src=" + trivia.gif + " width='300px'>";
            $("#giphy").html(image);
        } // end function
    
        // give a summary after the last question =========================
        function showSummary() {
            $("#run").append(tryAgainHTML);
            $("#time-section").hide();
            $("#question").empty();
            $("#answer-list").empty();
            $("#summary-section").show();
            // make summary message div
            $("#summary-section").append(summaryMessageDiv);
            // append message
            var summaryMessage = "<h5>Here's how you did:</h5>";
            $("#summary-section").append(summaryMessage);
    
            // make html
            var totalCorrect = "<h6 id='total-correct'>";
            var totalWrong = "<h6 id='total-wrong'>";
            var totalTimeout = "<h6 id='total-timeout'>";
    
            // append html
            $("#summary-section").append(totalCorrect).append(totalWrong).append(totalTimeout);
            // insert text
            $("#total-correct").text("Correct answers: " + correct);
            $("#total-wrong").text("Wrong answers: " + wrong);
            $("#total-timeout").text("Timeouts: " + timeouts);
        } // end showSummary
    
        // 5-second pause to read the answer result ======================
        function waitForIt() {
            setTimeout(function(){ 
                startCountdown() }, 4000);
        } // end waitForIt
    
        // ON CLICK EVENT =====================================================
    
        // compare item selected value to trivia array correct answer
        $(document).on("click", "li", function () {
    
            // capture selection and correct values
            var selection = $(this).text();
            var correctAnswer = $(this).attr("value");
    
            // stop the clock and hide time section
            clearInterval(intervalId);
            $("#time-number").html("&nbsp;");
            $("#time-section").hide();
    
            // empty the question and answer-list sections
            $("#question").empty();
            $("#answer-list").empty();
            // append the summary message div
            $("#summary-section").append(summaryMessageDiv);
            // append message
            $("#summary-section").show();
            // show gif
            $("#giphy").fadeIn(2000);
    
            // if no more questions to ask...
            if (index >= questions) {  
                clearInterval(intervalId);
                // show summary message
                showSummary();
            } else {
                // increment the question index
                index++;
    
                // if there is a match -------------------------------
                if ( selection === correctAnswer ) {
                    // increment the correct counter and assign to html element
                    correct++;
                    $("#correct").text(correct);
    
                    // create a message and display it
                    var message = "Yes! " + correctAnswer + " is correct!";
                    $("#summary-message").html("<h5>" + message + "</h5>");
    
                    // wait 4 seconds before startCountDown function
                    waitForIt();
    
                } // end if
                
                else {  // else must be a mismatch ---------------------------
                    // increment the correct counter and assign to html element
                    wrong++;
                    $("#wrong").text(wrong);
    
                    // create a message and display it
                    var message = "Sorry! The correct answer is " + correctAnswer + ".";
                    $("#summary-message").html("<h5>" + message + "</h5>");
    
                    // wait 4 seconds before startCountDown function
                    waitForIt();
                } // end else
            } // end else
        }); // end click on list item

}); // document ready end

