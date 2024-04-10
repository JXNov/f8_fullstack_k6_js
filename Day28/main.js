const user = {
    email: "user@gmail.com",
    password: "123456",
};

const btnLogin = document.querySelector(".btn-login");
const overlay = document.querySelector(".overlay");
const content = document.querySelector(".content");
const btnSignin = document.querySelector(".btn-signin");
const btnSignup = document.querySelector(".btn-signup");
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const form = document.querySelectorAll("form");
const email = document.querySelectorAll(".email");
const password = document.querySelectorAll(".password");
const name = document.querySelector(".name");
const showPassword = document.querySelectorAll(".show-password");
const alertExist = document.querySelector(".alert-exist");

btnLogin.addEventListener("click", () => {
    overlay.classList.toggle("open");
    content.classList.toggle("open");
});

overlay.addEventListener("click", () => {
    overlay.classList.remove("open");
    content.classList.remove("open");
});

btnSignin.addEventListener("click", () => {
    btnSignin.classList.add("active");
    btnSignup.classList.remove("active");

    login.classList.remove("hide");
    signup.classList.add("hide");

    if (name.classList.contains("outline-error")) {
        name.classList.remove("outline-error");
        name.nextElementSibling.innerHTML = "";
    }

    email.forEach((item) => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
            item.nextElementSibling.innerHTML = "";
        }

        item.value = "";
    });

    password.forEach((item) => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
            item.parentElement.nextElementSibling.innerHTML = "";
        }

        item.value = "";
    });

    name.value = "";

    if (alertExist.classList.contains("hide")) {
        alertExist.classList.remove("hide");
    } else {
        alertExist.classList.add("hide");
    }
});

btnSignup.addEventListener("click", () => {
    btnSignup.classList.add("active");
    btnSignin.classList.remove("active");

    signup.classList.remove("hide");
    login.classList.add("hide");

    email.forEach((item) => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
            item.nextElementSibling.innerHTML = "";
        }
    });

    password.forEach((item) => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
            item.parentElement.nextElementSibling.innerHTML = "";
        }
    });

    name.value = "";

    if (name.classList.contains("outline-error")) {
        name.classList.remove("outline-error");
        name.nextElementSibling.innerHTML = "";
    }

    if (alertExist.classList.contains("hide")) {
        alertExist.classList.remove("hide");
    } else {
        alertExist.classList.add("hide");
    }
});

form.forEach((item) => {
    item.addEventListener("submit", (e) => {
        e.preventDefault();

        email.forEach((item) => {
            if (item.value === "") {
                item.classList.add("outline-error");
                item.nextElementSibling.innerHTML = "Vui lòng nhập email";
            }

            if (!item.value === "") {
                item.classList.remove("outline-error");
                item.nextElementSibling.innerHTML = "";
                console.log(item.value);
            }
        });

        password.forEach((item) => {
            if (item.value === "") {
                item.classList.add("outline-error");
                item.parentElement.nextElementSibling.innerHTML =
                    "Vui lòng nhập mật khẩu";
            }

            if (!item.value === "") {
                item.classList.remove("outline-error");
                item.parentElement.nextElementSibling.innerHTML = "";
            }
        });

        if (name.value === "") {
            name.classList.add("outline-error");
            name.nextElementSibling.innerHTML = "Vui lòng nhập họ tên";
        } else {
            name.classList.remove("outline-error");
            name.nextElementSibling.innerHTML = "";
        }

        if (email[0].value !== "" && password[0].value !== "") {
            if (
                email[0].value === user.email &&
                password[0].value === user.password
            ) {
                alert("Đăng nhập thành công!");
                alertExist.classList.add("hide");
                overlay.classList.remove("open");
                content.classList.remove("open");
            } else {
                alertExist.classList.remove("hide");
            }
        }
    });
});

showPassword.forEach((item) => {
    item.addEventListener("click", () => {
        const password = item.previousElementSibling;

        if (password.type === "password") {
            password.type = "text";
            item.innerHTML =
                '<img src="https://img.icons8.com/material-outlined/24/000000/invisible--v1.png" />';
        } else {
            password.type = "password";
            item.innerHTML =
                '<img src="https://img.icons8.com/material-outlined/24/000000/visible--v1.png" />';
        }
    });
});

email.forEach((item) => {
    item.addEventListener("keypress", () => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
        }
    });

    item.addEventListener("blur", () => {
        if (item.value === "") {
            item.classList.add("outline-error");
            item.nextElementSibling.innerHTML = "Vui lòng nhập email";
        }
    });

    item.addEventListener("input", () => {
        if (item.value !== "") {
            item.classList.remove("outline-error");
            item.nextElementSibling.innerHTML = "";
        }
    });
});

password.forEach((item) => {
    item.addEventListener("keypress", () => {
        if (item.classList.contains("outline-error")) {
            item.classList.remove("outline-error");
            item.parentElement.nextElementSibling.innerHTML = "";
        }
    });

    item.addEventListener("blur", () => {
        if (item.value === "") {
            item.classList.add("outline-error");
            item.parentElement.nextElementSibling.innerHTML =
                "Vui lòng nhập mật khẩu";
        }
    });
});

name.addEventListener("keypress", () => {
    if (name.classList.contains("outline-error")) {
        name.classList.remove("outline-error");
        name.nextElementSibling.innerHTML = "";
    }
});

name.addEventListener("blur", () => {
    if (name.value === "") {
        name.classList.add("outline-error");
        name.nextElementSibling.innerHTML = "Vui lòng nhập họ tên";
    }
});
