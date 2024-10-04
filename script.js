let currentTaskItem = null;  // Store the current task item being edited

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("task-list");

    // Create a new task item (li)
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // Create a checkbox for marking the task as done
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-1 mb-1";
    checkbox.onclick = function() {
        toggleTaskCompletion(taskItem, checkbox);
    };

    // Create a span element to hold the task text
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.innerText = taskText;

    // Create the 'Edit' button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="bi bi-pencil"></i>';
    editButton.className = "btn btn-success btn-sm ms-5 edit-btn";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editModal");
    editButton.onclick = function() {
        openEditModal(taskItem, taskSpan);
    };

    // Create the 'Delete' button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
    deleteButton.className = "btn btn-danger btn-sm delete-btn";
    deleteButton.onclick = function() {
        taskList.removeChild(taskItem);
    };

    // Append the checkbox, task text, and buttons to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = "";
}

// Function to open the Bootstrap modal and set the current task for editing
function openEditModal(taskItem, taskSpan) {
    currentTaskItem = taskItem;  // Store the task item being edited
    document.getElementById("edit-task-input").value = taskSpan.innerText;  // Set current task text in modal input
}

// Function to save the edited task
function saveTaskEdit() {
    const editedTaskText = document.getElementById("edit-task-input").value.trim();

    if (editedTaskText === "") {
        alert("Task cannot be empty.");
        return;
    }

    // Update the task text in the current task item
    currentTaskItem.getElementsByClassName("task-text")[0].innerText = editedTaskText;

    // Hide the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();
}

// Function to toggle the task completion and hide/show Edit and Delete buttons
function toggleTaskCompletion(taskItem, checkbox) {
    const editButton = taskItem.getElementsByClassName("edit-btn")[0];
    const deleteButton = taskItem.getElementsByClassName("delete-btn")[0];

    // Toggle the completed class to mark/unmark the task as done
    taskItem.classList.toggle("completed");
    
}
