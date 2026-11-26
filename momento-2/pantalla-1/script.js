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

let musicaFeliz = new Audio("../../sonidos/música feliz.mp3");
let suspiro = new Audio("../../sonidos/suspiro con oh.mp3");


// La música feliz se repite mientras permanezca activa.
musicaFeliz.loop = true;

// Ajusta el volumen de los audios.
musicaFeliz.volume = 0.35;
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


    // RECUPERAR LA POSICIÓN DE LA MÚSICA

    let posicionGuardada = sessionStorage.getItem("posicionMusicaFeliz");

    if (posicionGuardada !== null) {

        // Continúa desde el segundo en el que quedó en Momento 1.
        musicaFeliz.currentTime = Number(posicionGuardada);

    }


    // REPRODUCIR LA MÚSICA FELIZ

    musicaFeliz.play().then(function() {

        console.log("La música feliz continúa en Momento 2.");

    }).catch(function() {

        console.log("El navegador bloqueó la música automática.");

    });


    // REPRODUCIR LA QUEJA DE PAPÁ NOEL

    // Espera un momento para que primero aparezca el texto.
    setTimeout(function() {

        suspiro.play().catch(function() {

            console.log("No se pudo reproducir el suspiro.");

        });

    }, 1500);

}


// GUARDAR LA POSICIÓN DE LA MÚSICA ANTES DE CAMBIAR DE PANTALLA

zonaRegalos.addEventListener("click", function() {

    // Guarda el segundo exacto en el que va la música.
    sessionStorage.setItem("posicionMusicaFeliz", musicaFeliz.currentTime);

});


// INICIAR PANTALLA

cargarDatos();