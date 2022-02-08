addTask("Learn to wrap gifts", 1639944400000);
addTask("Buy milk");

function addTask(description, dueTime) {
    const ul = document.getElementById("task_list");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(description));
    if (dueTime) {
        const date = new Date(dueTime)
        const span = document.createElement("span")
        span.classList.add("due");
        span.appendChild(document.createTextNode("due " + date.toLocaleString("en-US", {timeZone:'EST'})));
        li.appendChild(span)
    }
    const button = document.createElement("button");
    const cls = ["btn", "btn-sm", "btn-outline-danger", "done"];
    button.classList.add(...cls);
    button.setAttribute("type", "button");
    button.appendChild(document.createTextNode("Done"));
    button.addEventListener("click", function(e) {
        e.target.parentNode.remove();
    });
    li.appendChild(button);
    ul.appendChild(li);
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date().getTimezoneOffset()) * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

const add_task = document.querySelector("#add_task");
const description = document.querySelector("#task_description_input");
const due_date = document.querySelector("#duedate_input");
const due_time = document.querySelector("#duetime_input");

add_task.addEventListener("click", function(){
    const dueTime = dateAndTimeToTimestamp(due_date, due_time);
    addTask(description.value, dueTime);
    description.value = '';
});

description.addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        const dueTime = dateAndTimeToTimestamp(due_date, due_time);
        addTask(description.value, dueTime);
        description.value = '';
    }
});

const buttons = document.querySelectorAll(".done");
buttons.forEach(button => button.addEventListener("click", function(e) {
    e.target.parentNode.remove();
}));
