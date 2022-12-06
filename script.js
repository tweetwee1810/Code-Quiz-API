//create global variables for score and counting 
var count = 50;
var score = 0;
var arrayOfScores;

var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var secondsLeft = 50;
//create variable for start button
var startButton = document.getElementById("start-button")
//create variable for next button
var nextButton = document.getElementById("next-button")

var scoreEl = document.querySelector("#scoreid");
var playAgain = document.createElement("button");
//create the the eventlistener for click
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
//create varibale for question to appear 
var questionContainerElement = document.getElementById("question-container")
//create variable for the question and answer button
var questionElement = document.getElementById("question")
var answerButtonElement = document.getElementById("answer-button")
var randomQuestions, currentQuestionIndex
var mainE1 = document.getElementById("main")

//QUIZ QUESTIONS
var questions = [{
    question: "What is JavaScript?",
    answers:[
        {text:"JavaScript is a scripting language used to make the website interactive", correct: true },
        {text:"JavaScript is an assembly language used to make the website interactive", correct: false},
        {text:"JavaScript is a compiled language used to make the website interactive", correct: false},
        {text:"None of the above", correct: false}
    ]
}, 
{question: "The 'function' and 'var' are known as?",
answers: [
    {text:"keywords", correct: false},
    {text:"Data types", correct: true },
    {text:"Declaration statement", correct: false},
    {text:"Prototype", correct: false}
    ]
},
{question: "Which of the following is correct about JavaScript?",
answers: [
    {text:"JavaScript is an Object-Based language", correct: true},
    {text:"JavaScript is Assembly-language", correct: false},
    {text:"JavaScript is an Object-Oriented language", correct: false},
    {text:"JavaScript is a High-level language", correct: false}
]
}, 
{question: "Which of the following methods is used to access HTML elements using Javascript?",
answers: [
    {text:"getElementById ()", correct: false},
    {text:"getElementByClassName()", correct: false },
    {text:"Both of A & B", correct: true},
    {text:"None of the Above", correct: false}
]},
{
    question: "Which of the following variables takes precedence over the others if the names are the same?",
answers: [
    {text:"Global variable", correct: false},
    {text:"The local element", correct: false},
    {text:"Both of A & B", correct: true},
    {text:"None of the above", correct: false}
]}
]

function init() {
    var getScore = JSON.parse(localStorage.getItem("highScore"));
    console.log(getScore);
  
    if (!getScore) {
      arrayOfScores = []
    } else {
      arrayOfScores = getScore
    }
    var stringedArray = JSON.stringify(arrayOfScores)
    console.log(stringedArray);
    var retrievehighS = JSON.parse(stringedArray)
    //add score to the local store after save the game
    localStorage.setItem("stringedArray", retrievehighS);
}
//create a function to start the game
function startGame () {
//check if the function works
console.log("start")
//hide the start button
startButton.classList.add('hide')
//shuffle all the question 
randomQuestions = questions.sort(() => Math.random() -.5)
currentQuestionIndex = 0
//make the question apprear by removing the hide 
questionContainerElement.classList.remove("hide")
setNextQuestion()
}
//create a function for the next question
function setNextQuestion() {
    //reset any default state
    resetState()
showQuestion(randomQuestions[currentQuestionIndex])
}
//create the function for the questions
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        var button = document.createElement("button")
        button.innerText = answer.text
        //also need to add the class button
        button.classList.add("btn")
        //given statement for correct answer
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}
//create the function for the resetstate
function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }

}
//create a function to select the answer
function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        nextButton.classList.remove("hide")
    })
}
//create function for the set status
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
        console.log("correct answer")
        score ++;
        scoreEl.textContent = score;

    }
    else{
        element.classList.add("wrong")
        count -= 10;
    }
}
//create function for clear status
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

// function makeAlert(){ 
//     alert("Game over! Please insert your initials");
// };
// setInterval(makeAlert, 50000);

var downloadTimer = setInterval(function(){
    if(secondsleft <= 0){
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
  }, 1000);
