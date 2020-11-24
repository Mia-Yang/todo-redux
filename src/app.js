import { addItem, removeItem, clearAll, editItem, toggleItem } from './redux/action'
import { todoReducer } from './redux/reducer'

const store = Redux.createStore(todoReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// add items
const inputText = document.querySelector(".inputbox");
const addTodo = (e) => {
    e.preventDefault();
    const textContent = inputText.value.trim();
    inputText.value = '';
    if (textContent.length !== 0) {
        store.dispatch(addItem(new Date().getTime(), textContent));
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
const editText = (id) => {
    const textSpan = document.getElementById("text-" + id);
    const originalText = textSpan.innerHTML;
    textSpan.innerHTML = "";
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "newInput-" + id);
    textSpan.appendChild(newInput);
    newInput.focus();
    newInput.onblur = function() {
        if (newInput.value.length) {
            store.dispatch(editItem(id, newInput.value.trim()));
        } else {
            textSpan.innerHTML = originalText;
        }
    }
}

// render items
window.toggleTodo = toggleTodo;
window.editText = editText;
window.removeTodo = removeTodo;

const todoList = document.querySelector(".todo-list");

function render() {
    let listHtml = '';
    saveData("todoList", store.getState());

    store.getState().forEach((item) => {
        let isChecked = item.completed ? "checked" : "";
        let checkedStyle = item.completed ? 'class="finished"' : '';
        listHtml +=
            `<li ${checkedStyle}>
            <input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
            <span onclick="editText(${item.id})" id="text-${item.id}"> ${item.text} </span>
            <button onclick="removeTodo(${item.id})" class="del">✖️</button>
            </li>`;
    })
    todoList.innerHTML = listHtml;
}

render();
store.subscribe(render);