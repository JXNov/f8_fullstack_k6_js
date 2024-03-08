// Bài 1: Tính tiền taxi
function tinhTienTaxi(km) {
    if (km <= 1) {
        return 15000;
    } else if (km <= 5) {
        return 13500;
    } else {
        return 11000;
    }
}

function tinhTienTaxi2(km) {
    let tien = tinhTienTaxi(km);

    if (km > 120) {
        return tien * 0.9;
    } else {
        return tien;
    }
}

console.log(tinhTienTaxi2(121));

// Bài 2: Tính tiền điện
function tinhTienDien(soDien) {
    if (soDien <= 50) {
        return soDien * 1678;
    } else if (soDien <= 100) {
        return 50 * 1678 + (soDien - 50) * 1734;
    } else if (soDien <= 200) {
        return 50 * 1678 + 50 * 1734 + (soDien - 100) * 2014;
    } else if (soDien <= 300) {
        return 50 * 1678 + 50 * 1734 + 100 * 2014 + (soDien - 200) * 2536;
    } else if (soDien <= 400) {
        return (
            50 * 1678 +
            50 * 1734 +
            100 * 2014 +
            100 * 2536 +
            (soDien - 300) * 2834
        );
    } else {
        return (
            50 * 1678 +
            50 * 1734 +
            100 * 2014 +
            100 * 2536 +
            100 * 2834 +
            (soDien - 400) * 2927
        );
    }
}

console.log(tinhTienDien(500));

// Bài 3: Tính giá trị biểu thức
function tinhGiaTriBieuThuc(n) {
    n = +n;

    let s = 0;

    for (let i = 1; i <= n; i++) {
        s += i * (i + 1);
    }

    return s;
}

console.log(tinhGiaTriBieuThuc(5));

// Bài 4: Viết hàm kiểm tra số nguyên tố
function kiemTraSoNguyenTo(n) {
    n = +n;

    if (n < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

console.log(kiemTraSoNguyenTo(7));

// Bài 5: Vẽ tam giác số
function veTamGiacSo(n) {
    let s = "";
    let count = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            s += count + " ";
            count++;
        }
        s += "\n";
    }

    return s;
}

console.log(veTamGiacSo(5));

// Bài 6: Vẽ bàn cờ vua

function veBanCoVua() {
    // let s = "";

    // for (let i = 1; i <= 8; i++) {
    //     for (let j = 1; j <= 8; j++) {
    //         s += (i + j) % 2 === 0 ? " # " : " * ";
    //     }
    //     s += "\n";
    // }

    // return s;

    var square = "";

    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            if ((i + j) % 2 === 0) {
                square += `<div style='display: inline-block; width: 50px; height: 50px; background-color: black;'></div>`;
            } else {
                square += `<div style='display: inline-block; width: 50px; height: 50px; background-color: white;'></div>`;
            }
        }
        square += "<br>";
    }

    document.write(square);
}

veBanCoVua();
// console.log(veBanCoVua());

// Bài 7: Vẽ bảng cửu chương

function veBangCuuChuong() {
    let s = "";

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            s += `${i} * ${j} = ${i * j} \n`;
        }
        s += "\n";
    }

    return s;
}

console.log(veBangCuuChuong());

// Bài 8: Tính giá trị biểu thức không dùng vòng lặp

function tinhGiaTriBieuThuc2(n) {
    return n === 1 ? 1 : 1 / n + tinhGiaTriBieuThuc2(n - 1);
}

console.log(tinhGiaTriBieuThuc2(6));
