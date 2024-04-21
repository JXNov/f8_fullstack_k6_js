const carousel = document.querySelector(".carousel");
const container = carousel.querySelector(".carousel__container");
const items = carousel.querySelectorAll(".carousel__item");
const dots = carousel.querySelector(".carousel__dots");
const leftButton = carousel.querySelector(".carousel__button--left");
const rightButton = carousel.querySelector(".carousel__button--right");

let current = 0;
let isMoving = false;

const next = () => {
    if (isMoving) return;
    isMoving = true;

    current = (current + 1) % items.length;

    container.style.transform = `translateX(-${current * 100}%)`;

    setTimeout(() => {
        isMoving = false;
    }, 500);

    updateDot();
};

const prev = () => {
    if (isMoving) return;
    isMoving = true;

    current = (current - 1 + items.length) % items.length;

    container.style.transform = `translateX(-${current * 100}%)`;

    setTimeout(() => {
        isMoving = false;
    }, 500);

    updateDot();
};

items.forEach((item, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel__dot");
    dot.addEventListener("click", () => {
        if (isMoving) return;
        isMoving = true;

        current = index;

        container.style.transform = `translateX(-${current * 100}%)`;

        setTimeout(() => {
            isMoving = false;
        }, 500);

        updateDot();
    });

    dots.appendChild(dot);

    if (index === 0) {
        dot.classList.add("carousel__dot--active");
    }
});

const updateDot = () => {
    const dot = dots.querySelector(".carousel__dot--active");
    if (dot) {
        dot.classList.remove("carousel__dot--active");
    }

    dots.children[current].classList.add("carousel__dot--active");
};

leftButton.addEventListener("click", prev);
rightButton.addEventListener("click", next);

container.addEventListener("mousedown", (e) => {
    if (isMoving) return;

    const { clientX } = e;
    const { left, width } = carousel.getBoundingClientRect();

    if (clientX - left < width / 2) {
        prev();
    } else {
        next();
    }
});
