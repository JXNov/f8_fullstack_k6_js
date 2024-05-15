const counter = document.querySelector(".counter");
const btn = document.querySelector(".btn");

let count = 30;

counter.textContent = count;

function mySetInterval(callback, time) {
    let start = Date.now();
    let id = null;

    function loop() {
        if (Date.now() - start >= time) {
            callback();
            start = Date.now();
        }
    }

    function animate() {
        id = requestAnimationFrame(animate);
        loop();
    }

    animate();

    return {
        clear: function () {
            cancelAnimationFrame(id);
        },
    };
}

let timer = mySetInterval(() => {
    count--;

    if (count < 0) {
        btn.disabled = false;
        btn.addEventListener("click", () => {
            window.location.href = "https://fullstack.edu.vn";
        });

        timer.clear();
    } else {
        counter.textContent = count;
    }
}, 1000);

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        timer.clear();
    } else if (document.visibilityState === "visible") {
        timer = mySetInterval(() => {
            count--;

            if (count < 0) {
                btn.disabled = false;
                btn.addEventListener("click", () => {
                    window.location.href = "https://fullstack.edu.vn";
                });

                timer.clear();
            } else {
                counter.textContent = count;
            }
        }, 1000);
    }
});
