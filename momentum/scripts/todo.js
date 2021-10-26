const toggleTodoBtn = document.querySelector('.js-todo-toggle');
const todoWidget = document.querySelector('.js-todo');
const todoInput = document.querySelector('.js-todo-btn-add-new');
const todoList = document.querySelector('.js-todo-list');

let todos;
!localStorage.todos ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'));

let todoIsOpen = 'false';
!localStorage.todoIsOpen ? todoIsOpen = 'false' : todoIsOpen = JSON.parse(localStorage.getItem('todoIsOpen'));

let todoItemItems = [];

function Todo(title) {
  this.title = title;
  this.completed = false;
}

const createTodoTemplate = (todo, index) => {
  return `
    <li class="todo__item ${todo.completed ? 'done' : ''} js-todo-item">
      <label class="todo__label" for="">
        <input onclick="completeTodo(${index})" class="todo__checkbox js-todo-item-checkbox" type="checkbox" ${todo.completed ? 'checked' : ''}>
      </label>
      <span class="todo__title">${todo.title}<span class="js-btn-edit-todo" title="edit a todo"></span><span onclick="deleteTodo(${index})" class="icono-trash js-btn-delete-todo" title="delete a todo"></span></span>
    </li>
  `;
};

const createTodoList = () => {
  todoList.innerHTML = '';
  if (todos.length > 0) {
    todos.forEach((item, index) => {
      todoList.innerHTML += createTodoTemplate(item, index);
    });
    todoItemItems = document.querySelectorAll('.js-todo-item');
  }
};

createTodoList();

const setLocalStorageTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const setLocalStorageTodoIsOpen = () => {
  localStorage.setItem('todoIsOpen', JSON.stringify(todoIsOpen));
}

const openTodolist = () => {
  if (todoIsOpen === 'true') {
    todoWidget.classList.add('active');
    toggleTodoBtn.classList.add('active');
  }
}

openTodolist();

const completeTodo = (index) => {
  todos[index].completed = !todos[index].completed;

  if (todos[index].completed) {
    todoItemItems[index].classList.add('done');
  }
  else {
    todoItemItems[index].classList.remove('done');
  }
  setLocalStorageTodo();
  createTodoList();
};

const deleteTodo = index => {
  todoItemItems[index].classList.add('deleting');
  setTimeout(() => {
    todos.splice(index, 1);
    setLocalStorageTodo();
    createTodoList();
  }, 500);
};

todoInput.addEventListener('keypress', (event) => {
  if ((event.which === 13) && (todoInput.value !== '')) {
    todos.push(new Todo(todoInput.value));
    setLocalStorageTodo();
    createTodoList();
    todoInput.value = '';
  }
});

function toggleTodo() {
  if (todoIsOpen === 'false') {
    todoWidget.classList.add('active');
    toggleTodoBtn.classList.add('active');
    todoIsOpen = 'true';
    setLocalStorageTodoIsOpen();
  }
  else {
    todoWidget.classList.remove('active');
    toggleTodoBtn.classList.remove('active');
    todoIsOpen = 'false';
    setLocalStorageTodoIsOpen();
  }
}

toggleTodoBtn.addEventListener('click', toggleTodo);
