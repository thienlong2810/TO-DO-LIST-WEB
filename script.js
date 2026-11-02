const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Lấy dữ liệu từ localStorage khi load trang
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Xóa</button>
        `;
        todoList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Events
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// Init
renderTasks();
