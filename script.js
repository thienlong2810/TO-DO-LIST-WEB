const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Lấy data cũ. Nếu data cũ là dạng String thuần, tự động convert sang dạng Object
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks = tasks.map(task => typeof task === 'string' ? { text: task, completed: false } : task);

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ${task.completed ? 'Chưa xong' : 'Hoàn thành'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">Xóa</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    // Lưu task mới dưới dạng Object
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Hàm mới: Bật/Tắt trạng thái hoàn thành
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Events
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// Khởi chạy khi load trang
renderTasks();
