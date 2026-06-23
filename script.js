let cantTareas = 0;

const addbttn = document.querySelector(".addbttn");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const taskContainter = document.querySelector(".taskContainer");

addbttn.addEventListener("click", () => {
    if(input.value.trim() === ""){
        error.style.display = "block";
    }else{
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
});

taskContainter.addEventListener("click", (event) => {

    // ¿Se hizo click en un botón Delete?
    if (event.target.classList.contains("deleteBttn")) {

        // Buscar la tarea que contiene ese botón
        const task = event.target.closest(".task");

        // Eliminarla
        task.remove();
    }

});