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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('task-form').reset(); // Clear form
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
                li.innerHTML = `${task.title} - ${task.description}`;
                if (task.completed) {
                    li.classList.add('completed');
                }

                // Completion Toggle
                const completeButton = document.createElement('button');
                completeButton.innerText = task.completed ? 'Unmark' : 'Complete';
                completeButton.onclick = () => toggleComplete(task._id);
                li.appendChild(completeButton);

                // Delete Button
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = () => deleteTask(task._id);
                li.appendChild(deleteButton);

                tasksList.appendChild(li);
            });
        });
}

function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, { method: 'DELETE' })
        .then(() => loadTasks()); // Reload the tasks
}

function toggleComplete(taskId) {
    // Assuming your API can toggle the task's completion status
    fetch(`/tasks/${taskId}/toggle-complete`, { method: 'PUT' })
        .then(() => loadTasks()); // Reload the tasks
}

loadTasks();
