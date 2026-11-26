
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


// SONIDOS

let bostezo = new Audio("../../sonidos/bostezo.mp3");
let suspiro = new Audio("../../sonidos/suspiro con oh.mp3");

// Ajustar el volumen de los sonidos.
bostezo.volume = 0.8;
suspiro.volume = 0.8;

// Indica si el bostezo ya se reprodujo.
let bostezoReproducido = false;


// FUNCIÓN PARA REPRODUCIR EL BOSTEZO

function reproducirBostezo() {

    // Evitar que el bostezo se reproduzca más de una vez.
    if (bostezoReproducido === false) {

        bostezo.play().then(function() {

            // Indicar que el sonido ya comenzó.
            bostezoReproducido = true;

        }).catch(function() {

            // Si el navegador bloquea el sonido,
            // se intentará reproducir en el primer toque.
            console.log("El navegador bloqueó el bostezo automático.");

        });

    }

}


// ANIMACIONES DE LOS CINCO DEDOS

// Cargar una animación de tap en cada uno de los cinco espacios.
for (let i = 0; i < 5; i++) {

    lottie.loadAnimation({

        container: animacionesTap[i],
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "../../momento-2/pantalla-1/assets/tap.json"

    });

}


// EVITAR QUE APAREZCA EL MENÚ DEL NAVEGADOR

document.addEventListener("contextmenu", function(event) {

    event.preventDefault();

});


// VARIABLES DE LA INTERACCIÓN

let cantidadDedos = 0;
let tiempo = 0;
let temporizador = null;
let preparacionCompletada = false;
let intentosFallidos = 0;
let datos;


// FUNCIÓN PARA MOSTRAR LAS ANIMACIONES PROGRESIVAMENTE

function actualizarAnimaciones(cantidad) {

    for (let i = 0; i < 5; i++) {

        if (i === cantidad) {

            animacionesTap[i].style.display = "block";

        } else {

            animacionesTap[i].style.display = "none";

        }

    }

    if (cantidad === 5) {

        guiaGesto.style.display = "none";

    } else {

        guiaGesto.style.display = "block";

    }

}


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    let respuesta = await fetch("datos.json");
    datos = await respuesta.json();

    narracion.textContent = datos.narraciones[0];

    actualizarAnimaciones(0);

    // Intentar reproducir el bostezo al entrar a la pantalla.
    reproducirBostezo();

}


// FUNCIÓN PARA ACTUALIZAR LA IMAGEN Y LOS TEXTOS

function actualizarPantalla(cantidad) {

    if (preparacionCompletada) {
        return;
    }

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

        if (temporizador === null) {

            iniciarTemporizador();

        }

    } else {

        if (temporizador !== null) {

            intentosFallidos = intentosFallidos + 1;

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

    // Si el bostezo no pudo sonar al entrar,
    // intentar reproducirlo con el primer toque.
    reproducirBostezo();

    let cantidad = event.touches.length;

    if (cantidad > 5) {
        cantidad = 5;
    }

    actualizarPantalla(cantidad);

});


// DETECTAR CUANDO SE LEVANTAN LOS DEDOS

document.addEventListener("touchend", function(event) {

    let cantidad = event.touches.length;

    actualizarPantalla(cantidad);

});


// DETECTAR SI SE INTERRUMPE EL TOQUE

document.addEventListener("touchcancel", function(event) {

    let cantidad = event.touches.length;

    actualizarPantalla(cantidad);

});


// FUNCIÓN PARA INICIAR EL TEMPORIZADOR

function iniciarTemporizador() {

    tiempo = 0;

    temporizador = setInterval(function() {

        tiempo = tiempo + 1;

        // AHORA SOLO NECESITA TRES SEGUNDOS

        if (tiempo >= 3) {

            clearInterval(temporizador);

            temporizador = null;

            preparacionCompletada = true;

            guiaGesto.style.display = "none";

            botonVamos.style.display = "block";


            // Reproducir el suspiro cuando termina la preparación.

            suspiro.currentTime = 0;

            suspiro.play().catch(function() {

                console.log("No se pudo reproducir el suspiro.");

            });

        }

    }, 1000);

}


// BOTÓN PARA CONTINUAR

botonVamos.onclick = function() {

    // Ir al mapa del mundo.
    window.location.href = "../../momento-4/pantalla-1/mapa.html";

};


// INICIAR PANTALLA

cargarDatos();
