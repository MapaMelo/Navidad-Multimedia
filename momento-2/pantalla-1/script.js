
// ELEMENTOS DE LA PANTALLA

let titulo = document.getElementById("titulo");
let narracion = document.getElementById("narracion");
let cantidadRegalos = document.getElementById("cantidad-regalos");
let zonaRegalos = document.getElementById("zona-regalos");


// ANIMACIÓN TAP

let animacionTap = document.getElementById("animacion-tap");

lottie.loadAnimation({

    container: animacionTap,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/tap.json"

});


// VARIABLES DE LOS AUDIOS

// El suspiro sigue siendo un sonido propio de esta pantalla.
let suspiro = new Audio("../../sonidos/suspiro con oh.mp3");


// AJUSTAR EL VOLUMEN

suspiro.volume = 0.8;


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido.
    let datos = await respuesta.json();


    // MOSTRAR LOS TEXTOS

    titulo.textContent = datos.titulo;
    narracion.textContent = datos.narracion;


    // CONTADOR DE REGALOS

    let juguetesTerminados = JSON.parse(localStorage.getItem("juguetesTerminados")) || [];

    let cantidad = juguetesTerminados.length;

    cantidadRegalos.textContent = cantidad + "/6";


    // DESTINO DE LA ANIMACIÓN

    if (cantidad === 6) {

        // Si ya se terminaron los seis regalos, pasa al trineo.
        zonaRegalos.href = "../../momento-3/pantalla-1/trineo.html";

    } else {

        // Si faltan regalos, permite volver a la estantería.
        zonaRegalos.href = "../pantalla-2/estanteria.html";

    }


    // REPRODUCIR LA QUEJA DE PAPÁ NOEL

    // Espera un momento para que primero aparezca el texto.
    setTimeout(function() {

        suspiro.play().catch(function() {

            console.log("No se pudo reproducir el suspiro.");

        });

    }, 1500);

}


// INICIAR PANTALLA

// Carga los textos y actualiza el contador.
cargarDatos();
