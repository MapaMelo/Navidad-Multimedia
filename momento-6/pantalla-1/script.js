
// ELEMENTOS DE LA PANTALLA

let narracion = document.getElementById("narracion");
let mensaje = document.getElementById("mensaje");
let botonFinalizar = document.getElementById("boton-finalizar");

let cuadroNarracion = document.getElementById("cuadro-narracion");
let textoFinal = document.getElementById("texto-final");


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

}


// CUANDO EL USUARIO PRESIONA FINALIZAR

botonFinalizar.onclick = async function() {

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
