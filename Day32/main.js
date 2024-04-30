const data = [
    {
        id: 1,
        name: "Sản phẩm 1",
        price: 1000,
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        price: 2000,
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        price: 3000,
    },
    {
        id: 4,
        name: "Sản phẩm 4",
        price: 4000,
    },
];

const products = document.querySelector("#products tbody");
products.innerHTML = data
    .map(
        (product, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td class="action">
            <div class="quantity">
                <span class="decrease">-</span>
                <input type="number" value="1" min="1" />
                <span class="increase">+</span>
            </div>
            <button class="add-to-cart">Thêm vào giỏ hàng</button>
        </td>
    </tr>
`,
    )
    .join("");

const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];

const cart = document.querySelector("#cart");
if (localStorageCart.length > 0) {
    cart.innerHTML = `
    <h2>Giỏ hàng</h2>

    <table border="1" cellspacing="0" cellpadding="10">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
            </tr>
        </thead>

        <tbody>
            ${localStorageCart
                .map(
                    (product, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td class="action">
                        <div class="quantity">
                            <span class="decrease">-</span>
                            <input type="number" value="${
                                product.quantity
                            }" min="1" />
                            <span class="increase">+</span>
                        </div>
                    </td>
                    <td>${product.price * product.quantity}</td>
                    <td>
                        <button class="remove-from-cart">Xóa</button>
                    </td>
                </tr>
            `,
                )
                .join("")}

                <tr>
                    <td colspan="3">Tổng</td>
                    <td>${localStorageCart.reduce(
                        (total, product) => total + product.quantity,
                        0,
                    )}</td>
                    <td colspan="2">${localStorageCart.reduce(
                        (total, product) =>
                            total + product.price * product.quantity,
                        0,
                    )}</td>
                </tr>
        </tbody>
    </table>

    <div class="cart-action">
        <button class="update-cart">Cập nhật giỏ hàng</button>
        <button class="clear-cart">Xóa giỏ hàng</button>
    </div>
`;
} else {
    cart.innerHTML = `
    <h2>Giỏ hàng</h2>

    <p>Không có sản phẩm nào trong giỏ hàng</p>
    `;
}

const decreaseButtons = document.querySelectorAll(".decrease");
const increaseButtons = document.querySelectorAll(".increase");

decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.nextElementSibling;
        if (input.value > 1) {
            input.value = Number(input.value) - 1;
        }
    });
});

increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.previousElementSibling;
        input.value = Number(input.value) + 1;
    });
});

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = data[index];
        const quantity = Number(
            button.previousElementSibling.querySelector("input").value,
        );

        const productIndex = localStorageCart.findIndex(
            (item) => item.id === product.id,
        );

        if (productIndex === -1) {
            localStorageCart.push({
                ...product,
                quantity,
            });
        } else {
            localStorageCart[productIndex].quantity += quantity;
        }

        localStorage.setItem("cart", JSON.stringify(localStorageCart));
        location.reload();
    });
});

const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");

removeFromCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        localStorageCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
        location.reload();
    });
});

const updateCartButton = document.querySelector(".update-cart");
updateCartButton.addEventListener("click", () => {
    const quantityInputs = document.querySelectorAll(
        "#cart input[type='number']",
    );

    quantityInputs.forEach((input, index) => {
        localStorageCart[index].quantity = Number(input.value);
    });

    localStorage.setItem("cart", JSON.stringify(localStorageCart));
    location.reload();
});

const clearCartButton = document.querySelector(".clear-cart");
clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
});
