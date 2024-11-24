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
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableAnswers();
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

function showQuestion() {
    clearInterval(timer);
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer, button, currentQuestion.explanation));
        answersContainer.appendChild(button);
    });
    feedbackMessage.innerHTML = "";
    explanationElement.classList.add("d-none");
}

function checkAnswer(answer, button, explanation) {
    if (answer.correct) {
        score++;
        scoreElement.textContent = score;
        feedbackMessage.innerHTML = "<span class='text-success'>Resposta Correta!</span>";
        button.classList.add("btn-success");
    } else {
        feedbackMessage.innerHTML = "<span class='text-danger'>Resposta Errada!</span>";
        button.classList.add("btn-danger");
    }
    disableAnswers();
    explanationElement.textContent = explanation;
    explanationElement.classList.remove("d-none");
    
    // Aguardar 3 segundos (3000 ms) antes de ir para a próxima pergunta
    setTimeout(nextQuestion, 3000);
}

function disableAnswers() {
    const buttons = answersContainer.querySelectorAll("button");
    buttons.forEach(button => button.setAttribute("disabled", true));
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
    // Ocultar o contador de tempo ao final
    timerElement.classList.add('d-none');
    
    feedbackMessage.innerHTML = `Quiz Finalizado! 🎉 <br> Sua pontuação foi ${score}/${questions.length}`;
    if (score >= 3) {
        feedbackMessage.innerHTML += "<br> Parabéns! Você acertou 3 ou mais perguntas!";
    } else {
        feedbackMessage.innerHTML += "<br> Tente melhorar sua pontuação na próxima vez!";
    }
    answersContainer.classList.add('d-none');
    restartButton.classList.remove('d-none');
}

restartButton.addEventListener('click', () => {
    location.reload();  // Isso recarrega a página e reinicia o jogo
});

startGame();

