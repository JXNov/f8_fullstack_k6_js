const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const content = $(".content");
const vinyl = $(".vinyl");
const vinylThumb = $(".vinyl img");
const spindle = $(".spindle");
const lyricContent = $(".lyric-content");

const progressBar = $(".progress-bar");
const progress = $(".progress");
const progressBg = $(".progress-bg");
const progressFg = $(".progress-fg");
const hoverTime = $(".hover-time");

const audio = $("#audio");
const source = $("#source");
const thumb = $(".thumb");
const infoTitle = $(".info .title");
const infoArtist = $(".info .artist");

const currentTime = $(".current-time");
const duration = $(".duration");

const controls = $(".controls");
const playBtn = $(".play");
const backwardBtn = $(".backward");
const forwardBtn = $(".forward");
const volumeIcon = $(".volume .icon");
const volumeBar = $(".volume-bar");
const volumeProgress = $(".volume-progress");
const volumeBg = $(".volume-bg");
const volumeFg = $(".volume-fg");

window.addEventListener("load", () => {
    source.setAttribute("src", dataMusic.url);

    thumb.children[0].src = dataMusic.image;
    infoTitle.textContent = dataMusic.title;
    infoArtist.textContent = dataMusic.author;

    vinylThumb.src = dataMusic.image;

    dataMusic.lyrics.forEach((lyric) => {
        const lyricEl = lyric.words
            .map((word) => {
                return word.data;
            })
            .join(" ");

        lyricContent.innerHTML += `<p class="lyric-text active">${lyricEl}</p>`;
    });

    audio.load();
});

const handleDrag = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const percentage = (clientX - left) / width;
    const localPercentage = Math.min(1, Math.max(0, percentage));
    const time = audio.duration * localPercentage;
    const leftOffset = Math.min(Math.max(0, clientX - left), width);

    if (percentage < 0 || percentage > 1) return;

    if (localPercentage < 0.01) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = audio.duration * localPercentage;
    }

    if (leftOffset < 40) {
        hoverTime.style.left = `40px`;
    } else if (leftOffset > width - 40) {
        hoverTime.style.left = "auto";
        hoverTime.style.right = `0px`;
    } else {
        hoverTime.style.left = `${leftOffset}px`;
        hoverTime.style.right = "auto";
    }

    hoverTime.textContent = formatTime(time);
    hoverTime.style.opacity = 1;

    progressFg.style.transform = `scale(1)`;
    progress.style.width = `${percentage * 100}%`;

    content.style.pointerEvents = "none";
    controls.style.pointerEvents = "none";
};

const handleHover = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const percentage = (clientX - left) / width;
    const time = audio.duration * percentage;
    const leftOffset = Math.min(Math.max(0, clientX - left), width);

    if (percentage < 0 || percentage > 1) return;

    if (leftOffset < 40) {
        hoverTime.style.left = `40px`;
    } else if (leftOffset > width - 40) {
        hoverTime.style.left = "auto";
        hoverTime.style.right = `0px`;
    } else {
        hoverTime.style.left = `${leftOffset}px`;
        hoverTime.style.right = "auto";
    }

    hoverTime.textContent = formatTime(time);
    hoverTime.style.opacity = 1;

    progressFg.style.transform = `scale(1)`;
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
};

const handleNumber = (num) => {
    audio.currentTime = (audio.duration * num) / 10;
};

const updateProgress = () => {
    const { currentTime: current, duration: total } = audio;

    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);

    const percentage = (current / total) * 100;
    progress.style.width = `${percentage}%`;
};

const handleRotateVinyl = () => {
    vinyl.style.transform = `rotate(${audio.currentTime * 20}deg)`;
};

const handleRotateSpindle = () => {
    spindle.style.animation = "rotateSpindle 1s linear forwards";
};

const handlePlay = () => {
    if (audio.paused) {
        audio.play();
        playBtn.children[0].classList.replace("fa-play", "fa-pause");

        handleRotateSpindle();

        setTimeout(() => {
            setInterval(handleRotateVinyl, 1);
        }, 1200);
    } else {
        audio.pause();
        playBtn.children[0].classList.replace("fa-pause", "fa-play");
    }
};

const handleBackward = () => {
    audio.currentTime -= 10;
};

const handleForward = () => {
    audio.currentTime += 10;
};

const handleVolume = () => {
    if (audio.volume === 0) {
        audio.volume = 0.5;
        volumeIcon.children[0].classList.replace(
            "fa-volume-mute",
            "fa-volume-up",
        );
    } else {
        audio.volume = 0;
        volumeIcon.children[0].classList.replace(
            "fa-volume-up",
            "fa-volume-mute",
        );
    }
};

const handleVolumeDrag = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const percentage = (clientX - left) / width;
    const localPercentage = Math.min(1, Math.max(0, percentage));

    if (percentage < 0 || percentage > 1) return;

    audio.volume = localPercentage;

    volumeBg.style.width = `${percentage * 100}%`;

    progressBar.style.pointerEvents = "none";
};

// Event listener
// Audio
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", () => {
    playBtn.children[0].classList.replace("fa-pause", "fa-play");
});

// Controls
playBtn.addEventListener("click", handlePlay);
backwardBtn.addEventListener("click", handleBackward);
forwardBtn.addEventListener("click", handleForward);

// Volume
volumeIcon.addEventListener("click", handleVolume);
volumeBar.addEventListener("mousedown", handleVolumeDrag);
volumeFg.addEventListener("mousemove", (e) => e.stopPropagation());
volumeFg.addEventListener("mousedown", (e) => e.stopPropagation());
volumeBar.addEventListener("mousemove", (e) => {
    if (e.which === 1) {
        handleVolumeDrag(e);

        document.addEventListener("mouseup", () => {
            progressBar.style.pointerEvents = "auto";

            document.removeEventListener("mousemove", handleVolumeDrag);
        });

        document.addEventListener("mousemove", handleVolumeDrag);
    }
});
volumeBar.addEventListener("mouseleave", () => {
    progressBar.style.pointerEvents = "auto";
});

// Progress
progressBar.addEventListener("mousedown", handleDrag);
progressBar.addEventListener("mouseup", () => {
    content.style.pointerEvents = "auto";
    controls.style.pointerEvents = "auto";
    hoverTime.style.opacity = 0;
    progressFg.style.transform = `scale(0)`;
});
progressFg.addEventListener("mousedown", (e) => e.stopPropagation());

progressBar.addEventListener("mousemove", (e) => {
    if (e.which === 0) {
        handleHover(e);
    }

    if (e.which === 1) {
        handleDrag(e);

        document.addEventListener("mouseup", () => {
            content.style.pointerEvents = "auto";
            controls.style.pointerEvents = "auto";
            hoverTime.style.opacity = 0;
            progressFg.style.transform = `scale(0)`;

            document.removeEventListener("mousemove", handleDrag);
        });

        document.addEventListener("mousemove", handleDrag);
    }
});
progressFg.addEventListener("mousemove", (e) => e.stopPropagation());
progressBar.addEventListener("mouseleave", () => {
    hoverTime.style.opacity = 0;
    progressFg.style.transform = `scale(0)`;
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        handlePlay();
    }

    if (e.code === "ArrowLeft") {
        handleBackward();
    }

    if (e.code === "ArrowRight") {
        handleForward();
    }

    if (e.code.includes("Digit")) {
        handleNumber(Number(e.code.split("Digit")[1]));
    }

    if (e.code === "KeyM") {
        handleVolume();
    }

    if (e.code === "Home") {
        audio.currentTime = 0;
    }

    if (e.code === "End") {
        audio.currentTime = audio.duration;
    }
});
