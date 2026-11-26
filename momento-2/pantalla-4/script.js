// ELEMENTOS DE LA PANTALLA

let pantalla = document.getElementById("pantalla");
let regalo = document.getElementById("regalo");
let narracion = document.getElementById("narracion");
let cantidadRegalos = document.getElementById("cantidad-regalos");
let guiaGesto = document.getElementById("guia-gesto");
let mensajeFinal = document.getElementById("mensaje-final");
let botonContinuar = document.getElementById("boton-continuar");


// AUDIOS

// Crea el audio de Christmas Wrapping.
let musicaAmbiente = new Audio("../../sonidos/música ambiente.mp3");

// Hace que la canción se repita continuamente.
musicaAmbiente.loop = true;

// Ajusta el volumen de la música.
musicaAmbiente.volume = 0.35;

// Crea los dos sonidos de envolver.
let sonidoEnvolver1 = new Audio("../../sonidos/envolver1.mp3");
let sonidoEnvolver2 = new Audio("../../sonidos/envolver2.mp3");

// Ajusta el volumen de los sonidos.
sonidoEnvolver1.volume = 0.8;
sonidoEnvolver2.volume = 0.8;


// ANIMACIONES DE LA GUÍA DEL GESTO

// Recupera los dos espacios de las animaciones.
let gestoIzquierda = document.getElementById("gesto-izquierda");
let gestoDerecha = document.getElementById("gesto-derecha");

// ANIMACIÓN DE LA MANO IZQUIERDA.
lottie.loadAnimation({

    container: gestoIzquierda,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/gesto.json"

});

// ANIMACIÓN DE LA MANO DERECHA.
lottie.loadAnimation({

    container: gestoDerecha,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/gesto.json"

});


// RECUPERAR LAS ELECCIONES GUARDADAS

let juguete = localStorage.getItem("jugueteSeleccionado");
let papel = localStorage.getItem("papelSeleccionado");

// Lista de juguetes terminados.
let juguetesTerminados = JSON.parse(localStorage.getItem("juguetesTerminados")) || [];


// NÚMERO DE CADA JUGUETE

let numerosJuguetes = {
    "matriushkas": "1",
    "robot": "2",
    "libros": "3",
    "oso": "4",
    "muneca": "5",
    "balon": "6"
};


// IMÁGENES DE LOS JUGUETES SOBRE EL PAPEL

let imagenesIniciales = {
    "matriushkas": "Matriushcas.jpg",
    "robot": "Robot.jpg",
    "libros": "Libros.jpg",
    "oso": "Oso.jpg",
    "muneca": "Muñeca.jpg",
    "balon": "Pelota.jpg"
};


// VARIABLES PARA RECONOCER EL GESTO

let distanciaInicial = 0;
let gestoCompletado = false;


// FUNCIÓN PARA REPRODUCIR LA MÚSICA AMBIENTE

function iniciarMusica() {

    // Evita volver a iniciar la canción si ya está sonando.
    if (musicaAmbiente.paused) {

        musicaAmbiente.play().catch(function() {
            console.log("El navegador no permitió reproducir la música automáticamente");
        });

    }

}


// FUNCIÓN PARA CALCULAR LA DISTANCIA ENTRE DOS DEDOS

function calcularDistancia(dedo1, dedo2) {

    let diferenciaX = dedo2.clientX - dedo1.clientX;
    let diferenciaY = dedo2.clientY - dedo1.clientY;

    return Math.sqrt(
        diferenciaX * diferenciaX +
        diferenciaY * diferenciaY
    );
}


// FUNCIÓN PARA CARGAR LA PANTALLA

async function cargarDatos() {

    // COMPROBAR QUE EXISTAN LAS DOS ELECCIONES.
    if (!juguete || !papel || !numerosJuguetes[juguete]) {
        window.location.href = "../pantalla-2/estanteria.html";
        return;
    }

    // SI EL JUGUETE YA ESTABA TERMINADO, VOLVER A LA ESTANTERÍA.
    if (juguetesTerminados.includes(juguete)) {
        window.location.href = "../pantalla-2/estanteria.html";
        return;
    }

    // MOSTRAR EL JUGUETE SOBRE EL PAPEL.
    regalo.src = "assets/" + imagenesIniciales[juguete];

    // MOSTRAR EL CONTADOR.
    cantidadRegalos.textContent = juguetesTerminados.length + "/6";

    // CARGAR LOS DATOS DEL JSON.
    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    // MOSTRAR EL PENSAMIENTO DE PAPÁ NOEL.
    narracion.textContent = datos.narracion;


    // CONTINUAR LA MÚSICA AMBIENTE.

    // Recupera el segundo en el que quedó la canción.
    let posicionGuardada = sessionStorage.getItem("posicionMusicaAmbiente");

    // Si existe una posición guardada, continúa desde ese segundo.
    if (posicionGuardada !== null) {
        musicaAmbiente.currentTime = Number(posicionGuardada);
    }

    // Reproduce Christmas Wrapping.
    iniciarMusica();

}


// DETECTAR CUANDO SE COLOCAN DOS DEDOS

