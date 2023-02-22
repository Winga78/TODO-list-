const jour = await fetch('http://localhost:8081/jour').then(journal => journal.json())

function AddTitle() {
    const input = document.getElementById("MyInput");
    input.addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            document.querySelector(".myTitle").innerHTML = "";
            event.preventDefault();
            const sectionElement = document.querySelector(".myTitle");
            const titleTodo = document.createElement("h3");
            titleTodo.innerText = input.value;
            sectionElement.appendChild(titleTodo);
        }
 })
}

function AddTodoArea() {
    const input = document.getElementById("addTodo");
    input.addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            const sectionMytodo = document.querySelector(".MytodoList");
            const elementTodoList = document.createElement("p");
            elementTodoList.innerText = input.value;
            sectionMytodo.appendChild(elementTodoList);
            input.value = "";
        }

    })

}


function RegisterJournal() {
   const formulaireJournal = document.querySelector(".btn-register");
    formulaireJournal.addEventListener("click", function(event){
        const tab = [];
        event.preventDefault();
        const myTile = document.querySelector(".myTitle");
        const mytodoList = document.querySelectorAll(".MytodoList p");
        for(let i = 0; i<mytodoList.length; i+=1){
           console.log(myTile.innerText, mytodoList[i].innerText);
           tab.push(mytodoList[i].innerText) 
        }
        const journal = {
            id : jour.length,
            titre : myTile.innerText,
            tâches : tab
         }
         const chargeUtile = JSON.stringify(journal);
         console.log(chargeUtile);
         fetch('http://localhost:8081/jour', {
         method : "POST",
         headers : {"Content-Type": "application/json"},
         body : chargeUtile 
    })
      })
}

AddTitle();
AddTodoArea();
RegisterJournal()

