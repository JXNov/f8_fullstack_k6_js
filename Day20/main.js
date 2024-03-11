// Bài 1: N số fibonaci
function fibonaci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonaci(n - 1) + fibonaci(n - 2);
}

console.log(fibonaci(13));

// Bài 2: Đảo ngược số
function reverseNumber(n) {
    let reverse = 0;
    while (n > 0) {
        reverse = reverse * 10 + (n % 10);
        n = Math.floor(n / 10);
    }
    return reverse;
}

console.log(reverseNumber(12345));

// Bài 3: Viết hàm chuyển số thành chữ
function numberToText(n) {
    if (n < 0 || n > 9999) return "Số cần chuyển đổi có giá trị từ 0 đến 9999";

    let number = n.toString();
    let result = "";
    let numberText = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín",
    ];
    let numberUnit = ["", "mươi", "trăm", "nghìn"];
    for (let i = 0; i < number.length; i++) {
        if (number[i] !== "0") {
            result += `${numberText[number[i]]} ${
                numberUnit[number.length - i - 1]
            } `;
        }
    }

    return result;
}

console.log(numberToText(9999));
