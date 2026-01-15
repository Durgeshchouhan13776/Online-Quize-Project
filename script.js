const timerEl = document.getElementById("timer");
let timeLeft = 30;
let timer;


const quizData = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correct: 1
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    answers: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1
  },
  {
    question: "What year was JavaScript created?",
    answers: ["1995", "2000", "1990", "2005"],
    correct: 0
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Google", "Microsoft", "Netscape", "Apple"],
    correct: 2
  }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const countEl = document.getElementById("question-count");
const progressEl = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  countEl.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;
  progressEl.style.width = `${((currentQuestion) / quizData.length) * 100}%`;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(btn, index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  if (answered) return;
  answered = true;

  const correctIndex = quizData[currentQuestion].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === index && i !== correctIndex) btn.classList.add("wrong");
  });

  if (index === correctIndex) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizData.length;
  questionEl.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>`;
  answersEl.innerHTML = "";
  nextBtn.textContent = "Restart Quiz";
  nextBtn.disabled = false;
  progressEl.style.width = "100%";

  nextBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = "Score: 0";
    nextBtn.textContent = "Next";
    nextBtn.onclick = null;
    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };
    loadQuestion();
  };
}

loadQuestion();
