const content = document.getElementById("content");
const filenameInput = document.getElementById("filename-input");
const newBtn = document.getElementById("new-btn");
const txtBtn = document.getElementById("txt-btn");
const pdfBtn = document.getElementById("pdf-btn");
const boldBtn = document.getElementById("bold-btn");
const underlineBtn = document.getElementById("underline-btn");
const italicBtn = document.getElementById("italic-btn");
const colorBtn = document.getElementById("color-btn");
const countText = document.querySelector(".count-text");

let isBold = false;
let isUnderline = false;
let isItalic = false;

content.addEventListener("input", () => {
    const text = content.innerText;
    const charCount = text.length;
    const wordCount = text.split(/\s+/).filter((word) => word).length;

    countText.children[0].textContent = `Số ký tự: ${charCount}`;
    countText.children[1].textContent = `Số từ: ${wordCount}`;
});

newBtn.addEventListener("click", () => {
    content.innerText = "";
    filenameInput.value = "untitled";

    countText.children[0].textContent = "Số ký tự: 0";
    countText.children[1].textContent = "Số từ: 0";
});

txtBtn.addEventListener("click", () => {
    const text = content.innerText;
    const filename = filenameInput.value;

    const blob = new Blob([text], {
        type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    a.click();
});

pdfBtn.addEventListener("click", () => {
    const content = document.getElementById("content");
    const filename = filenameInput.value;

    html2pdf(content, {
        filename: `${filename}.pdf`,
        html2canvas: {
            scale: 3,
        },
    });
});

boldBtn.addEventListener("click", () => {
    isBold = !isBold;
    content.style.fontWeight = isBold ? "bold" : "normal";
});

underlineBtn.addEventListener("click", () => {
    isUnderline = !isUnderline;
    content.style.textDecoration = isUnderline ? "underline" : "none";
});

italicBtn.addEventListener("click", () => {
    isItalic = !isItalic;
    content.style.fontStyle = isItalic ? "italic" : "normal";
});

colorBtn.addEventListener("input", () => {
    const color = colorBtn.value;
    content.style.color = color;
});
