// ELEMENTOS DE LA PANTALLA

// Busca el espacio donde aparecerá el pensamiento de Papá Noel.
let narracion = document.getElementById("narracion");


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido para utilizarlo en JavaScript.
    let datos = await respuesta.json();

    // Recupera la lista de juguetes que ya se terminaron.
    let juguetesTerminados = JSON.parse(localStorage.getItem("juguetesTerminados")) || [];

    // Cuenta cuántos regalos se han terminado.
    let cantidad = juguetesTerminados.length;

    // Muestra el comentario correspondiente al regalo que está preparando.
    narracion.textContent = datos.narraciones[cantidad];

}


// FUNCIÓN PARA GUARDAR EL PAPEL Y PASAR A ENVOLVER

function seleccionarPapel(papel) {

    // Guarda el papel seleccionado.
    localStorage.setItem("papelSeleccionado", papel);

    // Va a la pantalla de envolver.
    window.location.href = "../pantalla-4/envolver.html";
}


// INTERACCIÓN: PAPEL 1

document.getElementById("zona-papel-1").onclick = function() {
    seleccionarPapel("1");
};


// INTERACCIÓN: PAPEL 2

document.getElementById("zona-papel-2").onclick = function() {
    seleccionarPapel("2");
};


// INTERACCIÓN: PAPEL 3

document.getElementById("zona-papel-3").onclick = function() {
    seleccionarPapel("3");
};


// INICIAR PANTALLA

// Ejecuta la función para mostrar la información.
cargarDatos();