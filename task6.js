let input = document.getElementById("text");
let mybtn = document.getElementById("btn");
let list = document.getElementById("task_lists");

// تحميل المهام من localStorage عند تحميل الصفحة
window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
});

// إضافة مهمة جديدة عند النقر على الزر
mybtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
        addTaskToDOM(text);
        saveTaskToLocalStorage(text);
        input.value = "";
    } else {
        alert("Enter the task");
    }
});

// إضافة المهمة إلى DOM
function addTaskToDOM(text) {
    let myElement = document.createElement("li");
    let span = document.createElement("span");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let text1 = document.createTextNode("Edit");
    let text2 = document.createTextNode("Delete");

    span.textContent = text;
    myElement.className = "newtask";
    myElement.appendChild(span);
    myElement.appendChild(btn1);
    myElement.appendChild(btn2);
    list.appendChild(myElement);

    btn1.appendChild(text1);
    btn2.appendChild(text2);
    btn1.className = "btn1";
    btn2.className = "btn2";
    btn1.style.background = "green";
    btn2.style.background = "red";
    btn1.style.color = "white";
    btn2.style.color = "white";

    // تحرير المهمة
    btn1.addEventListener("click", () => {
        let newtext = prompt("Enter new text");
        if (newtext != null && newtext.trim() !== "") {
            updateTaskInLocalStorage(span.textContent, newtext.trim());
            span.textContent = newtext.trim();
        }
    });0

    // حذف المهمة
    btn2.addEventListener("click", () => {
        list.removeChild(myElement);
        removeTaskFromLocalStorage(span.textContent);
    });
}

// حفظ المهمة في localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// تحديث مهمة في localStorage
function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// حذف مهمة من localStorage
function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



