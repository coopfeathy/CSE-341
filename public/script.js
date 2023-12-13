document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value;
    taskInput.value = '';

    // Add the task to the backend
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: task })
    })
    .then(response => response.json())
    .then(() => {
        loadTasks(); // Reload the tasks
    });
});

function loadTasks() {
    // Fetch tasks from the backend
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksList = document.getElementById('tasks-list');
            tasksList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.title;
                li.addEventListener('click', () => {
                    li.classList.toggle('completed');
                });
                tasksList.appendChild(li);
            });
        });
}

// Initial load of tasks
loadTasks();
