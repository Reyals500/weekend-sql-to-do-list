// const { get } = require("../../routes/todos.router");

console.log('JS is sourced!');

let todosTBody = document.getElementById('viewTodos');

function getTodos(){
    axios({
        method: "GET",
        url: "/todos"
    })
    .then((response) => {
        placeTodosOnTheDom(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.log("Woops somthing went wrong in the GET");
        console.log(error);
    })
}

function addTodos(event) {
    event.preventDefault()
    let todo = {};
    todo.text = document.getElementById('addTodo').value;
    console.log("Todos: ", todo);
    // todo make sure to add in the POST function here once its done
    sendTodos(todo)
}

function clearInputs(){
    document.getElementById('addTodo') = '';
}

function sendTodos(todoAdded){
    console.log("Making sure that the inputs are added for todoAdded: ", todoAdded);

    axios ({
        method: "POST",
        url: "/todos",
        data: todoAdded
    })
    .then(function (response){
        console.log("inside sendTodos()", response.data);
        getTodos();
        clearInputs();
    })
    .catch(function (error) {
        console.log("Error in POST:", error);
        alert("Unable to add a todo at this time. Please try again later!")
    })
}

function todoMarkedForComplete(event) {

    console.log('incoming event.target', event.target)
    console.log('Getting dataset from component', event.target.closest("tr").dataset.id)
  
    // Retrieving data that has been stored on an element
    let todoId = event.target.closest("tr").dataset.id
  
    axios.put(`/todos/${todoId}`)
        .then((response) => {
            getTodos();
        })
        .catch((error) => {
            console.log('Error', error);
            alert('Something went wrong');
        });
  }
  
  function deleteTodo(event) {
    const id = event.target.closest("tr").dataset.id;
    console.log("id of row to delete:", id);
  
    axios({
      method: "DELETE",
      url: `/todos/${id}`
    })
    .then((response) => {
      console.log("response:", response.data);
      // refresh the table
      getTodos();
    })
    .catch((error) => {
      console.log("whoops, there be an error in here!");
      console.error(error);
    })
  }


function placeTodosOnTheDom(arrayOfTodos){
    todosTBody.innerHTML = "";
    console.log(todosTBody);
    for(let todo of arrayOfTodos){
        todosTBody.innerHTML += `
            <tr data-testid="toDoItem" class="isRed" data-id="${todo.id}">
            <td>${todo.text}</td>
            <td>${todo.isComplete}</td>
            <td><button data-testid="completeButton" class="isGreen" onclick="todoMarkedForComplete(event)" && "replaceRed()">Mark as Complete</button></td>
            <td><button data-testid="deleteButton" class="isRed" onclick="deleteTodo(event)">Delete</button></td>
            </tr>
        `;
    }
}
function replaceRed(){
    array.forEach(element => {
        if( isComplete === true){
            classlist.replace(isRead, isGreen)
        }
    });
}


getTodos()