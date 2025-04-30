function leer() {
    var nom = document.forms["formulario"].elements["user"].value;
    var clave = document.getElementById("pass").value;
    var carrera1 = document.getElementById("carrera").value;

    var genElems = document.getElementsByName("genero");
    var gen = "";
    for (var i = 0; i < genElems.length; i++) {
        if (genElems[i].checked) {
            gen = genElems[i].value;
            break;
        }
    }
    var ok=document.getElementById("casilla").checked;

    document.getElementById("resultado").innerHTML =
        "Tu nombre es: " + nom + "<br>" +
        "Tu password es: " + clave + "<br>" +
        "Tu carrera es: " + carrera1 + "<br>" +
        "Tu género es: " + gen+
        "Aceptacion de los acuerdos: "+ok;
}
