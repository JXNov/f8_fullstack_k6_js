import { config } from "./config.js";
const { SERVER_API } = config;

const listGroupUncompleted = document.querySelector(".list-group-uncompleted");
const listGroupCompleted = document.querySelector(".list-group-completed");
const completedTodos = document.querySelector(".completed-todos");

const addTodoForm = document.querySelector(".add-todo-form");
const modalAdd = new bootstrap.Modal(document.getElementById("addTodoModal"));

const editTodoForm = document.querySelector(".edit-todo-form");
const modalEdit = new bootstrap.Modal(document.getElementById("editTodoModal"));

const render = (todos) => {
    todos.forEach((todo) => {
        const { id, title, completed } = todo;

        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center shadow p-3 mb-2 bg-body-tertiary rounded";
        li.dataset.id = id;
        li.dataset.completed = completed;

        li.innerHTML = `${title}
            <div>
                <button class="btn btn-danger btn-sm" data-type="delete">
                    <i class="fas fa-trash"></i>
                </button>
                
                <button class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#editTodoModal"
                        data-type="edit">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn btn-secondary btn-sm" data-type="completed">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        `;

        if (completed) {
            listGroupCompleted.append(li);
            li.children[0].children[2].classList.remove("btn-secondary");
            li.children[0].children[2].classList.add("btn-success");
        } else {
            listGroupUncompleted.append(li);
        }
    });

    const quantity = completedTodos.nextElementSibling.children.length;

    completedTodos.children[0].children[0].innerHTML = `${quantity}`;
};

completedTodos.addEventListener("click", () => {
    listGroupCompleted.classList.toggle("d-none");

    const iconArrow = completedTodos.children[0].children[1];

    if (listGroupCompleted.classList.contains("d-none")) {
        completedTodos.children[0].classList.remove("btn-success");
        completedTodos.children[0].classList.add("btn-secondary");

        iconArrow.style = "transform: rotate(0deg)";
        iconArrow.style.transition = "0.5s";
    } else {
        completedTodos.children[0].classList.remove("btn-secondary");
        completedTodos.children[0].classList.add("btn-success");

        iconArrow.style = "transform: rotate(90deg)";
        iconArrow.style.transition = "0.5s";
    }
});

const query = {};

const fetchTodos = async (keyword) => {
    if (keyword) {
        query.q = keyword;
    }

    const params = new URLSearchParams(query).toString();

    try {
        const response = await fetch(`${SERVER_API}/todos?${params}`);
        const todos = await response.json();

        render(todos);
    } catch (e) {
        console.log(error);
    }
};

fetchTodos();

const addTodo = async (title) => {
    const response = await fetch(`${SERVER_API}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }),
    });

    const todo = await response.json();

    addTodoForm.reset();
    render([todo]);
};

const renderEditTodo = ({ id, title }) => {
    editTodoForm.dataset.id = id;
    editTodoForm.title.value = title;
};

const editTodo = async (id) => {
    try {
        const response = await fetch(`${SERVER_API}/todos/${id}`);
        const todo = await response.json();

        renderEditTodo(todo);
    } catch (e) {
        console.log(error);
    }
};

const updateTodo = async (id, title) => {
    await fetch(`${SERVER_API}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    const todo = document.querySelector(`[data-id="${id}"]`);

    todo.innerHTML = `${title}
        <div>
            <button class="btn btn-danger btn-sm" data-type="delete">
                <i class="fas fa-trash"></i>
            </button>
            
            <button class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#editTodoModal"
                    data-type="edit">
                <i class="fas fa-edit"></i>
            </button>

            <button class="btn btn-secondary btn-sm" data-type="completed">
                <i class="fas fa-check"></i>
            </button>
        </div>
    `;
};

const completedTodo = async (id, completed) => {
    await fetch(`${SERVER_API}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
    });

    const todo = document.querySelector(`[data-id="${id}"]`);

    if (completed) {
        listGroupUncompleted.append(todo);
        todo.dataset.completed = false;
        todo.children[0].children[2].classList.remove("btn-success");
        todo.children[0].children[2].classList.add("btn-secondary");
    } else {
        listGroupCompleted.append(todo);
        todo.dataset.completed = true;
        todo.children[0].children[2].classList.remove("btn-secondary");
        todo.children[0].children[2].classList.add("btn-success");
    }

    const quantity = completedTodos.nextElementSibling.children.length;

    completedTodos.children[0].children[0].innerHTML = `${quantity}`;
};

const removeTodo = async (id) => {
    await fetch(`${SERVER_API}/todos/${id}`, {
        method: "DELETE",
    });

    document.querySelector(`[data-id="${id}"]`).remove();

    const quantity = completedTodos.nextElementSibling.children.length;

    completedTodos.children[0].children[0].innerHTML = `${quantity}`;
};

addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = addTodoForm.title.value;

    if (title) {
        addTodo(title);

        modalAdd.hide();
    }
});

document.querySelectorAll(".list-group").forEach((listGroup) => {
    listGroup.addEventListener("click", (e) => {
        const button = e.target.closest("button");

        if (button) {
            const id = button.closest("li").dataset.id;
            const completed = button.closest("li").dataset.completed === "true";

            if (button.dataset.type === "edit") {
                console.log(id);
                editTodo(id);
            }

            if (button.dataset.type === "completed") {
                completedTodo(id, completed);
            }

            if (button.dataset.type === "delete") {
                removeTodo(id);
            }
        }
    });
});

editTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = editTodoForm.dataset.id;
    const title = editTodoForm.title.value;

    if (title) {
        updateTodo(id, title);

        modalEdit.hide();
    }
});

const debounce = (fn, delay) => {
    let timeoutId;

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const debounceFetchTodos = debounce((keyword) => {
    listGroupCompleted.classList.remove("d-none");

    fetchTodos(keyword);
}, 300);

document.querySelector(".search-todo").addEventListener("input", (e) => {
    const keyword = e.target.value.trim();

    listGroupCompleted.innerHTML = "";
    listGroupUncompleted.innerHTML = "";

    debounceFetchTodos(keyword);
});
