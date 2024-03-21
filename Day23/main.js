// Bài 1
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
var arrC = arrA.filter((item) => arrB.includes(item));
console.log(arrC);

// Bài 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

function flatArray(arr) {
    if (arr.length === 0) return [];

    if (Array.isArray(arr[0])) {
        return flatArray(arr[0]).concat(flatArray(arr.slice(1)));
    }

    return [arr[0]].concat(flatArray(arr.slice(1)));
}

console.log(flatArray(arr));

// Bài 3
var arr = [
    ["a", 1, true, 4, 5, 454234, "343"],
    ["b", 2, false, "c", true, undefined, null, true],
];

function splitArrayTypeOf(arr) {
    let result = [];

    arr.forEach((item) => {
        item.forEach((subItem) => {
            // if (typeof subItem === "string") {
            //     if (result[0] === undefined) result[0] = [];
            //     result[0].push(subItem);
            // } else if (typeof subItem === "number") {
            //     if (result[1] === undefined) result[1] = [];
            //     result[1].push(subItem);
            // } else if (typeof subItem === "boolean") {
            //     if (result[2] === undefined) result[2] = [];
            //     result[2].push(subItem);
            // } else {
            //     if (result[3] === undefined) result[3] = [];
            //     result[3].push(subItem);
            // }

            if (result[typeof subItem] === undefined)
                result[typeof subItem] = [];
            result[typeof subItem].push(subItem);
        });
    });

    return result;
}

console.log(splitArrayTypeOf(arr));

// Bài 4
var data = [
    [
        "Tiêu đề bài viết 1",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, sunt incidunt, doloremque fuga libero beatae omnis minima reprehenderit ut quis, saepe suscipit quos dolores autem aperiam dicta quidem similique quas necessitatibus natus? Mollitia commodi dolores sit aut porro molestias quae, beatae, fuga, sint assumenda repudiandae? Officiis nisi tempora dicta totam?",
        "https://picsum.photos/400/200",
    ],
    [
        "Tiêu đề bài viết 2",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, sunt incidunt, doloremque fuga libero beatae omnis minima reprehenderit ut quis, saepe suscipit quos dolores autem aperiam dicta quidem similique quas necessitatibus natus? Mollitia commodi dolores sit aut porro molestias quae, beatae, fuga, sint assumenda repudiandae? Officiis nisi tempora dicta totam?",
        "https://picsum.photos/400/200",
    ],
    [
        "Tiêu đề bài viết 3",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, sunt incidunt, doloremque fuga libero beatae omnis minima reprehenderit ut quis, saepe suscipit quos dolores autem aperiam dicta quidem similique quas necessitatibus natus? Mollitia commodi dolores sit aut porro molestias quae, beatae, fuga, sint assumenda repudiandae? Officiis nisi tempora dicta totam?",
        "https://picsum.photos/400/200",
    ],
];

var html = "";

data.forEach((item) => {
    html += `
        <div class="posts">
            <img src="${item[2]}" alt="">

            <div class="text">
                <h2>${item[0]}</h2>
                <p>${item[1]}</p>
            </div>
        </div>
    `;
});

document.body.innerHTML = html;
