const journals = await fetch('http://localhost:8081/journal').then(journal => journal.json())
let count = 0;

function PostJournal(data_page_info, titleinfo){
    const tab = [];
    for(let i = 0; i<data_page_info.length; i+=1){
        tab.push(data_page_info[i].innerText) 
    }
     const journal = {
         id : journals.length,
         titre : titleinfo.innerText,
         tâches : tab
    }
    localStorage.setItem('idJournal' , journal.id);
    const chargeUtile = JSON.stringify(journal);
    fetch('http://localhost:8081/journal', {
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : chargeUtile 
    })  
}

async function JournalById(){
    const id = parseInt(localStorage.getItem('idJournal'));
    const reponse = await fetch(`http://localhost:8081/journal/${id}`);
    const todo = await reponse.json()
 
        document.onclick = function(event){
           
            if(journals[0].id === todo.id){
                
                console.log(todo);

            }

            console.log("ça nemarche pas");
            console.log(typeof(journals[0].id));
    
            console.log(typeof(id));
           
        }

}

function GenerateJournal() {

}

function AddTitle() {
    const inputTitle = document.getElementById("MyInput");
    inputTitle.addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            document.querySelector(".myTitle").innerHTML = "";
            event.preventDefault();
            const sectionElement = document.querySelector(".myTitle");
            const titleTodo = document.createElement("h3");
            titleTodo.innerText = inputTitle.value;
            sectionElement.appendChild(titleTodo);
        }
 })
}

function AddTodoArea() {
    
    const inputStain = document.getElementById("addTodo");
    inputStain.addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            count+=1 ; 
            event.preventDefault();
            const sectionMytodo = document.querySelector(".MytodoList");
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "latâche";
            checkbox.id = count;
            const label = document.createElement('label');
            label.htmlFor = count;
            label.appendChild(document.createTextNode(`${inputStain.value}`));
            sectionMytodo.appendChild(checkbox);
            sectionMytodo.appendChild(label);
            inputStain.value = "";
            
        }

    })

}

function CreateCategorieList(Title_list)
{
    const divElement = document.querySelector(".categories");
    const divmescatElement = document.querySelector(".mescat");
    const ulElement = document.createElement("ul");
    const liElement = document.createElement('li');
    liElement.innerText = Title_list.innerText; 
    ulElement.appendChild(liElement);
    divmescatElement.appendChild(ulElement);
    divElement.appendChild(divmescatElement);
}


function RegisterInfoJournal() {
    const btn_register_Element= document.querySelector(".btn-register");
    btn_register_Element.addEventListener("click", function(event){
        event.preventDefault();
        const myTileElement = document.querySelector(".myTitle");
        CreateCategorieList(myTileElement);
        const mytodoList = document.querySelectorAll(".MytodoList label");
        PostJournal(mytodoList,myTileElement); 
    })
}




AddTitle();
AddTodoArea();
RegisterInfoJournal();
JournalById();

