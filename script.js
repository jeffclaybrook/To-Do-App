var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
    dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear();
var today = dayOfWeek + ", ";
var date = curMonth + " " + dayOfMonth + ", " + curYear;

document.getElementsByTagName('h1')[0].textContent = today;
document.getElementsByTagName('h2')[0].textContent = date;


const themeBtn = document.querySelector("#themeBtn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
}
themeBtn.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        let theme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        let theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
    }
    localStorage.setItem("theme", theme);
});

const createField = document.querySelector(".widget-footer input");
const createBtn = document.querySelector(".widget-footer button");
const taskList = document.querySelector(".task-list")

createField.onkeyup = () => {
    let userData = createField.value;
    if(userData.trim() != 0) {
        createBtn.classList.add("active");
    } else {
        createBtn.classList.remove("active");
    }
}

showTasks();

createBtn.onclick = () => {
    let userData = createField.value;
    let getLocalStorage = localStorage.getItem("New task");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New task", JSON.stringify(listArr));
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New task");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <button class="icon-btn" type="button" onclick="deleteTask(${index})";><span class="material-icons">close</span></button></li>`;
    });
    taskList.innerHTML = newLiTag;
    createField.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New task");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New task", JSON.stringify(listArr));
    showTasks();
}