// Bài 1
function sum(...numbers) {
    let sum = 0;
    for (let number of numbers) {
        if (typeof number !== "number") {
            return "Error";
        }
        sum += number;
    }
    return sum;
}

console.log(sum(1, 2, 3, 4, 5));
console.log(sum(1, 2, "3", 4, 5));

// Bài 2
Object.prototype.getCurrency = function (unit) {
    let price = parseInt(this);
    return price.toLocaleString() + " " + unit;
};

var price = 12000;
console.log(price.getCurrency("đ"));

var price = "12000000";
console.log(price.getCurrency("đ"));

// Bài 3
Array.prototype.push2 = function (element) {
    this[this.length] = element;
    return this.length;
};

let arr = [1, 2, 3];
console.log(arr.push2(4));
console.log(arr);

// Bài 4
Array.prototype.filter2 = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};

let arr2 = [1, 2, 3, 4, 5];
console.log(arr2.filter2((element) => element % 2 === 0));

// Bài 5
var categories = [
    {
        id: 1,
        name: "Chuyên mục 1",
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        children: [
            {
                id: 4,
                name: "Chuyên mục 2.1",
            },
            {
                id: 5,
                name: "Chuyên mục 2.2",
                children: [
                    {
                        id: 10,
                        name: "Chuyên mục 2.2.1",
                    },
                    {
                        id: 11,
                        name: "Chuyên mục 2.2.2",
                    },
                    {
                        id: 12,
                        name: "Chuyên mục 2.2.3",
                        children: [
                            {
                                id: 13,
                                name: "Chuyên mục 2.2.3.1",
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                name: "Chuyên mục 2.3",
            },
        ],
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        children: [
            {
                id: 7,
                name: "Chuyên mục 3.1",
            },
            {
                id: 8,
                name: "Chuyên mục 3.2",
            },
            {
                id: 9,
                name: "Chuyên mục 3.3",
            },
        ],
    },
];

function getCategories(categories) {
    let result = "";

    function getChildren(children, level) {
        children.forEach((child) => {
            result += `<option value="${child.id}">${"--|".repeat(level)}${
                child.name
            }</option>`;

            if (child.children) {
                getChildren(child.children, level + 1);
            }
        });
    }

    categories.forEach((category) => {
        result += `<option value="${category.id}">${category.name}</option>`;

        if (category.children) {
            getChildren(category.children, 1);
        }
    });

    return result;
}

document.body.innerHTML = `<select>${getCategories(categories)}</select>`;
