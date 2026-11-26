
// ELEMENTOS DE LA PANTALLA

let trineo = document.getElementById("trineo");
let narracion = document.getElementById("narracion");
let guiaGesto = document.getElementById("guia-gesto");
let botonVamos = document.getElementById("boton-vamos");

// GUARDAR LOS CINCO ESPACIOS DE LAS ANIMACIONES
let animacionesTap = [
    document.getElementById("dedo-1"),
    document.getElementById("dedo-2"),
    document.getElementById("dedo-3"),
    document.getElementById("dedo-4"),
    document.getElementById("dedo-5")
];


// ANIMACIONES DE LOS CINCO DEDOS

// Cargar una animación de tap en cada uno de los cinco espacios.
for (let i = 0; i < 5; i++) {

    lottie.loadAnimation({

        // Lugar donde aparecerá cada animación.
        container: animacionesTap[i],

        // Dibujar la animación utilizando SVG.
        renderer: "svg",

        // Repetir la animación continuamente.
        loop: true,

        // Reproducir automáticamente.
        autoplay: true,

        // Utilizar el mismo archivo de animación tap.
        path: "../../momento-2/pantalla-1/assets/tap.json"

    });

}


// EVITAR QUE APAREZCA EL MENÚ DEL NAVEGADOR

document.addEventListener("contextmenu", function(event) {

    // Impedir que aparezcan las opciones del navegador.
    event.preventDefault();

});


// VARIABLES DE LA INTERACCIÓN

// Guarda la cantidad de dedos apoyados.
let cantidadDedos = 0;

// Guarda el tiempo que llevan los cinco dedos apoyados.
let tiempo = 0;

// Guarda el temporizador.
let temporizador = null;

// Indica si ya se completó la preparación del trineo.
let preparacionCompletada = false;

// Cuenta los intentos fallidos del usuario.
let intentosFallidos = 0;

// Guarda la información del archivo JSON.
let datos;


// FUNCIÓN PARA MOSTRAR LAS ANIMACIONES PROGRESIVAMENTE

function actualizarAnimaciones(cantidad) {

    // Mostrar solamente la animación del siguiente dedo que debe apoyarse.
    for (let i = 0; i < 5; i++) {

        if (i === cantidad) {

            animacionesTap[i].style.display = "block";

        } else {

            animacionesTap[i].style.display = "none";

        }

    }

    // Cuando ya están apoyados los cinco dedos, ocultar todas las animaciones.
    if (cantidad === 5) {

        guiaGesto.style.display = "none";

    } else {

        guiaGesto.style.display = "block";

    }

}


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido para utilizarlo en JavaScript.
    datos = await respuesta.json();

    // Muestra el pensamiento inicial.
    narracion.textContent = datos.narraciones[0];

    // Al principio aparece la primera animación.
    actualizarAnimaciones(0);

}


// FUNCIÓN PARA ACTUALIZAR LA IMAGEN Y LOS TEXTOS

function actualizarPantalla(cantidad) {

    // No cambia la pantalla si ya terminó la preparación.
    if (preparacionCompletada) {
        return;
    }

    // Guarda la cantidad actual de dedos.
    cantidadDedos = cantidad;


    // CAMBIAR EL FONDO SEGÚN LOS DEDOS APOYADOS

    if (cantidadDedos === 0) {

        trineo.style.backgroundImage = "url('assets/dedos0.jpg')";

    } else {

        trineo.style.backgroundImage = "url('assets/dedo" + cantidadDedos + ".jpg')";

    }


    // ACTUALIZAR LAS ANIMACIONES DE LOS DEDOS

    actualizarAnimaciones(cantidadDedos);


    // ACTUALIZAR EL PENSAMIENTO DE PAPÁ NOEL

    if (datos) {

        if (cantidadDedos > 0) {

            narracion.textContent = datos.narraciones[cantidadDedos - 1];

        } else if (intentosFallidos === 0) {

            narracion.textContent = datos.narraciones[0];

        }

    }


    // REVISAR SI ESTÁN APOYADOS LOS CINCO DEDOS

    if (cantidadDedos === 5) {

        // Iniciar el temporizador si todavía no está funcionando.
        if (temporizador === null) {

            iniciarTemporizador();

        }

    } else {

        // COMPROBAR SI EL USUARIO HABÍA APOYADO LOS CINCO DEDOS

        if (temporizador !== null) {

            // Aumentar la cantidad de intentos fallidos.
            intentosFallidos = intentosFallidos + 1;


            // MOSTRAR UN COMENTARIO SEGÚN EL INTENTO

            if (intentosFallidos === 1) {

                narracion.textContent = "No pasa nada, vuelve a intentarlo.";

            } else if (intentosFallidos === 2) {

                narracion.textContent = "Vamos... ¿tan difícil es?";

            } else if (intentosFallidos >= 3) {

                narracion.textContent = "¡Pero qué te pasa! ¡Mantén espichado!";

            }

        }


        // REINICIAR EL TEMPORIZADOR

        clearInterval(temporizador);

        temporizador = null;

        tiempo = 0;

    }

}


// DETECTAR CUANDO SE APOYAN LOS DEDOS

document.addEventListener("touchstart", function(event) {

    // Contar los dedos que están apoyados.
    let cantidad = event.touches.length;

    // Como máximo se reconocen cinco dedos.
    if (cantidad > 5) {

        cantidad = 5;

    }

    // Actualizar la pantalla.
    actualizarPantalla(cantidad);

});


// DETECTAR CUANDO SE LEVANTAN LOS DEDOS

document.addEventListener("touchend", function(event) {

    // Contar cuántos dedos siguen apoyados.
    let cantidad = event.touches.length;

    // Actualizar la pantalla.
    actualizarPantalla(cantidad);

});


// DETECTAR SI SE INTERRUMPE EL TOQUE

document.addEventListener("touchcancel", function(event) {

    // Contar cuántos dedos siguen apoyados.
    let cantidad = event.touches.length;

    // Actualizar la pantalla.
    actualizarPantalla(cantidad);

});


// FUNCIÓN PARA INICIAR EL TEMPORIZADOR

function iniciarTemporizador() {

    // Comenzar a contar desde cero.
    tiempo = 0;

    // Revisar el tiempo cada segundo.
    temporizador = setInterval(function() {

        // Aumentar el contador de segundos.
        tiempo = tiempo + 1;

        // Comprobar si ya pasaron cinco segundos.
        if (tiempo >= 5) {

            // Detener el temporizador.
            clearInterval(temporizador);

            temporizador = null;

            // Indicar que la preparación terminó.
            preparacionCompletada = true;

            // Ocultar la guía.
            guiaGesto.style.display = "none";

            // Mostrar el botón para continuar.
            botonVamos.style.display = "block";

        }

    }, 1000);

}


// BOTÓN PARA CONTINUAR

botonVamos.onclick = function() {

    // Pasar al mapa del siguiente momento.
    window.location.href = "../../momento-4/pantalla-1/mapa.html";

};


// INICIAR PANTALLA

cargarDatos();
