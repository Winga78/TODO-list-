const journals = await fetch('http://localhost:8081/journal').then(journal => journal.json())
let count = 0;

function generat(statusjournal)
{
    for(let i=0 ; i<statusjournal.length;i+=1){
       if(statusjournal.length!=0){

           const sectionMytodo = document.querySelector(".addElement");
            const checkboxContainer  = document.createElement("div");
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "latâche";
            checkbox.id = statusjournal[i].id;
            const label = document.createElement('label');
            label.htmlFor = statusjournal[i].id;
            label.appendChild(document.createTextNode(`${statusjournal[i].tâches}`));
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            sectionMytodo.appendChild(checkboxContainer);
      }
   }

}
generat(journals);

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
const tachesFiltrees = journals.filter(function(tâche){
    return tâche.termine !=true;
});

document.querySelector('.addElement').innerHTML = "";
generat(tachesFiltrees);

async function UpdateStain(){
    const divElements = document.querySelectorAll(".addElement div input");
    
    for(let i = 0 ; i < divElements.length ; i+=1){
        console.log(divElements[i]);
        divElements[i].addEventListener("click", async function(event){
        const id =parseInt(event.target.id);
        console.log(divElements[i].checked , id,tachesFiltrees[i].id );
           if(divElements[i].checked !== false && id === tachesFiltrees[i].id){
           
            const journal = {id : tachesFiltrees[i].id,tâches : tachesFiltrees[i].tâches, termine : true}
            const chargeUtile = JSON.stringify(journal);
            fetch(`http://localhost:8081/journal/${id}`,{
                method : "PUT",
                headers : {"Content-Type": "application/json"},
                body : chargeUtile });
              
            }
          

            });
    } 
}
UpdateStain();




   



