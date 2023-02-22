//const pieces = await fetch('http://localhost:8081/journal').then(journal => journal.json())

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

AddTitle();
AddTodoArea();


// function RegisterJournal() {
//     formulaireJournal = document.querySelector(".titre-du-journal");

//     formulaireJournal.addEventListener("submit", function(event){
//         event.preventDefault();
//         const journal = {
//           pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
//           utilisateur: event.target.querySelector("[name=utilisateur").value,
//           commentaire: event.target.querySelector("[name=commentaire]").value,
//           nbEtoiles : parseInt(event.target.querySelector("[name=nbEtoiles]").value)
//         }
//         const chargeUtile = JSON.stringify(avis);
//         console.log(chargeUtile);
//         fetch('http://localhost:8081/avis', {
//         method : "POST",
//         headers : {"Content-Type": "application/json"},
//         body : chargeUtile 
//     })
//       })
// }

