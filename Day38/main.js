const btnVoice = document.getElementById("btn-voice");

btnVoice.addEventListener("click", () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.trim().toLowerCase();

        if (text === "google") {
            window.open("https://www.google.com", "_blank");
        } else if (text === "facebook") {
            window.open("https://www.facebook.com", "_blank");
        } else if (text === "youtube") {
            window.open("https://www.youtube.com", "_blank");
        } else if (text === "google drive") {
            window.open("https://drive.google.com", "_blank");
        } else if (text === "google maps" || text === "bản đồ") {
            window.open("https://www.google.com/maps", "_blank");
        } else if (text.includes("chỉ đường") || text.includes("tới")) {
            const address = text
                .replace("chỉ đường", "")
                .replace("tới", "")
                .trim();
            window.open(
                `https://www.google.com/maps/search/${address}`,
                "_blank",
            );
        } else if (text.includes("bài hát") || text.includes("nghe")) {
            const song = text.replace("bài hát", "").replace("nghe", "").trim();
            window.open(
                `https://zingmp3.vn/tim-kiem/bai-hat.html?q=${song}`,
                "_blank",
            );
        } else if (text.includes("video") || text.includes("xem")) {
            const video = text.replace("video", "").replace("xem", "").trim();
            window.open(
                `https://www.youtube.com/results?search_query=${video}`,
                "_blank",
            );
        } else {
            alert("Không thực hiện được yêu cầu");
        }
    };
});
