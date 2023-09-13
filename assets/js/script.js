const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener("click", startGame);


nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Starts the Game 
 */
function startGame() {
  document.getElementById("incorrect").innerText = "0";
  document.getElementById("score").innerText = "0";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}


/**
 * Calls the next question 
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Displays the current question. 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;

  const correct = selectedButton.dataset.correct;
  setStatusClass(selectedButton, correct)
  
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

/**
 * Displays the colour of the correct or incorrect answer. 
 */

function setStatusClass(element, correct) {
  clearStatusClass(element);
 
  if (correct) {
    element.classList.add("correct");
    incrementScore();
  } else {
    element.classList.add("wrong");
    incrementWrongAnswer();
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
  

  let oldScore = parseInt(document.getElementById("score").innerText);
  
  document.getElementById("score").innerText = ++oldScore;

}

/**
* Gets the current tally of incorrect answers from the DOM and increments it by 1
*/
function incrementWrongAnswer() {
  

  let oldScore = parseInt(document.getElementById("incorrect").innerText);

  document.getElementById("incorrect").innerText = ++oldScore;
  
}

/**
* Updates the scores
*/


const questions = [
  {
    question: "Who is the main chracter in Minecraft?",
    answers: [
      { text: "Steve", correct: true },
      { text: "Alex", correct: false }
    ]
  },
  {
    question: "Who is the best YouTuber?",
    answers: [
      { text: "Dan TDM", correct: true },
      { text: "Mr Beast", correct: true },
      { text: "Preston", correct: true },
      { text: "Yub", correct: true }
    ]
  },
  {
    question: "When was Roblox Started?",
    answers: [
      { text: "2006", correct: true },
      { text: "2007", correct: false },
      { text: "2008", correct: false },
      { text: "2004", correct: false }
    ]
  },
  {
    question: "What is Nintendo's Gaming Console Called?",
    answers: [
      { text: "MegaDrive", correct: false },
      { text: "Switch", correct: true },
      { text: "Swatch", correct: false },
      { text: "PS2", correct: false }
    ]
  },
  {
    question: "When was steam released?",
    answers: [
      { text: "2004", correct: false },
      { text: "2001", correct: false },
      { text: "2010", correct: false },
      { text: "2003", correct: true }
    ]
  }
  
];

