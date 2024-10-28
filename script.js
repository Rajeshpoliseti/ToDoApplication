let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButton = document.getElementById("addButton");
let saveTodobutton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

saveTodobutton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));

    let id;

    let successMessage = document.getElementById('successMessage');
    id = setInterval(function() {
        successMessage.textContent = "Saved Successfully";
    }, 10)


}

let lengthTodo = todoList.length;

function onTodoStatus(id, labelid, todoId) {
    let checkboxId = document.getElementById(id);
    let labelEl = document.getElementById(labelid);
    labelEl.classList.toggle('checked');

    let ischeckedstatusindex = todoList.findIndex(function(eachitem) {
        let todoid = "todo" + eachitem.uniqueNo;
        if (todoId === todoid) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[ischeckedstatusindex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
}

function deleteTodo(todoId) {
    let todoelement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoelement);

    let deleteItemIndex = todoList.findIndex(function(eachitem) {
        let eachTodoId = "todo" + eachitem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });
    todoList.splice(deleteItemIndex, 1);
}

function createAndAppendtodo(todo) {
    let id = "checkbox" + todo.uniqueNo;
    let labelid = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoEl = document.createElement("li");
    todoEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoEl.id = todoId;
    todoItemsContainer.appendChild(todoEl);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.checked = todo.ischecked;
    inputElement.classList.add("checkbox-input");



    inputElement.onclick = function() {
        onTodoStatus(id, labelid, todoId);
    };

    inputElement.id = id;
    todoEl.appendChild(inputElement);



    let lableContainer = document.createElement("div");
    lableContainer.classList.add("lable-container", "d-flex", "flex-row");
    lableContainer.id = labelid;
    if (todo.ischecked === true) {
        lableContainer.classList.toggle("checked");
    }
    todoEl.appendChild(lableContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", id);
    labelElement.classList.add("checkbox-lable");
    labelElement.textContent = todo.text;
    lableContainer.appendChild(labelElement);

    
function editTodo(todoId) {
    const todoItem = document.getElementById(`todo-${todoId}`);
    const currentText = todoItem.textContent; 

    
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText; 
    inputField.classList.add("edit-input");

    
    todoItem.innerHTML = ""; 
    todoItem.appendChild(inputField); 

    
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    todoItem.appendChild(saveButton); 

    
    saveButton.onclick = function() {
        const newText = inputField.value; 
        
        
        const confirmation = confirm("Are you sure you want to save this change?");
        if (confirmation) {
            todoItem.innerHTML = newText; 
            alert("To-do item updated successfully!"); 
        } else {
            inputField.value = currentText; 
        }
    };
}


let editContainer = document.createElement("div");
editContainer.classList.add("edit-icon");
lableContainer.appendChild(editContainer);

let editIcon = document.createElement("i");
editIcon.classList.add("far", "fa-edit", "edit-icon"); 
editContainer.appendChild(editIcon);

editIcon.onclick = function() {
    editTodo(todoId); 
};



    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon");
    lableContainer.appendChild(deleteContainer);

    let deleteicon = document.createElement("i");
    deleteicon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteicon);

    deleteicon.onclick = function() {
        deleteTodo(todoId);
    };

}

function addTodoElement() {
    let inputele = document.getElementById("inputText");
    let inputTodo = inputele.value;
    if (inputTodo === "") {
        alert("Enter valid text");
        return;
    }
    lengthTodo = lengthTodo + 1;

    let newTodo = {
        text: inputTodo,
        uniqueNo: lengthTodo,
        ischecked: false
    };
    todoList.push(newTodo);
    createAndAppendtodo(newTodo);
    inputele.value = "";

}

for (let each of todoList) {
    createAndAppendtodo(each);
}

addButton.onclick = function() {
    addTodoElement();
};