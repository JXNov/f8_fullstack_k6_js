import { data } from "./data.js";

const app = document.querySelector("#app");

const quizStart = app.querySelector(".quiz-start");
const startBtn = quizStart.querySelector(".start");
const startCountdown = quizStart.querySelector(".start-countdown");
const countdownTime = startCountdown.querySelector(".countdown-time");

const quiz = app.querySelector(".quiz");
const quizQuestion = quiz.querySelector(".quiz-question");

startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    startCountdown.classList.remove("hidden");

    countdown(3).then(() => {
        startCountdown.textContent = "Go!";

        setTimeout(() => {
            quizStart.classList.add("hidden");
            quiz.classList.remove("hidden");
        }, 1000);
    });
});

const countdown = (time) => {
    return new Promise((resolve) => {
        let count = time;
        countdownTime.textContent = count;

        const interval = setInterval(() => {
            count--;
            countdownTime.textContent = count;

            if (count === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
};

quizQuestion.innerHTML = data
    .map(({ question, answers, correct, multiple }, index) => {
        return `
            <div class="question ${
                index === 0 ? "" : "hidden"
            }" data-multiple="${multiple}">
                <div class="question-title">
                    <p class="question-text">
                        ${question}
                    </p>
                    <span>
                        ${
                            multiple
                                ? `Bạn phải chọn ${correct.length} đáp án`
                                : ""
                        }
                    </span>
                </div>

                <div class="answer">
                    ${answers
                        .map(({ id, text }) => {
                            return `
                        <button data-id="${id}">${text}</button>
                        `;
                        })
                        .join("")}
                </div>
            </div>
            `;
    })
    .join("");

const questions = quizQuestion.querySelectorAll(".question");
let currentQuestion = 0;
let score = 0;

questions.forEach((question, index) => {
    const answerBtns = question.querySelectorAll("button");

    const isMultiple = question.dataset.multiple === "true";

    const correct = data[index].correct;

    if (isMultiple) {
        let selectedAnswers = [];
        answerBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const answerId = btn.getAttribute("data-id");

                if (selectedAnswers.includes(answerId)) {
                    selectedAnswers = selectedAnswers.filter(
                        (id) => id !== answerId,
                    );
                    btn.classList.remove("selected");
                } else {
                    selectedAnswers.push(answerId);
                    btn.classList.add("selected");
                }

                if (selectedAnswers.length === correct.length) {
                    const isCorrect = correct.every((id) =>
                        selectedAnswers.includes(id),
                    );
                    if (isCorrect) {
                        score++;
                    }
                    setTimeout(() => {
                        nextQuestion();
                    }, 500);
                }
            });
        });
    } else {
        answerBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const answerId = btn.getAttribute("data-id");

                if (correct.includes(answerId)) {
                    btn.classList.add("correct");
                    score++;
                } else {
                    btn.classList.add("incorrect");
                }

                setTimeout(() => {
                    nextQuestion();
                }, 500);
            });
        });
    }
});

function nextQuestion() {
    questions[currentQuestion].classList.add("hidden");
    currentQuestion++;
    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.remove("hidden");
    } else {
        quiz.classList.add("hidden");
        startCountdown.classList.add("hidden");
        startBtn.classList.remove("hidden");
        quizStart.classList.remove("hidden");
    }
}
