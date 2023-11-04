// Questions to be asked, Choices to be given and Answers to the questions.

var questions = [
    {
        question: "What is JavaScript?",
        choices: ["Browser", "Programming Language", "Hardware", "Accessory"],
        answer: "Programming Language",
    },

    {
        question: "Which symbol is used for multiplication in JavaScript",
        choices: ["*", "x", "#", "all of the above"],
        answer: "*"
    },

    {
        question: "Which symbol is used for division in JavaScript?",
        choices: ["^", "<", "/", "none of the above"],
        answer: "/"
    },

    {
        question: "How do you name a variable in JavaScript?",
        choices: ["var", "let", "const", "all of the above"],
        answer: "all of the above"
    },

    {
        question: "How do you use JavaScript to print to the console?",
        choices: ["console.log()", "print()", "(show)[]", "prnt[]"],
        answer: "console.log"
    }
];

// Setting element manipulation variables

var startQuizEl = document.querySelector("#start-screen");
var scoresEl = document.querySelector("#choices");
var timerEl = document.querySelector("#time");
var strtBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var sbmtBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var questionResultsEl = document.querySelector("#q-results");
var finishEl = document.querySelector("#finish-screen");
var resultsEl = document.querySelector("#results");

// question variables

var index = 0;
var time = questions.lenth * 20;
var timerId;

// start quiz function

function startQuiz() {
    startQuizEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTime, 1000);
    timerEl.textContent = time;
    showQuestion();
}

// start button event listener

strtBtn.addEventListener("click", startQuiz);

// questions function

function showQuestion() {
    var activeQuestion = questions[index];
    questionEl.textContent = activeQuestion.title;
    choicesEl.innerHTML = "";
    activeQuestion.choices.forEach((choice, i) => {
        var nextButton = document.createElement("button");
        nextButton.setAttribute("class", "choice");
        nextButton.setAttribute("value", choice);
        nextButton.textContent = `${i + 1}. ${choice}`;
        nextButton.onclick = questionChoiceClick;
        choicesEl.appendChild(nextButton);
    });
}

// answer results

function questionChoiceClick() {
    if (this.value !== questions[index].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        questionResultsEl.textContent = "Wrong!";

        questionResultsEl.style.color = "red";

        questionResultsEl.style.fontSize = "75px"; 

    } else {

        questionResultsEl.textContent = "Correct!";

        questionResultsEl.style.color = "blue";

        questionResultsEl.style.fontSize = "75px"

    }

    questionResultsEl.setAttribute("class", "q-results");

    setInterval(function () {
        questionResultsEl.setAttribute("class", "hide");
    }, 1000);

    index++;

    if (index === questions.length) {
        finishQuiz();
    } else {
        showQuestion();
    }
}

// timer function

function clockTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        finishQuiz();
    }
}

// what to do if finishQuiz function hits

function finishQuiz() {
    clearInterval(timerId);
    finishEl.removeAttribute("class");
    resultsEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// store scores

function scoreStorage() {
    var initials = initialsEl.value;

    if (initialsEl !== "") {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials,
        };

        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        location.href = "scores.html"
    }
}

// submit button

sbmtBtn.addEventListener("click", scoreStorage);

// Score storage and usage

var highScoreList = document.getElementById("highscores");

// getting high scores

function showHighScores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function (a, b) {
        return b.core - a.score;
    });

    // showing high scores on page

    highScoreList.innerHTML = "";
    for (var i = 0; i < highscores.length; i++){
        var newScore = document.createElement("li");
        newScore.innerHTML = `${highscores[i].initials} - ${highscores[i].score}`;
        highScoreList.appendChild(newScore);
    }
}

showHighScores();
