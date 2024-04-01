// Bài 1
function sum(...nums) {
    let sum = 0;
    for (let num of nums) {
        if (typeof num !== "number") {
            return "Invalid data";
        }
        sum += num;
    }
    return sum;
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(1, 2, "3", 4, 5)); // Invalid data

// Bài 2
Number.prototype.getCurrency = function (currency) {
    return this.toLocaleString() + " " + currency;
};

var price = 12000000;
console.log(price.getCurrency("đ")); // 12,000 đ

// Bài 3
var categories = [
    {
        id: 1,
        name: "Chuyên mục 1",
        parent: 0,
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        parent: 0,
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        parent: 0,
    },
    {
        id: 4,
        name: "Chuyên mục 2.1",
        parent: 2,
    },
    {
        id: 5,
        name: "Chuyên mục 2.2",
        parent: 2,
    },
    {
        id: 6,
        name: "Chuyên mục 2.3",
        parent: 2,
    },
    {
        id: 7,
        name: "Chuyên mục 3.1",
        parent: 3,
    },
    {
        id: 8,
        name: "Chuyên mục 3.2",
        parent: 3,
    },
    {
        id: 9,
        name: "Chuyên mục 3.3",
        parent: 3,
    },
    {
        id: 10,
        name: "Chuyên mục 2.2.1",
        parent: 5,
    },
    {
        id: 11,
        name: "Chuyên mục 2.2.2",
        parent: 5,
    },
    {
        id: 12,
        name: "Chuyên mục 2.2.2.1",
        parent: 11,
    },
    {
        id: 13,
        name: "Chuyên mục 4",
        parent: 0,
    },
];

// Cách 1
// function convertToNested(arr) {
//     let result = [];
//     let map = arr.reduce((acc, cur) => {
//         acc[cur.id] = cur;
//         return acc;
//     }, {});

//     for (let item of arr) {
//         if (item.parent === 0) {
//             result.push(item);
//             continue;
//         }

//         if (!map[item.parent].children) {
//             map[item.parent].children = [];
//         }
//         map[item.parent].children.push(item);
//     }

//     return result;
// }

// Cách 2
function convertToNested(arr, parent = 0) {
    return arr
        .filter((item) => item.parent === parent)
        .map((item) => {
            let children = convertToNested(arr, item.id);
            if (children.length > 0) {
                item.children = children;
            }
            return item;
        });
}

console.log(convertToNested(categories));

// Bài 4
Array.prototype.reduce2 = function (callback, initialValue) {
    let accumulator = initialValue || this[0];
    let startIndex = initialValue ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

let arr = [1, 2, 3, 4, 5];
let sum2 = arr.reduce2((acc, cur) => acc + cur, 0);
console.log(sum2); // 15
