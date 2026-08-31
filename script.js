// ========================================
// PAGE NAVIGATION
// ========================================

function nextPage(pageNumber) {
    const pages = document.querySelectorAll(".page");
    const targetPage = document.getElementById("page" + pageNumber);

    if (!targetPage) return;

    pages.forEach(function (page) {
        page.classList.remove("active");
        page.classList.remove("previous");
    });

    targetPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// FLOATING HEARTS
// ========================================

function createHeart() {
    const hearts = document.getElementById("hearts");

    if (!hearts) return;

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const symbols = ["❤️", "💖", "💕", "💗", "💓", "✨"];

    heart.innerHTML =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 25 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 6 + "s";

    hearts.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 12000);
}

setInterval(createHeart, 800);


// ========================================
// HEART CATCHING GAME
// ========================================

let score = 0;

const heartButton =
    document.getElementById("heartButton");

const gameArea =
    document.getElementById("gameArea");

const scoreDisplay =
    document.getElementById("score");

const gameMessage =
    document.getElementById("gameMessage");

const gameNext =
    document.getElementById("gameNext");


function moveHeart() {

    if (!heartButton || !gameArea) return;

    const maxX =
        gameArea.clientWidth - heartButton.offsetWidth;

    const maxY =
        gameArea.clientHeight - heartButton.offsetHeight;

    const randomX =
        Math.random() * Math.max(maxX, 0);

    const randomY =
        Math.random() * Math.max(maxY, 0);

    heartButton.style.left =
        randomX + "px";

    heartButton.style.top =
        randomY + "px";
}


if (heartButton) {

    heartButton.addEventListener(
        "click",
        function () {

            if (score >= 10) return;

            score++;

            if (scoreDisplay) {
                scoreDisplay.innerText = score;
            }

            moveHeart();

            if (score === 10) {

                if (gameMessage) {
                    gameMessage.innerText =
                        "🎉 You caught all my hearts! ❤️";
                }

                if (gameNext) {
                    gameNext.classList.remove("disabled");
                }
            }
            else {

                if (gameMessage) {
                    gameMessage.innerText =
                        "Catch " +
                        (10 - score) +
                        " more heart" +
                        (10 - score === 1 ? "" : "s") +
                        " ❤️";
                }
            }
        }
    );
}


// Move heart when entering the game page
function startGame() {
    setTimeout(moveHeart, 100);
}


// ========================================
// QUIZ
// ========================================

const questions = [

    {
        question:
            "Which one would you choose for our dream date? ❤️",

        answers: [
            "🌊 Beach",
            "⛰️ Mountains",
            "🍕 Food Date",
            "❤️ Anywhere Together"
        ]
    },

    {
        question:
            "What is more special to you? 🥰",

        answers: [
            "🎁 Gifts",
            "⏳ Time Together",
            "📱 Social Media",
            "😴 Sleeping"
        ]
    },

    {
        question:
            "What is the best part of our story? 💕",

        answers: [
            "😊 The Memories",
            "😂 The Funny Moments",
            "❤️ Being Together",
            "✨ Everything"
        ]
    }

];

let currentQuestion = 0;

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const quizMessage =
    document.getElementById("quizMessage");


function loadQuestion() {

    if (
        !questionElement ||
        !answersElement ||
        !questionNumber
    ) {
        return;
    }

    const current =
        questions[currentQuestion];

    questionElement.innerText =
        current.question;

    questionNumber.innerText =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    answersElement.innerHTML = "";

    current.answers.forEach(
        function (answer) {

            const button =
                document.createElement("button");

            button.innerText = answer;

            button.onclick = function () {
                answerQuestion();
            };

            answersElement.appendChild(button);
        }
    );
}


function answerQuestion() {

    if (quizMessage) {
        quizMessage.innerText =
            "❤️ Beautiful answer!";
    }

    setTimeout(function () {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            if (quizMessage) {
                quizMessage.innerText = "";
            }

            loadQuestion();

        } else {

            if (quizMessage) {
                quizMessage.innerText =
                    "🎉 Quiz completed! You unlocked the love letters ❤️";
            }

            setTimeout(function () {
                nextPage(5);
            }, 1500);
        }

    }, 700);
}


// Make function available to HTML buttons
window.answerQuestion = answerQuestion;


// ========================================
// LOVE LETTERS
// ========================================

const letterData = {

    1: {
        title: "When You Are Happy 😊",

        message:
            "Seeing you happy makes me happy too. Keep smiling, keep shining and always remember that your happiness is very special to me. ❤️"
    },

    2: {
        title: "When You Miss Me ❤️",

        message:
            "Whenever you miss me, just remember that distance can never remove the memories we created. Somewhere, someone is thinking about you and smiling. 💕"
    },

    3: {
        title: "When You Feel Sad 🥺",

        message:
            "Bad days will come and go, but please remember that you are stronger than you think. Take a deep breath, smile again, and remember that you are never alone. ❤️"
    }

};


function openLetter(number) {

    const popup =
        document.getElementById("letterPopup");

    const title =
        document.getElementById("letterTitle");

    const message =
        document.getElementById("letterMessage");

    const data = letterData[number];

    if (
        !popup ||
        !title ||
        !message ||
        !data
    ) {
        return;
    }

    title.innerText = data.title;

    message.innerText = data.message;

    popup.classList.remove("hidden");
}


function closeLetter() {

    const popup =
        document.getElementById("letterPopup");

    if (popup) {
        popup.classList.add("hidden");
    }
}


// Make functions available to HTML onclick
window.openLetter = openLetter;
window.closeLetter = closeLetter;


// ========================================
// FINAL MESSAGE
// ========================================

function showFinalMessage() {

    const lastMessage =
        document.getElementById("lastMessage");

    if (!lastMessage) return;

    lastMessage.classList.remove("hidden");

    createLoveExplosion();

}


window.showFinalMessage =
    showFinalMessage;


// ========================================
// HEART EXPLOSION
// ========================================

function createLoveExplosion() {

    for (let i = 0; i < 40; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML =
            ["❤️", "💖", "💕", "💗", "✨"][
                Math.floor(Math.random() * 5)
            ];

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.top =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            Math.random() * 25 + 20 + "px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "999";

        heart.style.transition =
            "all 1.5s ease";

        document.body.appendChild(heart);

        setTimeout(function () {

            heart.style.transform =
                "translateY(-150px) rotate(360deg)";

            heart.style.opacity =
                "0";

        }, 50);

        setTimeout(function () {
            heart.remove();
        }, 1600);
    }
}


// ========================================
// PAGE CHANGE IMPROVEMENT
// ========================================

const originalNextPage = nextPage;

window.nextPage = function (pageNumber) {

    originalNextPage(pageNumber);

    if (pageNumber === 3) {
        startGame();
    }

    if (pageNumber === 4) {

        currentQuestion = 0;

        setTimeout(function () {

            if (quizMessage) {
                quizMessage.innerText = "";
            }

            loadQuestion();

        }, 100);
    }

};
function forgiveMe() {

    const message = document.getElementById("forgiveMessage");

    if (message) {
        message.classList.remove("hidden");
        createLoveExplosion();
    }

}
function showForgiveMessage() {
    document.getElementById("forgiveMessage").style.display = "block";
}
function showForgiveMessage() {
    document.getElementById("forgiveMessage").classList.remove("hidden");
}