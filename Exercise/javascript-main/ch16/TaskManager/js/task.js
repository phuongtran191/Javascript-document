"use strict";
var $ = function (id) {
  return document.getElementById(id);
};
var tasks = [];

var displayTaskList = function () {
  if (tasks.length === 0) {
    // get in storage
    var storage = localStorage.tasks || null;
    // convert json object to javascript object
    tasks = JSON.parse(storage) || [];
  }

  tasks.sort();

  // capitalize tasks
  var capitalized = tasks.map(function (value) {
    var first = value.task.substring(0, 1);
    return {
      task: first.toUpperCase() + value.task.substring(1),
      date: value.date,
    };
  });

  // display tasks string and set focus on task text box
  $("task_list").value = capitalized.reduce(function (preValue, value) {
    return preValue.concat(value.date, " - ", value.task, "\n");
  }, ""); // empty string for initial value
  $("task").focus();
};

var addToTaskList = function () {
  var task = $("task").value;
  var taskDate = $("task_date").value;
  var d = new Date(taskDate);

  if (task === "" || d === "" || d.toString() == "Invalid Date") {
    alert("Please enter a task and date");
  } else {
    // add task to localstorage and tasks array
    tasks.push({ task: task, date: d.toDateString() });
    localStorage.tasks = JSON.stringify(tasks);

    // clear task list text and re-display tasks
    $("task").value = "";
    $("task_date").value = "";
    displayTaskList();
  }
};

var clearTaskList = function () {
  tasks.length = 0;
  localStorage.removeItem("tasks");
  $("task_list").value = "";
  $("task").focus();
};

window.onload = function () {
  $("add_task").onclick = addToTaskList;
  $("clear_tasks").onclick = clearTaskList;
  displayTaskList();
};
