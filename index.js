const journals = await fetch('http://localhost:8081/journal').then(journal => journal.json())
const x = parseInt(localStorage.getItem('idTitre'))-1;
let nb = journals[x].info.length;

function GenerateTodoList() {
  if(nb < 20) {
  const divCreateTodoElement = document.querySelector(".todolistGenerate"); 
  const divCheckbox = document.createElement("div");
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = nb;
  inputText.name = "todo"; 
  const inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = nb; 
  inputCheckbox.name = "box"
  divCheckbox.appendChild(inputCheckbox);
  divCheckbox.appendChild(inputText);
  divCreateTodoElement.appendChild(divCheckbox);
  }
}

function EventaddTodoList() {
    const btnAddTodoList = document.querySelector(".btn-add-todolist");
    btnAddTodoList.addEventListener("click", function(event){
        localStorage.setItem('nb', nb+=1);
       event.preventDefault();
       GenerateTodoList();
    })
}

function POST_Todolist(){
    const todolistElement= document.querySelector('#register');
    const titreElement = document.querySelector('#Title-of-Todo-list');
    todolistElement.addEventListener('submit', function(event){
        event.preventDefault();
        localStorage.setItem('idTitre', journals.length+1);
        const arrayTarget = event.target.querySelectorAll("[name=todo]");
        let arrayTodoList= []
        for(let i =0 ; i < arrayTarget.length; i+=1){
            arrayTodoList.push({id_todo : i , tâches :  arrayTarget[i].value, status_termine : false});
        }
       const todolist = {
            id : journals.length+1,
            titre : titreElement.value,
            info : arrayTodoList
        }
        const chargeUtile = JSON.stringify(todolist);
        fetch('http://localhost:8081/journal', {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : chargeUtile 
        })
    })
}

function GET_Todolist(){
    if(localStorage.getItem('idTitre') != ""){
        const divTodoOne = document.querySelector(".entête");
        divTodoOne.innerHTML = "";
        for(let i = 0 ; i<journals.length; i+=1){
            for(let u = 0 ; u <journals[i].info.length ; u+=1){
            const divCreateTodoElement = document.querySelector(".todolistGenerate"); 
            const btnRegister = document.querySelector('#register');
            btnRegister.disabled = true;
            const divCheckbox = document.createElement("div");
            const inputText = document.createElement("input");
            inputText.type = "text";
            inputText.id = nb;
            inputText.name = "todo"; 
            inputText.value = journals[i].info[u].tâches
            const inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            inputCheckbox.id = nb; 
            inputCheckbox.name = "box";
            if(journals[i].info[u].status_termine != false)
            inputCheckbox.checked = true;
            divCheckbox.appendChild(inputCheckbox);
            divCheckbox.appendChild(inputText);
            divCreateTodoElement.appendChild(divCheckbox);
            }
        }
    }
}

function PUT_Todolist(){
    const btnModifier = document.querySelector(".createTodo");
    const titreElement = document.querySelector('#Title-of-Todo-list');
     btnModifier.addEventListener("submit", function(event){
        event.preventDefault();
        const id = parseInt(localStorage.getItem("idTitre"));
        console.log(id);
        const arrayTarget = event.target.querySelectorAll("[name=box]");
        const arrayTargetTodo = event.target.querySelectorAll("[name=todo]");
        let arrayTodoList= []
        console.log(arrayTargetTodo);
        for(let i = 0 ; i< arrayTarget.length ; i+=1){
           
            if(arrayTarget[i].checked != false){
                arrayTodoList.push(journals[id-1].info[i]);
                arrayTodoList.splice(i,1,{id_todo : i ,tâches:arrayTargetTodo[i].value, status_termine : true});
            }
            else 
            arrayTodoList.push({id_todo: i , tâches : arrayTargetTodo[i].value , status_termine : false})
        }
        console.log(arrayTodoList);
        const todolist = {
            id : id,
            titre : titreElement.value,
            info : arrayTodoList
        }
            const chargeUtile = JSON.stringify(todolist);
            fetch(`http://localhost:8081/journal/${id}`,{
                    method : "PUT",
                    headers : {"Content-Type": "application/json"},
                    body : chargeUtile 
             });
    })                 
}

function DELETE_Todolist(){
    //utiliser PUT pour supprimer des tâches
    //utiliser localstorage pour stocker nb
}

EventaddTodoList();
POST_Todolist();
GET_Todolist();
PUT_Todolist();
DELETE_Todolist();


// async function DeleteStain(){
//     const divElements = document.querySelectorAll(".createTodo div button");
//     // console.log(divElements);
//     for(let i = 0 ; i < divElements.length ; i+=1){
//         let a  = divElements[i].parentElement.querySelector('label').innerText;
//         divElements[i].addEventListener("click", async function(event){
//             console.log(event);
//         const id =parseInt(event.target.dataset.id);
//         event.preventDefault();
//         const j = await fetch(`http://localhost:8081/journal/Title=/${a}`, {
//          method : "DELETE",
//          bod
//         });
//     });
//   }
// }
// DeleteStain();