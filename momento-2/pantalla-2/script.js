// ELEMENTOS DE LA PANTALLA

// Busca el espacio donde aparecerán los pensamientos de Papá Noel.
let narracion = document.getElementById("narracion");


// FUNCIÓN PARA CARGAR LOS DATOS

// Carga la información guardada en datos.json.
async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido para utilizarlo en JavaScript.
    let datos = await respuesta.json();

    // Muestra el texto inicial.
    narracion.textContent = datos.narracion;

}


// FUNCIÓN PARA SELECCIONAR UN JUGUETE

function seleccionarJuguete(juguete) {

    // Recupera la lista de juguetes que ya se terminaron.
    let juguetesTerminados = JSON.parse(localStorage.getItem("juguetesTerminados")) || [];

    // Revisa si el juguete ya fue utilizado.
    if (juguetesTerminados.includes(juguete)) {

        // Muestra el comentario de Papá Noel.
        narracion.textContent = "¿Otra vez ese? ¡Ya lo envolví! No puedo estar haciendo lo mismo dos veces...";

    } else {

        // Guarda el juguete seleccionado.
        localStorage.setItem("jugueteSeleccionado", juguete);

        // Va a la pantalla de selección de papel.
        window.location.href = "../pantalla-3/papeles.html";
    }

}


// INTERACCIONES CON LOS JUGUETES

// Cada zona permite seleccionar un juguete.

document.getElementById("zona-matriushkas").onclick = function() {
    seleccionarJuguete("matriushkas");
};

document.getElementById("zona-robot").onclick = function() {
    seleccionarJuguete("robot");
};

document.getElementById("zona-libros").onclick = function() {
    seleccionarJuguete("libros");
};

document.getElementById("zona-oso").onclick = function() {
    seleccionarJuguete("oso");
};

document.getElementById("zona-balon").onclick = function() {
    seleccionarJuguete("balon");
};

document.getElementById("zona-muneca").onclick = function() {
    seleccionarJuguete("muneca");
};


// INICIAR PANTALLA

// Ejecuta la función para mostrar la información.
cargarDatos();