
// ELEMENTOS DE LA PANTALLA

// Busca el espacio donde aparecerán los pensamientos de Papá Noel.
let narracion = document.getElementById("narracion");

// Busca el espacio del comentario sobre la música.
let comentarioMusica = document.getElementById("comentario-musica");


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

    // Muestra un texto diferente según el progreso.
    if (cantidad >= 2) {

        // Comentario que aparece cuando va a preparar el tercer regalo.
        narracion.textContent = datos.narracionAvanzada;

    } else {

        // Comentario de la primera y segunda visita.
        narracion.textContent = datos.narracionInicial;
    }


    // MOSTRAR EL COMENTARIO DE LA MÚSICA UNA SOLA VEZ.
    if (localStorage.getItem("comentarioMusicaMostrado") !== "si") {
        
        // Muestra el comentario de Papá Noel sobre la canción.
        comentarioMusica.textContent = datos.comentarioMusica;
        
        // Guarda que el comentario ya fue mostrado.
        localStorage.setItem("comentarioMusicaMostrado", "si");
    
    } else {
        
        // Si ya apareció antes, deja el espacio vacío.
        comentarioMusica.textContent = "";
    }

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


// AVISAR AL INDEX PRINCIPAL QUE CAMBIE A LA MÚSICA AMBIENTE

// El reproductor principal detiene la música feliz
// y comienza Christmas Wrapping.
window.parent.postMessage("cambiar-musica-ambiente", "*");
