const form=document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clearButton=document.querySelector("#clearButton");
const filterİnput=document.querySelector("#todoSearch");

todos=[];
runEvents();



function runEvents(){
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",pageLoaded);
secondCardBody.addEventListener("click",removetoUI);
clearButton.addEventListener("click",allTodosEveryWhere)
filterİnput.addEventListener("keyup",filter);

}

function filter(e){
   const filterValue=e.target.value.toLowerCase().trim();
   const todoListesi=document.querySelectorAll(".list-group-item");
  if(todoListesi.length>0){
      todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display:block");  
            }
            else{
                todo.setAttribute("style","display:none !important");
            }
      })
  }   
  else{
    showAlert("warning","filtreleme yapmka için en az 1 todo lazım")
  }
}

function allTodosEveryWhere(){
    const todolistesi=document.querySelectorAll(".list-group-item");
   
    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            todo.remove();
        })
     todos=[];
     localStorage.setItem("todos",JSON.stringify(todos));


    }
    else{
        showAlert("warning","silmek için todo olmadldıır ")
    }
}

function removetoUI(e){
    if(e.target.className==="fa fa-remove"){
        const todo=e.target.parentElement.parentElement;
        todo.remove();
        //storage den silme 
        removeTodoToStorage(todo.textContent)
    }
   
}
function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}


function addTodo(e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","lütfen mesaj giriniz")
    }
    else{
        addTodoToUI(inputText);
        addTodoStorage(inputText);
        showAlert("success","Todo Eklendi")
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){
//     <!--
//     <li class="list-group-item d-flex justify-content-between">Todo 1
//         <a href="#" class="delete-item">
//             <i class="fa fa-remove"></i>
//         </a>
//     </li>
//   -->
 const li=document.createElement("li");
 li.className="list-group-item d-flex justify-content-between"
 li.textContent=newTodo;
 const a=document.createElement("a");
 a.href="#";
 a.className="delete-item"
 const i=document.createElement("i");
 i.className="fa fa-remove";
 a.appendChild(i);
 li.appendChild(a);
 todoList.appendChild(li);

 addInput.value="";


}

function addTodoStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
}

function showAlert(type,message){
//     <div class="alert alert-warning" role="alert">
//   This is a warning alert—check it out!
// </div>
const div=document.createElement("div");
div.className="alert alert-"+type;
div.textContent=message;
firstCardBody.appendChild(div);

setTimeout(function(){
 div.remove()
},1000);

}