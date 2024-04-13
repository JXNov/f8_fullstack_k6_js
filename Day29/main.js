const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoText = document.querySelector(".todo-text");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", editCheck);
todoList.addEventListener("click", doneTask);

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value.trim() === "") {
        alert("Please enter a valid task");
        return;
    }

    todoList.innerHTML += `
        <li class="todo-item">
            <span class="todo-text">${todoInput.value}</span>

            <span>
                <button class="edit-button"></button>
                 <button class="delete-button"></button>
            </span>
        </li>
    `;

    todoInput.value = "";
}

function editCheck(e) {
    const item = e.target;

    if (item.classList[0] === "edit-button") {
        const todo = item.parentElement.parentElement;
        const todoText = todo.querySelector("span");

        const newText = `
            <form class="todo-item__form">
                <input
                    type="text"
                    class="todo-item__input"
                    value="${todoText.innerText}"
                />

                <button class="todo-item__button">Add Task</button>
            </form>
        `;

        todo.outerHTML = newText;

        const todoItemForm = document.querySelector(".todo-item__form");
        const todoItemInput = document.querySelector(".todo-item__input");
        const todoItemButton = document.querySelector(".todo-item__button");

        todoItemButton.addEventListener("click", function (e) {
            e.preventDefault();

            if (todoItemInput.value.trim() === "") {
                alert("Please enter a valid task");
                return;
            }

            const done = todoText.classList.contains("done") ? "done" : "";

            const newTodo = `
                <li class="todo-item">
                    <span class="todo-text ${done}">${todoItemInput.value}</span>

                    <span>
                        <button class="edit-button"></button>
                        <button class="delete-button"></button>
                    </span>
                </li>
            `;

            todoItemForm.outerHTML = newTodo;
        });
    }
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement.parentElement;
        todo.remove();
    }
}

function doneTask(e) {
    const item = e.target;

    if (item.classList[0] === "todo-text") {
        item.classList.toggle("done");
    }
}
