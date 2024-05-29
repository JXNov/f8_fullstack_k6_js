document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const loading = document.getElementById("loading");
    let page = 1;
    let isLoading = false;

    const loadMoreContent = async () => {
        if (isLoading) return;
        isLoading = true;
        loading.classList.remove("hidden");

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`,
            );
            const posts = await response.json();

            posts.forEach((post) => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                content.appendChild(postElement);
            });

            page += 1;

            if (posts.length === 0) {
                window.removeEventListener("scroll", handleScroll);

                const endMessage = document.createElement("div");
                endMessage.classList.add("end-message");
                endMessage.innerHTML = "You have reached the end!";
                endMessage.style.textAlign = "center";
                content.appendChild(endMessage);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            isLoading = false;
            loading.classList.add("hidden");
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500
        ) {
            loadMoreContent();
        }
    };

    window.addEventListener("scroll", handleScroll);

    loadMoreContent();
});
