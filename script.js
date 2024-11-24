const questions = [
    {
        question: "Qual é a melhor prática para proteger suas senhas?",
        answers: [
            { text: "Usar senhas curtas", correct: false },
            { text: "Anotar em um caderno", correct: false },
            { text: "Senhas longas e únicas", correct: true },
            { text: "Compartilhar com amigos", correct: false }
        ],
        explanation: "Senhas longas e únicas são mais difíceis de serem descobertas por invasores."
    },
    {
        question: "O que fazer ao receber e-mail suspeito?",
        answers: [
            { text: "Responder", correct: false },
            { text: "Clique no link", correct: false },
            { text: "Excluir sem abrir", correct: true },
            { text: "Compartilhar", correct: false }
        ],
        explanation: "Excluir o e-mail suspeito sem abrir reduz o risco de clicar em links maliciosos."
    },
    {
        question: "Boa prática ao usar Wi-Fi público?",
        answers: [
            { text: "Usar uma VPN", correct: true },
            { text: "Conectar sem restrições", correct: false },
            { text: "Internet banking", correct: false },
            { text: "Fazer compras online", correct: false }
        ],
        explanation: "Usar uma VPN protege seus dados enquanto você usa uma rede pública."
    },
    {
        question: "O que é Phishing?",
        answers: [
            { text: "Um ataque para roubar dados", correct: true },
            { text: "Um software antivírus", correct: false },
            { text: "Uma rede segura", correct: false },
            { text: "Um tipo de firewall", correct: false }
        ],
        explanation: "Phishing é um ataque que tenta enganar usuários para roubar informações pessoais."
    },
    {
        question: "Como proteger suas redes sociais?",
        answers: [
            { text: "Usar autenticação de dois fatores", correct: true },
            { text: "Usar a mesma senha para todas", correct: false },
            { text: "Compartilhar senhas", correct: false },
            { text: "Desativar as configurações de segurança", correct: false }
        ],
        explanation: "A autenticação de dois fatores adiciona uma camada extra de segurança às suas contas."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer-count");
const feedbackMessage = document.getElementById("feedback-message");
const explanationElement = document.getElementById("explanation");

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = score;
    showQuestion();
}

function startTimer() {
    timeLeft = 20;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableAnswers();
            nextButton.classList.remove('hidden');
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    startTimer();
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerText = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    nextButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    answersContainer.innerHTML = '';
    feedbackMessage.textContent = '';
    explanationElement.textContent = '';
    explanationElement.classList.remove('show');
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    const currentQuestion = questions[currentQuestionIndex];

    if (isCorrect) {
        score++;
        feedbackMessage.textContent = "Correto! 👍";
    } else {
        feedbackMessage.textContent = "Errado! ❌";
        explanationElement.textContent = currentQuestion.explanation;
        explanationElement.classList.add('show');
    }

    scoreElement.textContent = score;
    Array.from(answersContainer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
    nextButton.classList.remove('hidden');
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = "Quiz Finalizado! 🎉 Sua pontuação foi ${score}/${questions.length}.";
    feedbackMessage.textContent = score === questions.length ? "Parabéns! Você acertou todas!" : "Bom trabalho! Tente melhorar sua pontuação!";
    restartButton.classList.remove('hidden');
}

restartButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);

startGame();