const journals = await fetch('http://localhost:3000/journal').then(journal => journal.json())
const last_page = journals.length;
if (journals.length == 0) {
    localStorage.setItem("idTitre", 1)
}
else if(localStorage.getItem('idTitre') == null){
    localStorage.setItem("idTitre", last_page)
}
     
let page = parseInt(localStorage.getItem('idTitre'))-1;

GET_Todolist(page)

function GenerateTodoList(nb) {
  if(nb < 13) {
  const divCreateTodoElement = document.querySelector(".todolistGenerate"); 
  const divCheckbox = document.createElement("div");
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = nb;
  inputText.name = "todo"; 
  inputText.placeholder = "ajouter une tâche"
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
    let nb = 0;
    if(page >= 0 && page < journals.length)
       nb = journals[page].info.length
    
    btnAddTodoList.addEventListener("click", function(event){
       event.preventDefault();
       nb+=1
       GenerateTodoList(nb)
    })
    
    
}

function POST_Todolist(){
    const todolistElement= document.querySelector('.createTodo');
    const titreElement = document.querySelector('#Title-of-Todo-list');
    todolistElement.addEventListener('submit', function(event){
        event.preventDefault();

        const arrayTarget = event.target.querySelectorAll("[name=todo]");
        let arrayTodoList= []
        for(let i =0 ; i < arrayTarget.length; i+=1){
            arrayTodoList.push({id_todo : i , tâches :  arrayTarget[i].value, status_termine : false});
        }
       const todolist = {
            id : last_page+1,
            titre : titreElement.value,
            info : arrayTodoList
        }
        const chargeUtile = JSON.stringify(todolist);
        console.log(chargeUtile)
        fetch('http://localhost:3000/journal', {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : chargeUtile 
        })
    })
}

function GET_Todolist(n_page){
    
    const btnModifier = document.getElementById("modifier");
    const titleElement = document.querySelector('#Title-of-Todo-list');
    const btnRegister = document.querySelector('#register');
    
    const numero =  document.querySelector("#num");
    numero.innerText = n_page+1;

    if(n_page >= 0 && n_page < journals.length){
        btnRegister.disabled = true;
        btnRegister.style.cursor = "no-drop"
        btnModifier.disabled = false;
        btnModifier.style.cursor = "pointer";
        for(let u = 0 ; u <journals[n_page].info.length; u+=1){
            titleElement.value = journals[n_page].titre;
            const divCreateTodoElement = document.querySelector(".todolistGenerate"); 
            const deletebtn = document.createElement("button");
            deletebtn.className = "supprimer";
            const imgElement = document.createElement("img");
            imgElement.src = "images/corbeille.png"
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
        btnModifier.disabled = true;
        btnModifier.style.cursor = "no-drop";
        btnRegister.disabled = false;
        btnRegister.style.cursor = "pointer";
        
    }
}

function PUT_Todolist(){
    const todoList = document.querySelector(".createTodo");
    const btnModifier = document.querySelector("#modifier");
    const titreElement = document.querySelector('#Title-of-Todo-list');
     btnModifier.addEventListener("click", function(event){
        event.preventDefault();
        const id = journals[page].id;
        const arrayTarget = todoList.querySelectorAll("[name=box]");
        const arrayTargetTodo = todoList.querySelectorAll("[name=todo]");
        let arrayTodoList= []
        console.log(arrayTarget)
        for(let i = 0 ; i< arrayTarget.length ; i+=1){
           
            if(arrayTarget[i].checked != false){
                arrayTodoList.push(journals[page].info[i]);
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
    
            fetch(` http://localhost:3000/journal/${id}`,{
                    method : "PUT",
                    headers : {"Content-Type": "application/json"},
                    body : chargeUtile 
             });
    })                 
}


function DELETE_Todolist(){
    const todoList = document.querySelector(".createTodo");
    const btnSupprimer = document.querySelectorAll(".supprimer");
    const titreElement = document.querySelector('#Title-of-Todo-list');
    let arrayTodoList= []
    if(page >= 0 && page < journals.length){
     const id = page+1
    for(let u = 0 ; u<journals[page].info.length; u+=1){
        arrayTodoList.push(journals[page].info[u]);
    }
    for(let i = 0 ; i< journals[page].info.length ; i+=1){    
    btnSupprimer[i].addEventListener("click", function(event){   
        event.preventDefault();
        arrayTodoList.splice(i,1);
        const todolist = {
            id : id,
            titre : titreElement.value,
            info : arrayTodoList
        }
            const chargeUtile = JSON.stringify(todolist);
            fetch(` http://localhost:3000/journal/${id}`,{
                    method : "PUT",
                    headers : {"Content-Type": "application/json"},
                    body : chargeUtile 
             });         
    })
    }     
}
}

function PageSuivante()
{
 
    const btnPlus =  document.querySelector(".categorie");
    btnPlus.addEventListener("click", function(){
        let next = parseInt(localStorage.getItem("idTitre"));
        next +=1;
        document.querySelector(".todolistGenerate").innerHTML = "";
        
        localStorage.setItem("idTitre", next)
        GET_Todolist(next);
         location.reload();
    })
}

function PagePrécente()
{
    const btnMoins =  document.querySelector(".categorie_gauche");
    btnMoins.addEventListener("click", function(){
        let next = parseInt(localStorage.getItem('idTitre'));
        next -=1;
        document.querySelector(".todolistGenerate").innerHTML = "";
        GET_Todolist(next);
        localStorage.setItem('idTitre', next); 
        location.reload();
    })

}

PageSuivante();
POST_Todolist();
PUT_Todolist();
DELETE_Todolist();
PagePrécente();
EventaddTodoList();