pantalla.addEventListener("touchstart", function(event) {

    // COMPROBAR QUE HAYA EXACTAMENTE DOS DEDOS.
    if (event.touches.length === 2 && !gestoCompletado) {

        // Si la música no había empezado, intenta reproducirla.
        iniciarMusica();

        // GUARDAR LA DISTANCIA INICIAL.
        distanciaInicial = calcularDistancia(
            event.touches[0],
            event.touches[1]
        );
    }

}, { passive: false });


// DETECTAR CUANDO LOS DEDOS SE ACERCAN

pantalla.addEventListener("touchmove", function(event) {

    // COMPROBAR QUE SIGAN HABIENDO DOS DEDOS.
    if (event.touches.length === 2 && !gestoCompletado) {

        // EVITAR QUE LA PÁGINA SE DESPLACE.
        event.preventDefault();

        // CALCULAR LA DISTANCIA ACTUAL.
        let distanciaActual = calcularDistancia(
            event.touches[0],
            event.touches[1]
        );

        // COMPROBAR SI LOS DEDOS SE ACERCARON SUFICIENTE.
        if (distanciaInicial > 0 &&
            distanciaActual < distanciaInicial * 0.60) {

            terminarRegalo();
        }
    }

}, { passive: false });


// FUNCIÓN PARA TERMINAR EL REGALO

function terminarRegalo() {

    // EVITAR QUE SE COMPLETE MÁS DE UNA VEZ.
    if (gestoCompletado) {
        return;
    }

    gestoCompletado = true;

    // OBTENER EL NÚMERO DEL JUGUETE.
    let numeroJuguete = numerosJuguetes[juguete];

    // CONSTRUIR EL NOMBRE DE LA IMAGEN FINAL.
    let imagenFinal = numeroJuguete + ". Papel " + papel + ".jpg";

    // MOSTRAR EL REGALO ENVUELTO.
    regalo.src = "assets/" + imagenFinal;


    // REPRODUCIR LOS SONIDOS DE ENVOLVER.

    // Alterna los sonidos según la cantidad de regalos terminados.
    // Los regalos impares usan envolver1.mp3.
    // Los regalos pares usan envolver2.mp3.

    if ((juguetesTerminados.length + 1) % 2 === 1) {

        // Reproduce el primer sonido desde el comienzo.
        sonidoEnvolver1.currentTime = 0;
        sonidoEnvolver1.play().catch(function() {
            console.log("No se pudo reproducir el sonido de envolver");
        });

    } else {

        // Reproduce el segundo sonido desde el comienzo.
        sonidoEnvolver2.currentTime = 0;
        sonidoEnvolver2.play().catch(function() {
            console.log("No se pudo reproducir el sonido de envolver");
        });

    }


    // AGREGAR EL JUGUETE A LA LISTA DE TERMINADOS.
    juguetesTerminados.push(juguete);

    // GUARDAR LA LISTA ACTUALIZADA.
    localStorage.setItem(
        "juguetesTerminados",
        JSON.stringify(juguetesTerminados)
    );

    // ACTUALIZAR EL CONTADOR.
    cantidadRegalos.textContent = juguetesTerminados.length + "/6";


    // CAMBIAR EL PENSAMIENTO SEGÚN EL REGALO TERMINADO.

    if (juguetesTerminados.length === 1) {
        narracion.textContent = "Uno menos. Qué emoción";

    } else if (juguetesTerminados.length === 2) {
        narracion.textContent = "Bueno, cinco más. Esto va para largo";

    } else if (juguetesTerminados.length === 3) {
        narracion.textContent = "¿No podían pedir todos lo mismo?";

    } else if (juguetesTerminados.length === 4) {
        narracion.textContent = "Me duelen hasta las manos...";

    } else if (juguetesTerminados.length === 5) {
        narracion.textContent = "Ya casi. Eso espero";

    } else if (juguetesTerminados.length === 6) {
        narracion.textContent = "¡Por fin el último! No quiero volver a ver un juguete nunca más en mi vida";
    }


    // OCULTAR LA GUÍA DEL GESTO.
    guiaGesto.style.display = "none";

    // MOSTRAR EL MENSAJE Y EL BOTÓN.
    mensajeFinal.style.display = "block";

    // BORRAR LAS ELECCIONES QUE YA SE UTILIZARON.
    localStorage.removeItem("jugueteSeleccionado");
    localStorage.removeItem("papelSeleccionado");
}


// BOTÓN PARA CONTINUAR

botonContinuar.onclick = function() {

    // Guardar el segundo exacto de Christmas Wrapping.
    sessionStorage.setItem("posicionMusicaAmbiente", musicaAmbiente.currentTime);

    // SI YA ESTÁN LOS SEIS REGALOS, IR AL TRINEO.
    if (juguetesTerminados.length === 6) {

        window.location.href = "../../momento-3/pantalla-1/trineo.html";

    } else {

        // SI FALTAN REGALOS, VOLVER DIRECTAMENTE A LA ESTANTERÍA.
        window.location.href = "../pantalla-2/estanteria.html";

    }
};


// INICIAR PANTALLA

cargarDatos();