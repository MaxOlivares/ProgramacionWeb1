document.addEventListener("DOMContentLoaded", function () {
  const tareaInput = document.getElementById("tareaInput");
  const agregarBtn = document.getElementById("agregarBtn");
  const eliminarBtn = document.getElementById("eliminarBtn");
  const listaTareas = document.getElementById("listaTareas");

  agregarBtn.addEventListener("click", function () {
    const textoTarea = tareaInput.value.trim();

    if (textoTarea === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const texto = document.createTextNode(textoTarea);

    li.appendChild(checkbox);
    li.appendChild(texto);

    listaTareas.appendChild(li);
    tareaInput.value = "";
  });

  eliminarBtn.addEventListener("click", function () {
    const tareas = listaTareas.getElementsByTagName("li");

    for (let i = tareas.length - 1; i >= 0; i--) {
      const checkbox = tareas[i].querySelector("input[type='checkbox']");
      if (checkbox.checked) {
        listaTareas.removeChild(tareas[i]);
      }
    }
  });
});
