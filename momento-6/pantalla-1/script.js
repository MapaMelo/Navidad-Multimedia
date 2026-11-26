
/* ELEMENTOS DE LA PANTALLA */

let narracion = document.getElementById("narracion");
let mensaje = document.getElementById("mensaje");
let botonFinalizar = document.getElementById("boton-finalizar");

let cuadroNarracion = document.getElementById("cuadro-narracion");
let textoFinal = document.getElementById("texto-final");


// SONIDO DEL SUSPIRO

let suspiro = new Audio("../../sonidos/suspiro con oh.mp3");

// Ajustar el volumen del suspiro.
suspiro.volume = 0.8;


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


    // EL CUADRO DEL MENSAJE FINAL PERMANECE OCULTO
    // HASTA QUE EL USUARIO PRESIONE FINALIZAR.

    textoFinal.style.display = "none";


    // REPRODUCIR EL SUSPIRO DE PAPÁ NOEL

    suspiro.currentTime = 0;

    suspiro.play().catch(function() {

        console.log("No se pudo reproducir el suspiro.");

    });

}


// CUANDO EL USUARIO PRESIONA FINALIZAR

botonFinalizar.onclick = async function() {

    // AVISAR AL INDEX PRINCIPAL QUE DEBE DETENER LA MÚSICA.

    window.parent.postMessage("detener-musicas", "*");


    // DETENER EL SUSPIRO SI TODAVÍA ESTÁ SONANDO.

    suspiro.pause();


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
