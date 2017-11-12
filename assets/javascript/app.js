
// trivia questions and answers array
var trivia = {
	questions: ["Q: Solar power generates electricity from what source?", 
				"Q: When did Pac-Man arrive?",
				"Q: What country uses Facebook most?",
				"Q: What's the world's largest online shop?",
				"Q: What does 'i' in Apple products like iMac stand for?"],
	answers: [
			["Air","Water", "Sun", "Tree"],
			["1980", "1981", "1982", "1983"],
			["Japan", "India", "China", "U.S.A"],
			["eBay", "Amazon", "Etsy", "Zappos"],
			["ingenious", "imperial", "idea", 'internet'],
			],
	correctAnswer: ["Sun", "1980", "U.S.A", "Amazon", "internet"],
	answerIndex: ["2", "0", "3", "1", "3"],
	answerImages: ["assets/images/solarPower.jpg",
					"assets/images/pacman.jpg",
					"assets/images/facebook.jpg",
					"assets/images/amazon.jpg",
					"assets/images/imac.jpg",
					],
};

// console.log(trivia.answers[0][0]);
var time = 20;
var html;
var setIntervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNumber = 0;
var carIsRunning = false;

$(".startBtn").on("click", function(){
	playCarStartAudio();
	playAudio();
	startAnimation();
	displayQuestion();
	startTimer();
});
function startTimer(){
	setIntervalId = setInterval(timer, 1000);
}
function timer(){
	time--;
	$("#displayTime").html(time);
	if (time === 0){
		$(".html").html(
		"<p>Time Remaining: " + "<span>" + time + "</span>" + " Seconds</p>" + "<p>Out of Time!</p>");
		$(".html").append("<p><span id='displayAnswer'>Correct Answer was: </span>" + trivia.correctAnswer[questionNumber] + "</p>");
		$(".html").append("<img src='" + trivia.answerImages[questionNumber] + "' width='150px'>");
		// console.log("time out");
		unanswered++;
		// clearInterval(setIntervalId);
		setTimeout(displayQuestion, 1000 * 5);
		time = 25;
		questionNumber++;
	}
};
// function to display a question 
function displayQuestion(){
	// console.log("game started");
	if (questionNumber === trivia.questions.length){
			// console.log("no more questions");
			clearInterval(setIntervalId);
			result();
			return;
		}
	$(".html").html(
		"<p>Time Remaining: " + "<span id='displayTime'></span>" + " Seconds</p>" + 
		"<p>" + trivia.questions[questionNumber] + "</p><br>");		
	for (var i=0; i<4; i++){
	var newDiv = $("<div>");
	var newBtn = $("<button>");
	newBtn.attr("data-value", i);
	newBtn.addClass("btn btn-primary btn-md btn-block");
	newBtn.html(trivia.answers[questionNumber][i]);
	newDiv.css({"width":"100px","height":"31px", "margin":"0 auto"});
	newDiv.append(newBtn);
	newDiv.append("<br>");
	$(".html").append(newDiv);
	}
	answeringQuestion();
};

// user answer question and update score. Then display next question
function answeringQuestion(){
	$(".btn").on("click", function(){
		// console.log("button pressed");
		var userAnswer = $(this).attr("data-value");
		if (userAnswer === trivia.answerIndex[questionNumber]){
			// console.log("correct!");
			correct++;
			$(".html").html(
				"<p>Time Remaining: " + "<span>" + time + "</span>" + " Seconds</p>" +
				"<p>Correct!</p>");
		}
		else{
			// console.log("not correct");
			incorrect++;
			$(".html").html(
				"<p>Time Remaining: " + "<span>" + time + "</span>" + " Seconds</p>" +
				"<p>Incorrect</p>");
			$(".html").append("<p><span id='displayAnswer'>Correct Answer was: </span>" + trivia.correctAnswer[questionNumber] + "</p>");
		}
		$(".html").append("<img src='" + trivia.answerImages[questionNumber] + "' width='150px'>");
		// console.log(trivia.answerImages);
		setTimeout(displayQuestion, 1000 * 5);
			time = 25;

		questionNumber++;
	});
}

// display the score. Change bg img. Play audio. Display button to restart game.
function result(){
	// console.log("here is result");
	setTimeout(delayDisplayGlassImg, 1000 * 1);
	playCrashAudio();
	audioCarIdle.pause();
	carIsRunning = true;
	// $("#glassImg").css("background-size", "1000px 732px");
	$(".html").html(
		"<p>All done, heres how you did!</p>" + 
		"<p>Correct Answers: " + correct + "</p>" +
		"<p>Incorrect Answers: " + incorrect + "</p>" +
		"<p>Unanswered: " + unanswered + "</p><br>" + 
		"<button id='restartBtn' class='btn btn-primary'>Start Over?</button>");
	$("#restartBtn").on("click", function(){
		$("#glassImg").css("background-size", "0 0");
		initializeGame();
		displayQuestion();
		startTimer();
		startAnimation();
		playCarStartAudio();
		audioCarIdle.play();
	});
}

// initial game stats
function initializeGame(){
	time = 20;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	questionNumber = 0;
	carIsRunning = false;
}

// function that animate road img
function startAnimation(){
	if (carIsRunning === true){
		return;
	}
	$("#streetImg").animate({
		backgroundPositionY: '+=200px'
	}, 500, 'linear', startAnimation);
}

function stopAnimation(){
	return;
}

var audioCarIdle = document.getElementById("carStart");
function playAudio(){
	// console.log("car idle sound played");
	audioCarIdle.loop = true;
	audioCarIdle.play();
}

var audioCarCrash = document.getElementById("carCrash");
function playCrashAudio(){
	audioCarCrash.play();
}

var audioCarStart = document.getElementById("carEngineStart");
function playCarStartAudio(){
	// console.log("car start sound played");
	audioCarStart.play();
}
function delayDisplayGlassImg(){
	$("#glassImg").css("background-size", "1000px 732px");
}