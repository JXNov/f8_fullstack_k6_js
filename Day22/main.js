// Bài 01
function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];
    let indexMin = 0;
    let indexMax = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            indexMin = i;
        }

        if (arr[i] > max) {
            max = arr[i];
            indexMax = i;
        }
    }

    return `Min: ${min} at index ${indexMin}, Max: ${max} at index ${indexMax}`;
}

console.log(findMinMax([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// Bài 02
function averagePrime(arr) {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 2) {
            continue;
        }

        let isPrime = true;
        for (let j = 2; j < arr[i]; j++) {
            if (arr[i] % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            sum += arr[i];
            count++;
        }
    }

    if (count === 0) {
        return "Không có số nguyên tố";
    }

    return sum / count;
}

console.log(averagePrime([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// Bài 03
function removeDuplicate(arr) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;

        for (let j = 0; j < newArr.length; j++) {
            if (arr[i] === newArr[j]) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            newArr[newArr.length] = arr[i];
        }
    }

    return newArr;
}

console.log(removeDuplicate([1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5]));

// Bài 04
function sortNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

function insertNumber(arr, element) {
    arr[arr.length] = element;

    return sortNumber(arr);
}

console.log(insertNumber([5, 1, 9, 8, 10], 11));
