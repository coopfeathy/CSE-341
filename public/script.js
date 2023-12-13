document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;
    const completed = document.getElementById('task-completed').checked;

    const taskData = {
        title,
        description,
        dueDate,
        priority,
        category,
        completed
    };

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(() => {
        loadTasks(); // Reload the tasks
    });
});

function loadTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksList = document.getElementById('tasks-list');
            tasksList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate || 'N/A'}, Priority: ${task.priority}, Category: ${task.category})`;
                if (task.completed) {
                    li.style.textDecoration = "line-through";
                }
                tasksList.appendChild(li);
            });
        });
}

loadTasks();
