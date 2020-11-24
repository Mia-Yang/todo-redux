import { addItem, removeItem, clearAll, editItem, toggleItem } from './redux/action'
import { todoReducer } from './redux/reducer'

const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getData = (key) => {
    if (localStorage.getItem(key) !== null) {
        allList = JSON.parse(localStorage.getItem(key));
    } else {
        allList = [];
    }
    return allList;
}

const removeData = (key) => {
    localStorage.removeItem(key);
}

const store = Redux.createStore(todoReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const inputText = document.querySelector(".inputbox");

// add items
const addTodo = (e) => {
    e.preventDefault();
    const itemContent = inputText.value.trim();
    inputText.value = '';
    if (itemContent.length !== 0) {
        store.dispatch(addItem(new Date().getTime(), itemContent));
    }
}
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', addTodo)

// toggle items
const toggleTodo = (id) => {
    store.dispatch(toggleItem(id));
}

// remove items
function removeTodo(id) {
    store.dispatch(removeItem(id));
}

// clear all
const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    store.dispatch(clearAll());
});

// edit items 
const editContent = (id) => {
    const textContainer = document.getElementById("text-" + id);
    const oldText = textContainer.innerHTML;
    textContainer.innerHTML = "";
    let editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.setAttribute("id", "editInput-" + id);
    textContainer.appendChild(editInput);
    editInput.focus();
    editInput.onblur = function() {
        if (editInput.value.length) {
            console.log(editInput.value, "--------edit");
            store.dispatch(editItem(id, editInput.value.trim()));
        } else {
            textContainer.innerHTML = oldText;
        }
    }
}

// render items
window.toggleTodo = toggleTodo;
window.editContent = editContent;
window.removeTodo = removeTodo;

const todoList = document.querySelector(".todo-list");

function render() {
    let listHtml = '';
    console.log(store.getState(), "-----------store");
    saveData("todoList", store.getState());

    store.getState().forEach((item) => {
        let isChecked = item.completed ? "checked" : "";
        let checkedStyle = item.completed ? 'class="finished"' : '';
        listHtml +=
            `<li ${checkedStyle}>
            <input type="checkbox" onclick="toggleTodo(this)" ${isChecked}> 
            <span onclick="editContent(${item.id})" id="text-${item.id}"> ${item.text} </span>
            <button onclick="removeTodo(${item.id})" class="del">✖️</button>
            </li>`;
    })
    todoList.innerHTML = listHtml;
}

render();
store.subscribe(render);