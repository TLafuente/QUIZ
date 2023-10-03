const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Highly Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["Number", "Boolean", "Float", "String"],
        correctAnswer: "Float"
    },
    {
        question: "What symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "--"],
        correctAnswer: "//"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        correctAnswer: "<ul>"
    },
    {
        question: "What is the result of 10 + '5' in JavaScript?",
        options: ["15", "105", "10 + 5", "Error"],
        correctAnswer: "105"
    },
    {
        question: "What is the correct way to select an HTML element with the id 'myElement' using JavaScript?",
        options: ["getElement('myElement')", "document.select('myElement')", "document.getElementById('myElement')", "selectElement('myElement')"],
        correctAnswer: "document.getElementById('myElement')"
    },
    {
        question: "Which of the following is a valid CSS color value?",
        options: ["#G2B4F9", "#33CCFF", "rgb(256, 128, 64)", "color: blue"],
        correctAnswer: "#33CCFF"
    },
    {
        question: "What is the purpose of the 'console.log()' method in JavaScript?",
        options: ["To display a message in the console", "To create a pop-up dialog", "To change the page's background color", "To add a new HTML element"],
        correctAnswer: "To display a message in the console"
    },
    {
        question: "Which of the following is not a valid HTML element?",
        options: ["<div>", "<span>", "<paragraph>", "<section>"],
        correctAnswer: "<paragraph>"
    },
    // New questions
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const timer = document.getElementById("timer");
const timeLeftSpan = document.getElementById("time-left");
const resultContainer = document.querySelector(".result-container");
const finalScoreSpan = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const highScoresContainer = document.querySelector(".high-scores-container");
const highScoresList = document.getElementById("high-scores-list");
const clearScoresButton = document.getElementById("clear-scores");

// Shuffle function to randomize question order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the questions array before starting the quiz
shuffleArray(questions);

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    timerInterval = setInterval(function () {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    displayQuestion();
}

// Function to display a question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.textContent = question.question;
        optionsContainer.innerHTML = "";
        question.options.forEach(function (option) {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.addEventListener("click", checkAnswer);
            optionsContainer.appendChild(optionButton);
        });
    } else {
        endQuiz();
    }
}

// Function to check the selected answer
function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    } else {
        timeLeft -= 10; // Penalty for incorrect answers
    }
    currentQuestionIndex++;
    displayQuestion();
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    optionsContainer.style.display = "none";
    timer.style.display = "none";
    resultContainer.style.display = "block";
    finalScoreSpan.textContent = score;
}

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Event listener for saving the score
saveScoreButton.addEventListener("click", function () {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const highScore = { initials, score };
        saveHighScore(initials, score); // Save the high score
        displayHighScores(); // Display high scores
    }
});

// Function to save high scores
function saveHighScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = { initials, score };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
    resultContainer.style.display = "none";
    highScoresContainer.style.display = "block";

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort the high scores by score in descending order
    highScores.sort((a, b) => b.score - a.score);

    highScoresList.innerHTML = "";
    highScores.forEach((score) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Event listener for clearing high scores
clearScoresButton.addEventListener("click", function () {
    clearHighScores(); // Clear high scores
});

// Function to clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = ""; // Clear the displayed list
}