const journals = await fetch('http://localhost:8081/journal').then(journal => journal.json())

let count = 0;

function generat(statusjournal)
{
    const sectionMytodo = document.querySelector(".addElement");
   if(statusjournal.length !==0) {
    for(let i=0 ; i<statusjournal.length;i+=1){
            const checkboxContainer  = document.createElement("div");
            const deleteButton = document.createElement("button");
            deleteButton.dataset.id = statusjournal[i].id; 
            deleteButton.classList.add("gg-remove");
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "latâche";
            checkbox.id = statusjournal[i].id;
            const label = document.createElement('label');
            label.htmlFor = statusjournal[i].id;
            label.appendChild(document.createTextNode(`${statusjournal[i].tâches}`));
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            checkboxContainer.appendChild(deleteButton);
            sectionMytodo.appendChild(checkboxContainer);
      
   }
}
else {
    const pElement = document.createElement('p');
    pElement.innerText = "(aucune tâche)"
    pElement.classList.add('info');
    sectionMytodo.appendChild(pElement);

}
 

}

function CreateTodoStain() {
    const inputStain = document.getElementById("addTodo");
    inputStain.addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            PostJournal(inputStain.value);
            inputStain.value = "";   
        }
    })
}
CreateTodoStain();

function PostJournal(stainsInfo){
    const journal = {
        id : journals.length+1,
        tâches : stainsInfo,
        termine : false
   }
    const chargeUtile = JSON.stringify(journal);
    fetch('http://localhost:8081/journal', {
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : chargeUtile 
    })  
}


async function UpdateStain(statusjournal){
    const divElements = document.querySelectorAll(".addElement div input");
    console.log(divElements);
    for(let i = 0 ; i < divElements.length ; i+=1){
        console.log(divElements[i]);
        divElements[i].addEventListener("click", async function(event){
        const id =parseInt(event.target.id);
        console.log(divElements[i].checked , id,statusjournal[i].id );
           if(divElements[i].checked !== false && id === statusjournal[i].id){
           
            const journal = {id : statusjournal[i].id,tâches : statusjournal[i].tâches, termine : true}
            const chargeUtile = JSON.stringify(journal);
            fetch(`http://localhost:8081/journal/${id}`,{
                method : "PUT",
                headers : {"Content-Type": "application/json"},
                body : chargeUtile });
              
            }
          

            });
    } 
}

async function DeleteStain(){
    const divElements = document.querySelectorAll(".addElement div button");
    console.log(divElements);
    for(let i = 0 ; i < divElements.length ; i+=1){
        console.log(divElements[i]);
        divElements[i].addEventListener("click", async function(event){
        const id =parseInt(event.target.dataset.id);
        event.preventDefault();
        const j = await fetch(`http://localhost:8081/journal/${id}`, {
         method : "DELETE"
        });
    });
  }
}



const boutonTakeAll = document.querySelector(".btn-tout");
boutonTakeAll.addEventListener("click", function(){
    document.querySelector('.addElement').innerHTML = "";
   generat(journals);
   DeleteStain()
})

const boutonFilterAfaire = document.querySelector(".btn-encours");
boutonFilterAfaire.addEventListener("click", function(){
    
 const tachesFiltrees = journals.filter(function(tâche){
    return tâche.termine !=true;
});
    document.querySelector('.addElement').innerHTML = "";
    generat(tachesFiltrees);
    UpdateStain(tachesFiltrees);
   
})


const boutonFilterFaites = document.querySelector(".btn-fait");
const sectionaddElement = document.querySelector(".addElement")
boutonFilterFaites.addEventListener("click", function(){
    const tachesFiltrees = journals.filter(function(tâche){
        return tâche.termine !=false;
    });
    document.querySelector('.addElement').innerHTML = "";
   for(let i = 0 ; i < tachesFiltrees.length ; i+=1){
    const textTâches = document.createElement('p');
    textTâches.classList.add("finish");
    textTâches.innerText = tachesFiltrees[i].tâches;
    sectionaddElement.appendChild(textTâches);
   }
    
})







   



