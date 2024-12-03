const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which programming language is known for its 'Hello, World!' example?",

        answers: [
            {text: "Java", correct: false},
            {text: "C++", correct: false},
            {text: "Python", correct: true},
            {text: "Javscript", correct: false},
        ] 
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            {text: "Ag", correct: false},
            {text: "Au", correct: true},
            {text: "Hg", correct: false},
            {text: "Pb", correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world, both in terms of population and land area?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Monaco", correct: false},
            {text: "Nauru", correct: false},
            {text: "Tuvalu", correct: false},
        ]
    },
    {
        question: "Which artist painted the famous painting 'The Starry Night'?",
        answers: [
            {text: "Leonard da Vinci", correct: false},
            {text: "Vincent Van Gogh", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Claude Monet", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }  
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
        
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
    
 
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }
    else{
        startQuiz();
    }
});

startQuiz();