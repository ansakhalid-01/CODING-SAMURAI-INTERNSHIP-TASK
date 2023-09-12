const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasks');
const addButton = document.getElementById('addButton');
const prioritySelect = document.getElementById('prioritySelect');
const filterCompletedButton = document.getElementById('filterCompletedButton');
const filterPendingButton = document.getElementById('filterPendingButton');
const sortPriorityButton = document.getElementById('sortPriorityButton');
const sortDueDateButton = document.getElementById('sortDueDateButton');

// Function to generate a unique task ID
function generateTaskId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Retrieve tasks from local storage on page load
let tasks = getTasksFromLocalStorage();

// Function to store tasks in local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

let editingTask = null; // To track the task being edited

function addOrUpdateTask() {
    const taskText = taskInput.value.trim();
    const selectedPriority = prioritySelect.value;

    if (taskText !== '') {
        if (editingTask) {
            // Update the task if editing
            const taskSpan = editingTask.querySelector('.task-text');
            const taskPriority = editingTask.querySelector('.priority');

            taskSpan.textContent = taskText;
            taskPriority.textContent = selectedPriority.charAt(0).toUpperCase();

            addButton.textContent = 'Add'; // Change button text back to 'Add'
            taskInput.value = ''; // Clear the input field

            // Update the task in localStorage (you can use a unique identifier like data-task-id)
            const taskId = editingTask.getAttribute('data-task-id');
            const updatedTask = {
                id: taskId,
                text: taskText,
                priority: selectedPriority,
                completed: false, // Assuming the task is not completed
            };
            // Update the task in localStorage
            storeTaskInLocalStorage(updatedTask);

            editingTask = null; // Reset editing task
        } else {
            // Add a new task with the selected priority
            const taskId = generateTaskId(); // Generate a unique identifier for the task
            const taskItem = document.createElement('li');
            // Use title attribute for full text
            taskItem.innerHTML = `
                <div class="task-container" data-task-id="${taskId}">
                    <span title="${taskText}" class="task-text">${taskText}</span>      
                    <span class="priority ${selectedPriority.toLowerCase()}">${selectedPriority.charAt(0).toUpperCase()}</span>
                    <button class="edit-button" onclick="editTask(this)">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="complete-button" onclick="markAsCompleted(this)">
                        <i class="fas fa-check"></i> 
                    </button>
                    <button class="delete-button" onclick="deleteTask(this)">
                        <i class="fas fa-trash"></i> 
                    </button>
                </div>
            `;
            tasksList.appendChild(taskItem);
            taskInput.value = ''; // Clear the input field

            // Create a new task object
            const newTask = {
                id: taskId,
                text: taskText,
                priority: selectedPriority,
                completed: false, // Assuming the task is not completed
            };

            // Store the new task in localStorage
            storeTaskInLocalStorage(newTask);
        }
    }
}

function storeTaskInLocalStorage(task) {
    // Get the existing tasks from localStorage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove any existing task with the same ID (if any)
    const updatedTasks = tasks.filter(existingTask => existingTask.id !== task.id);

    // Add the new task to the tasks array
    updatedTasks.push(task);

    // Store the updated tasks array back in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskInLocalStorage(updatedTask) {
    // Get the existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find and update the task in the tasks array stored in local storage
    const updatedTasks = existingTasks.map(task => {
        if (task.id === updatedTask.id) {
            return updatedTask;
        }
        return task;
    });

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}


function markAsCompleted(button) {
    const taskItem = button.parentElement;
    const taskId = taskItem.getAttribute('data-task-id');
    const taskText = taskItem.querySelector('.task-text');
    const isCompleted = taskText.classList.contains('completed');

    // Toggle the completed status in the task's appearance
    taskText.classList.toggle('completed');

    // Update the completed status in the tasks array
    tasks.forEach(task => {
        if (task.id === taskId) {
            task.completed = !isCompleted; // Toggle the completed status
        }
    });

    // Save the updated tasks array to local storage
    saveTasksToLocalStorage();
}


// Function to delete a task
function deleteTask(button) {
    const taskItem = button.parentElement;
    const taskId = taskItem.getAttribute('data-task-id');

    // Remove the task from the UI
    taskItem.remove();

    // Update the tasks array by removing the deleted task
    tasks = tasks.filter(task => task.id !== taskId);

    // Update local storage to reflect the deleted task
    saveTasksToLocalStorage();
}


function editTask(taskContainer) {
    // Extract the task ID from the task container's data attribute
    const taskId = taskContainer.getAttribute('data-task-id');

    // Find the task index in the tasks array
    const editedTaskIndex = tasks.findIndex(task => task.id === taskId);

    if (editedTaskIndex !== -1) {
        const editedTask = tasks[editedTaskIndex];

        // Populate the input field and select dropdown with the task's current values
        taskInput.value = editedTask.text;
        prioritySelect.value = editedTask.priority.toLowerCase();

        // Change the button text to 'Update'
        addButton.textContent = 'OK';

        // Set the editingTask variable to the task container for reference
        editingTask = taskContainer;

        // Now, we'll also update the task in local storage here
        const updatedTask = {
            id: taskId,
            text: taskInput.value.trim(),
            priority: prioritySelect.value,
            completed: editedTask.completed, // Preserve the completed status
        };

        // Update the task in local storage
        updateTaskInLocalStorage(updatedTask);
    }
}




