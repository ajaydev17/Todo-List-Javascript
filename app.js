// define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskField = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearTaskButton = document.querySelector(".clear-task");

// Add Task listener

const addTask = (event) => {
    if (taskField.value === "") {
        alert("Please enter the task");
    } else {
        const listElement = document.createElement("li");
        listElement.className = "collection-item";
        listElement.appendChild(document.createTextNode(taskField.value));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';

        listElement.appendChild(link);
        taskList.appendChild(listElement);

        storeTaskInLocalStorage(taskField.value);

        taskField.value = "";

        event.preventDefault();
    }
};

// Remove task listener

const removeTask = (event) => {
    if (event.target.parentElement.classList.contains("delete-item")) {
        if (confirm("are you sure?")) {
            event.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(
                event.target.parentElement.parentElement
            );
        }
    }
};

// Clear task from local storage

const clearTaskFromLocalStorage = (event) => {
    localStorage.clear();
};

// Clear all task listener

const clearTask = (event) => {
    // // using inner HTML
    // taskList.innerHTML = "";

    if (taskList.firstChild !== null) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTaskFromLocalStorage();
    } else {
        alert("Task list is empty!!!");
    }
};

// Filter tasks listener

const filterTask = (event) => {
    const filterText = event.target.value.toLowerCase();

    [...document.querySelectorAll(".collection-item")].forEach((element) => {
        const item = element.firstChild.textContent;
        if (item.toLowerCase().indexOf(filterText) !== -1) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
};

// Get Task List

const getTaskList = () => {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
        const listElement = document.createElement("li");
        listElement.className = "collection-item";
        listElement.appendChild(document.createTextNode(task));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';

        listElement.appendChild(link);
        taskList.appendChild(listElement);

        taskField.value = "";
    });
};

// Remove tasks from local storage

const removeTaskFromLocalStorage = (taskItem) => {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Store task in local storage

const storeTaskInLocalStorage = (task) => {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load all event listeners

const loadEventListeners = () => {
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearTaskButton.addEventListener("click", clearTask);
    filter.addEventListener("keyup", filterTask);
    document.addEventListener("DOMContentLoaded", getTaskList);
};

// load all event listeners call

loadEventListeners();
