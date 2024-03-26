// Bài 1:
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

function isSymmetric(n) {
    return n == parseInt(n.toString().split("").reverse().join(""));
}

function nextPrimeSymmetric(n) {
    while (true) {
        n++;
        if (isPrime(n) && isSymmetric(n)) return n;
    }
}

console.log(nextPrimeSymmetric(6));
console.log(nextPrimeSymmetric(8));
console.log(nextPrimeSymmetric(13));

// Bài 2:
function findMedianSortedArrays(nums1, nums2) {
    let nums = nums1.concat(nums2).sort((a, b) => a - b);
    let n = nums.length;
    if (n % 2 == 0) return (nums[n / 2 - 1] + nums[n / 2]) / 2;
    else return nums[Math.floor(n / 2)];
}

console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
console.log(findMedianSortedArrays([1, 2], [3, 7]));
console.log(findMedianSortedArrays([1, 2], [3, 7, 8]));
console.log(findMedianSortedArrays([1, 2, 3], [4, 5, 6]));

// Bài 3:
function firstMissingPositive(nums) {
    let n = nums.length;

    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] != i + 1) return i + 1;
    }

    return n + 1;
}

console.log(firstMissingPositive([1, 2, 0]));
console.log(firstMissingPositive([3, 4, -1, 1]));
console.log(firstMissingPositive([7, 8, 9, 11, 12]));
console.log(firstMissingPositive([1, 2, 3, 5, 6, 7, 10]));
