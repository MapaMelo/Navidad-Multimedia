// ELEMENTOS DE LA PANTALLA

// Busca el espacio donde aparecerán los pensamientos de Papá Noel.
let narracion = document.getElementById("narracion");

// Busca el espacio del comentario sobre la música.
let comentarioMusica = document.getElementById("comentario-musica");


// AUDIOS

// Crea el audio de Christmas Wrapping.
let musicaAmbiente = new Audio("../../sonidos/música ambiente.mp3");

// Hace que la canción se repita continuamente.
musicaAmbiente.loop = true;

// Ajusta el volumen.
musicaAmbiente.volume = 0.35;


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

    // Muestra el comentario de Papá Noel sobre la canción.
    comentarioMusica.textContent = datos.comentarioMusica;


    // CONTINUAR LA MÚSICA AMBIENTE

    // Revisa si ya había una posición guardada de la canción.
    let posicionGuardada = sessionStorage.getItem("posicionMusicaAmbiente");

    // Si existe una posición, continúa desde ese segundo.
    if (posicionGuardada !== null) {
        musicaAmbiente.currentTime = Number(posicionGuardada);
    }

    // Reproduce Christmas Wrapping.
    musicaAmbiente.play().catch(function() {
        console.log("El navegador no permitió reproducir la música automáticamente");
    });

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

        // Guarda el segundo exacto de la canción.
        sessionStorage.setItem("posicionMusicaAmbiente", musicaAmbiente.currentTime);

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

// Ejecuta la función para mostrar la información y reproducir la música.
cargarDatos();