const list = document.querySelector(".list");
const items = document.querySelectorAll(".list-item");

items.forEach((item) => {
    const span = document.createElement("span");
    item.insertBefore(span, item.firstChild);
});

const updateItem = () => {
    let unitIndex = 0;
    let moduleIndex = 0;
    items.forEach((item) => {
        const span = item.querySelector("span");
        if (!item.classList.contains("active")) {
            unitIndex++;
            span.innerText = `Bài ${unitIndex}: `;
        } else {
            moduleIndex++;
            span.innerText = `Module ${moduleIndex} : `;
        }
    });
};
updateItem();

items.forEach((item) => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", function () {
        setTimeout(() => {
            item.classList.add("dragging");
        }, 0);
    });
    item.addEventListener("dragend", function () {
        item.classList.remove("dragging");
    });
});

const sortableList = function (e) {
    e.preventDefault();
    const draggingItem = list.querySelector(".dragging");
    const siblings = [...list.querySelectorAll(".list-item")];
    let nextSibling = null;

    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        const rect = sibling.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;

        if (offsetY > sibling.offsetHeight / 2) {
            nextSibling = sibling.nextElementSibling;
        } else {
            nextSibling = sibling;
            break;
        }
    }

    if (!nextSibling) {
        list.appendChild(draggingItem);
    } else {
        list.insertBefore(draggingItem, nextSibling);
    }
};

function autoUpdateNumber() {
    const spanEl = document.querySelectorAll(".list-item:not(.active) span");
    spanEl.forEach((span, index) => (span.innerText = `Bài ${index + 1}: `));

    const spanModule = document.querySelectorAll(".list-item.active span");
    spanModule.forEach(
        (span, index) => (span.innerText = `Module ${index + 1}: `),
    );
}

list.addEventListener("dragover", sortableList);
list.addEventListener("dragend", function (e) {
    e.preventDefault();
    autoUpdateNumber();
});
