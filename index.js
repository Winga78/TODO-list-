const journals = await fetch('http://localhost:8081/journal').then(journal => journal.json())
let n = parseInt(localStorage.getItem("idTitre"));
let nb = journals[n].info.length;

function GenerateTodoList() {
  if(nb < 13) {
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
       event.preventDefault();
       GenerateTodoList();
    })
}

function POST_Todolist(){
    const todolistElement= document.querySelector('.createTodo');
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

function GET_Todolist(n_page){
    const btnModifier = document.getElementById("modifier");
    const titleElement = document.querySelector('#Title-of-Todo-list');
    const divTodoOne = document.querySelector(".entête");
    if(localStorage.getItem('idTitre') != ""){
        divTodoOne.innerHTML = "";
        for(let u = 0 ; u <journals[n_page].info.length; u+=1){
            titleElement.value = journals[n_page].titre;
            const divCreateTodoElement = document.querySelector(".todolistGenerate"); 
            const btnRegister = document.querySelector('#register');
            btnRegister.disabled = true;
            btnRegister.style.cursor = "no-drop"
            const deletebtn = document.createElement("button");
            deletebtn.className = "supprimer";
            const imgElement = document.createElement("img");
            imgElement.src = "images/moins.png"
            const divCheckbox = document.createElement("div");
            const inputText = document.createElement("input");
            inputText.type = "text";
            inputText.id = u;
            inputText.name = "todo"; 
            inputText.value = journals[n_page].info[u].tâches
            const inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            inputCheckbox.id = u; 
            inputCheckbox.name = "box";
            if(journals[n_page].info[u].status_termine != false)
            inputCheckbox.checked = true;
            deletebtn.appendChild(imgElement);
            divCheckbox.appendChild(inputCheckbox);
            divCheckbox.appendChild(inputText);
             divCheckbox.appendChild(deletebtn);
            divCreateTodoElement.appendChild(divCheckbox);
            }
        
    }
    else{
        titleElement.value = "";
        divTodoOne.lastElementChild.value = ""
        btnModifier.disabled = true;
        btnModifier.style.cursor = "no-drop";
    }
}

function PUT_Todolist(){
    const todoList = document.querySelector(".createTodo");
    const btnModifier = document.querySelector("#modifier");
    const titreElement = document.querySelector('#Title-of-Todo-list');
     btnModifier.addEventListener("click", function(event){
        event.preventDefault();
        const id = n;
        const arrayTarget = todoList.querySelectorAll("[name=box]");
        const arrayTargetTodo = todoList.querySelectorAll("[name=todo]");
        let arrayTodoList= []
       
        for(let i = 0 ; i< arrayTarget.length ; i+=1){
           
            if(arrayTarget[i].checked != false){
                arrayTodoList.push(journals[id].info[i]);
                arrayTodoList.splice(i,1,{id_todo : i ,tâches:arrayTargetTodo[i].value, status_termine : true});
            }
            else 
            arrayTodoList.push({id_todo: i , tâches : arrayTargetTodo[i].value , status_termine : false})
        }
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
    let position =0;
    const todoList = document.querySelector(".createTodo");
    const btnSupprimer = document.querySelectorAll(".supprimer");
    const titreElement = document.querySelector('#Title-of-Todo-list');
    let arrayTodoList= []
    console.log(btnSupprimer);
    for(let u = 0 ; u<journals[n].info.length; u+=1){
        arrayTodoList.push(journals[n].info[u]);
    }
    for(let i = 0 ; i< journals[n].info.length ; i+=1){    
    btnSupprimer[i].addEventListener("click", function(event){   
        event.preventDefault();
        arrayTodoList.splice(i,1);
        const todolist = {
            id : n,
            titre : titreElement.value,
            info : arrayTodoList
        }
            const chargeUtile = JSON.stringify(todolist);
            fetch(`http://localhost:8081/journal/${n}`,{
                    method : "PUT",
                    headers : {"Content-Type": "application/json"},
                    body : chargeUtile 
             });         
    })
    }     
}

function PageSuivante()
{
    let s = parseInt(localStorage.getItem("idTitre"));
    const btnPlus =  document.querySelector(".categorie");
    GET_Todolist(s);
    btnPlus.addEventListener("click", function(event){
           n+=1
        if(n < journals.length)
        {
            event.preventDefault();
             localStorage.setItem("idTitre", n)
            document.querySelector(".todolistGenerate").innerHTML = "";
            GET_Todolist(n)
        }
        else{
            n=0;
            localStorage.setItem("idTitre", n)
            document.querySelector(".todolistGenerate").innerHTML = "";
            GET_Todolist(n)
        }
       
    })
  
}

PageSuivante();
EventaddTodoList();
POST_Todolist();
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