// Bài 1: Hoán vị 2 số
function swap(num1, num2) {
    console.log(`Number 1 Trước khi hoán vị: ${num1}`);
    console.log(`Number 2 Trước khi hoán vị: ${num2}`);

    num1 = num1 + num2;
    num2 = num1 - num2;
    num1 = num1 - num2;

    console.log(`Number 1 Sau khi hoán vị: ${num1}`);
    console.log(`Number 2 Sau khi hoán vị: ${num2}`);
}

swap(10, 20);

// Bài 2: Thực hiện phép toán
function calculate(a, b, c) {
    var result = a + b + Math.pow(c, 10) / 2;

    console.log(`Kết quả của phép toán: ${result}`);
}

calculate(10, 20, 5);

// Bài 3: Tìm số lớn nhất
function findMax(num1, num2, num3) {
    var max = num1;

    if (max < num2) {
        max = num2;
    }

    if (max < num3) {
        max = num3;
    }

    console.log(`Số lớn nhất là: ${max}`);
}

findMax(10, 20, 5);

// Bài 4: Kiểm tra số cùng dấu
function checkSameSign(num1, num2) {
    if ((num1 > 0 && num2 > 0) || (num1 < 0 && num2 < 0)) {
        console.log(`Hai số ${num1} và ${num2} cùng dấu`);
    } else {
        console.log(`Hai số ${num1} và ${num2} khác dấu`);
    }
}

checkSameSign(10, -20);

// Bài 5: Sắp xếp 3 số
function sortNumber(num1, num2, num3) {
    if (num1 > num2) {
        var temp = num1;
        num1 = num2;
        num2 = temp;
    }

    if (num1 > num3) {
        var temp = num1;
        num1 = num3;
        num3 = temp;
    }

    if (num2 > num3) {
        var temp = num2;
        num2 = num3;
        num3 = temp;
    }

    console.log(`Các số đã được sắp xếp: ${num1}, ${num2}, ${num3}`);
}

sortNumber(10, 20, 5);