// Add or update a task when clicking the button
addButton.addEventListener('click', addOrUpdateTask);

function filterCompletedTasks() {
    const taskContainers = Array.from(document.querySelectorAll('.task-container'));
    taskContainers.forEach(container => {
        const isCompleted = container.querySelector('.task-text').classList.contains('completed');
        if (isCompleted) {
            container.classList.remove('hidden-task'); // Show completed tasks
        } else {
            container.classList.add('hidden-task'); // Hide pending tasks
        }
    });
}

function filterPendingTasks() {
    const taskContainers = Array.from(document.querySelectorAll('.task-container'));
    taskContainers.forEach(container => {
        const isCompleted = container.querySelector('.task-text').classList.contains('completed');
        if (isCompleted) {
            container.classList.add('hidden-task'); // Hide completed tasks
        } else {
            container.classList.remove('hidden-task'); // Show pending tasks
        }
    });
}

// Function to sort tasks by priority
function sortTasksByPriority() {
    const tasks = Array.from(document.querySelectorAll('li'));
    tasks.sort((a, b) => {
        const priorityA = a.querySelector('.priority').classList[1];
        const priorityB = b.querySelector('.priority').classList[1];
        if (priorityA < priorityB) {
            return -1;
        } else if (priorityA > priorityB) {
            return 1;
        }
        return 0;
    });
    tasksList.innerHTML = '';
    tasks.forEach(task => tasksList.appendChild(task));
}

function parseDueDate(dateString) {
    if (dateString !== null && dateString !== undefined) {
        // Attempt to parse dateString into a Date object
        const date = new Date(dateString);

        // Check if the date is valid
        if (!isNaN(date)) {
            return date;
        } else {
            // Handle invalid date format
            console.error(`Invalid date format: ${dateString}`);
            return null;
        }
    } else {
        // Handle cases where dateString is null or undefined
        console.error(`Received null or undefined value for dateString`);
        return null;
    }
}


function sortTasksByDueDate() {
    const tasks = Array.from(document.querySelectorAll('li'));

    // Sort tasks by comparing their due dates using the Date objects
    tasks.sort((a, b) => {
        const dueDateA = parseDueDate(a.querySelector('.task-container').getAttribute('data-due-date'));
        const dueDateB = parseDueDate(b.querySelector('.task-container').getAttribute('data-due-date'));

        if (dueDateA < dueDateB) {
            return -1;
        } else if (dueDateA > dueDateB) {
            return 1;
        }
        return 0;
    });

    // Clear and re-render the sorted tasks
    tasksList.innerHTML = '';
    tasks.forEach(task => tasksList.appendChild(task));
}

function loadTasksFromLocalStorage() {
    tasks = getTasksFromLocalStorage();
    tasksList.innerHTML = ''; // Clear the existing task list

    tasks.forEach(task => {
        // Check if a task with the same ID already exists in the task list
        const existingTask = document.querySelector(`[data-task-id="${task.id}"]`);
        if (!existingTask) {
            const taskItem = document.createElement('li');
            const taskId = task.id; // Get the task ID from the stored task

            taskItem.innerHTML = `
                <div class="task-container" data-task-id="${taskId}">
                    <span title="${task.text}" class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>      
                    <span class="priority ${task.priority.toLowerCase()}">${task.priority.charAt(0).toUpperCase()}</span>
                    <button class="edit-button" onclick="editTask(this)">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="complete-button" onclick="markAsCompleted(this)">
                        <i class="fas fa-check"></i> 
                    </button>
                    <button class="delete-button" onclick="deleteTask(this)">
                        <i class="fas fa-trash"></i> 
                    </button>
                </div>
            `;

            tasksList.appendChild(taskItem);
        }
    });
}




// Load tasks from local storage when the page is initially loaded
window.addEventListener('load', loadTasksFromLocalStorage);
addButton.addEventListener('click', addOrUpdateTask);

// Add event listeners for filter and sort buttons
filterCompletedButton.addEventListener('click', filterCompletedTasks);
filterPendingButton.addEventListener('click', filterPendingTasks);
sortPriorityButton.addEventListener('click', sortTasksByPriority);
sortDueDateButton.addEventListener('click', sortTasksByDueDate);

// Event delegation for the "Edit" button
tasksList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        console.log('Edit button clicked'); // Add this line for debugging
        // Find the task container associated with the clicked "Edit" button
        const taskContainer = event.target.closest('.task-container');
        if (taskContainer) {
            // Call the editTask function with the task container element
            editTask(taskContainer);
        }
    }
});



