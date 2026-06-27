let cantTareas = 0;

const addbttn = document.querySelector(".addbttn");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const edit = document.querySelector(".editBttn");
const taskContainter = document.querySelector(".taskContainer");
const overlay = document.querySelector(".overlay");
//const editbttn = document.querySelector(".editbttn");

function addTask() {
    //Borro error (aunque no esté)
    error.style.display = "none";

    //Obtengo titulo de la task
    const msj = input.value.trim();
    input.value = "";

    //Creo el div de la nueva task
    const newTask = document.createElement("div");
    newTask.className = "task";

    //Creo el titulo y le asigno el value del input
    const newP = document.createElement("p");
    newP.textContent = msj;
    //Agrego el titulo a la task nueva
    newTask.appendChild(newP);

    //Creo el nuevo cont de botones
    const newBttnsCont = document.createElement("div");
    newBttnsCont.className = "buttons";

    //Creo los botones y los agrego a su contenedor
    const newBttn1 = document.createElement("button");
    const newBttn2 = document.createElement("button");
    newBttn1.textContent = "Delete";
    newBttn1.className = "deleteBttn";
    newBttn2.textContent = "Edit";
    newBttn2.className = "editBttn";
    newBttnsCont.appendChild(newBttn1);
    newBttnsCont.appendChild(newBttn2);

    //Agrego el cont de botones a la task
    newTask.appendChild(newBttnsCont);

    //Agrego la nueva task a la lista
    taskContainter.prepend(newTask);

    //aumento cant tareas
    cantTareas++;
}

function addEditCard(task){
    //Creamos la editcard
    const newEditCard = document.createElement("div");
    newEditCard.className = "editcard";

    //creamos el titulo
    const newTitle = document.createElement("p");
    newTitle.textContent = "Edit task title";

    //creamos el input
    const newInput = document.createElement("input");
    newInput.className = "input";
    newInput.placeholder = "Write the new title"

    //Creamos el div de los botones
    const newBttnDiv = document.createElement("div");
    newBttnDiv.className = "buttons";

    //Creamos los dos botones y los insertamos dentro de su div
    const newBttn1 = document.createElement("button");
    const newBttn2 = document.createElement("button");
    newBttn1.textContent = "Submit";
    newBttn1.className = "addbttn submitBttn";
    newBttn2.textContent = "Cancel";
    newBttn2.className = "cancelBttn";
    newBttnDiv.appendChild(newBttn1);
    newBttnDiv.appendChild(newBttn2);

    //creamos el bloque de error
    const newError = document.createElement("p");
    newError.textContent = "Error: you must write a task title first";
    newError.className = "error2";

    //metemos todo dentro del editcard
    newEditCard.appendChild(newTitle);
    newEditCard.appendChild(newInput);
    newEditCard.appendChild(newBttnDiv);
    newEditCard.appendChild(newError);

    //Ahora agregamos la nueva editcard debajo de la tarea correspondiente
    task.insertAdjacentElement("afterend", newEditCard);

    //seteamos la task como que ya tiene una edit card asi no se pueden abrir ams de una
    task.classList.add("hasEditCard");
}

window.addEventListener("load", () => {
    overlay.style.display = "none";
});

addbttn.addEventListener("click", () => {
    if (input.value.trim() === "") {
        error.style.display = "block";
    } else {
        addTask();
    }
});

taskContainter.addEventListener("click", (event) => {
    
    if (event.target.classList.contains("deleteBttn")) {
        const task = event.target.closest(".task");
        if(task.classList.contains("hasEditCard")){
            const editCard = task.nextElementSibling;
            editCard.remove();
        }
        task.remove();
    } else if (event.target.classList.contains("cancelBttn")) {
        const edit = event.target.closest(".editcard");
        const task = edit.previousElementSibling;
        edit.remove();
        task.classList.remove("hasEditCard");
    } else if(event.target.classList.contains("editBttn")){
        const task = event.target.closest(".task");
        if(!task.classList.contains("hasEditCard")){
            addEditCard(task);
        }
    }else if(event.target.classList.contains("submitBttn")){
        const edit = event.target.closest(".editcard");
        const error = edit.querySelector(".error2");
        const msg = edit.querySelector(".input").value.trim();
        if(msg === ""){
            error.style.display = "block";
        }else{
            error.style.display = "none";
            const task = edit.previousElementSibling;
            edit.remove();
            task.querySelector("p").textContent = msg;
            task.classList.remove("hasEditCard");
        }
        
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        if (input.value.trim() === "") {
            error.style.display = "block";
        } else {
            addTask();
        }
    }
})