let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa animi eveniet temporibus voluptatem tenetur atque repellendus eum, culpa voluptatibus cumque rem doloribus, ex sed dicta officiis perferendis id ratione minus sit! Voluptates veritatis totam deserunt laborum praesentium ipsa ab magnam.`;

content = content.replaceAll(" ", "</span> <span>");
content = `<span>${content}</span>`;

document.body.innerHTML = content;

let spans = document.querySelectorAll("span");

let i = 0;
let interval = setInterval(() => {
    if (i === spans.length) {
        i = 0;
    }

    for (let j = 0; j < spans.length; j++) {
        if (i === j) {
            spans[j].style.color = "red";
        } else {
            spans[j].style.color = "unset";
        }
    }

    i++;
}, 300);
