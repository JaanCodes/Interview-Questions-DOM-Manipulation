const input = document.querySelector(".input");
const addBtn = document.querySelector(".todo__add");
const list = document.querySelector(".list");

let newTask = "";
let todoList = [];

function onInputChange(event) {
  newTask = event.target.value;
}

function addTodo() {
  if (!newTask) {
    return;
  }
  const task = { id: todoList.length, task: newTask };
  todoList.push(task);
  renderTodos();
  input.value = "";
  newTask = "";
}

function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id !== id);
  renderTodos();
}

function renderTodos() {
  list.innerHTML = todoList
    .map(
      (elem) =>
        `<li>
          ${elem.task}
          <button class="todo__delete" onclick="deleteTodo(${elem.id})">x</button>
        </li>`
    )
    .join("");
}
