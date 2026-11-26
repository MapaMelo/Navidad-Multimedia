
// ELEMENTOS DE LA PANTALLA

let narracion = document.getElementById("narracion");
let mensaje = document.getElementById("mensaje");
let botonFinalizar = document.getElementById("boton-finalizar");

let cuadroNarracion = document.getElementById("cuadro-narracion");
let textoFinal = document.getElementById("texto-final");


// MÚSICA DE FONDO

let musicaAmbiente = new Audio("../../sonidos/música ambiente.mp3");

// La música continúa en bucle.
musicaAmbiente.loop = true;

// Ajustar el volumen.
musicaAmbiente.volume = 0.35;


// SONIDO DEL SUSPIRO

let suspiro = new Audio("../../sonidos/suspiro con oh.mp3");

// Ajustar el volumen del suspiro.
suspiro.volume = 0.8;


// FUNCIÓN PARA REPRODUCIR LA MÚSICA AMBIENTE

function reproducirMusicaAmbiente() {

    musicaAmbiente.play().catch(function() {

        // Si el navegador bloquea la reproducción automática,
        // se intentará reproducir después de una interacción.
        console.log("El navegador bloqueó la música ambiente.");

    });

}


// FUNCIÓN PARA RECUPERAR LA POSICIÓN DE LA MÚSICA

function recuperarMusica() {

    // Buscar el segundo en el que quedó la música
    // al salir del Momento 5.
    let posicionGuardada =
        sessionStorage.getItem("posicionMusicaAmbiente");

    if (posicionGuardada !== null) {

        musicaAmbiente.currentTime = Number(posicionGuardada);

    }

    // Intentar continuar la música.
    reproducirMusicaAmbiente();

}


// CARGAR LOS TEXTOS DEL ARCHIVO JSON

async function cargarDatos() {

    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();


    // MOSTRAR LA NARRACIÓN DE PAPÁ NOEL

    narracion.textContent = datos.narracion;


    // MOSTRAR EL MENSAJE FINAL

    mensaje.textContent = datos.mensaje;


    // MOSTRAR EL BOTÓN

    botonFinalizar.textContent = datos.boton;

    botonFinalizar.style.display = "block";


    // RECUPERAR Y CONTINUAR LA MÚSICA

    recuperarMusica();


    // REPRODUCIR EL SUSPIRO DE PAPÁ NOEL

    suspiro.currentTime = 0;

    suspiro.play().catch(function() {

        console.log("No se pudo reproducir el suspiro.");

    });

}


// CUANDO EL USUARIO PRESIONA FINALIZAR

botonFinalizar.onclick = async function() {

    // DETENER LA MÚSICA AMBIENTE

    musicaAmbiente.pause();


    // OCULTAR LOS ELEMENTOS DE LA PRIMERA PANTALLA

    cuadroNarracion.style.display = "none";
    textoFinal.style.display = "none";
    botonFinalizar.style.display = "none";


    // CARGAR EL MENSAJE DE DESPEDIDA

    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    narracion.textContent = datos.mensajeFinal;


    // MOSTRAR EL MENSAJE FINAL

    cuadroNarracion.style.display = "block";

};


// INICIAR LA PANTALLA

cargarDatos();
