// REINICIAR LOS DATOS DE LA PARTIDA

function reiniciarPartida() {

    // MOMENTO 2: REGALOS
    localStorage.removeItem("juguetesTerminados");
    localStorage.removeItem("jugueteSeleccionado");
    localStorage.removeItem("papelSeleccionado");

    // MOMENTO 4: MAPA
    localStorage.removeItem("lugarSeleccionado");

    // MOMENTO 5: ENTREGAS
    localStorage.removeItem("ventanasEntregadas");
    localStorage.removeItem("ventanaSeleccionada");
    localStorage.removeItem("regaloActual");

}


// ELEMENTOS DE LA PANTALLA

let titulo = document.getElementById("titulo");
let narracion = document.getElementById("narracion");
let botonComenzar = document.getElementById("boton-comenzar");


// VARIABLES DE LOS AUDIOS

let musicaFeliz;
let reloj;
let ohOtraVez;

let musicaIniciada = false;
let ohReproducido = false;


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    // Busca el archivo datos.json.
    let respuesta = await fetch("datos.json");

    // Convierte la información del JSON.
    let datos = await respuesta.json();


    // MOSTRAR LOS TEXTOS

    titulo.textContent = datos.titulo;
    narracion.textContent = datos.narracion;


    // AUDIOS

    // Música feliz que acompaña el inicio.
    musicaFeliz = new Audio("../../sonidos/música feliz.mp3");

    // Sonido del reloj que ya teníamos en el proyecto.
    reloj = new Audio(datos.audio.reloj);

    // Sonido de Papá Noel cuando piensa: "Otra vez...".
    ohOtraVez = new Audio("../../sonidos/oh de otra vez.mp3");


    // La música feliz se repite mientras esté activa.
    musicaFeliz.loop = true;

    // El reloj también se repite.
    reloj.loop = true;


    // VOLUMEN DE LOS AUDIOS

    musicaFeliz.volume = 0.35;
    reloj.volume = 0.25;
    ohOtraVez.volume = 0.8;


    // REPRODUCIR LA MÚSICA FELIZ

    musicaFeliz.play().then(function() {

        // Indica que la música sí pudo comenzar.
        musicaIniciada = true;

    }).catch(function() {

        // Algunos navegadores bloquean la música automática.
        console.log("El navegador bloqueó la reproducción automática.");

    });


    // REPRODUCIR EL RELOJ

    reloj.play().catch(function() {

        console.log("El navegador bloqueó el sonido del reloj.");

    });


    // REPRODUCIR OH DE OTRA VEZ

    // Espera hasta que la música llegue al segundo 5.
    musicaFeliz.addEventListener("timeupdate", function() {

        if (musicaFeliz.currentTime >= 5 && ohReproducido === false) {

            // Marca el sonido para que no se repita.
            ohReproducido = true;

            // Empieza a reproducir desde el segundo 5 del archivo.
            ohOtraVez.currentTime = 5;

            ohOtraVez.play().then(function() {

                // Un segundo después, detiene el sonido.
                setTimeout(function() {

                    ohOtraVez.pause();

                    // Deja el audio preparado para otra reproducción.
                    ohOtraVez.currentTime = 5;

                }, 1000);

            }).catch(function() {

                console.log("No se pudo reproducir oh de otra vez.");

            });

        }

    });

}


// BOTÓN PARA COMENZAR

botonComenzar.addEventListener("click", function(event) {

    // Evita que el enlace cambie de pantalla inmediatamente.
    event.preventDefault();


    // FUNCIÓN PARA PASAR A MOMENTO 2

    function pasarAMomento2() {

        // Guarda el segundo exacto en el que quedó la música.
        sessionStorage.setItem("posicionMusicaFeliz", musicaFeliz.currentTime);

        // Indica que la música feliz estaba activa.
        sessionStorage.setItem("musicaFelizActiva", "true");

        // Guarda si ya se reprodujo el sonido de "oh de otra vez".
        sessionStorage.setItem("ohOtraVezReproducido", ohReproducido);

        // Pasa a la pantalla de preparación de regalos.
        window.location.href = botonComenzar.href;

    }


    // Si la música ya está sonando, pasa directamente.
    if (musicaIniciada === true) {

        pasarAMomento2();

    } else {

        // Si el navegador bloqueó la música automática,
        // intenta iniciarla con el clic del usuario.
        musicaFeliz.play().then(function() {

            musicaIniciada = true;

            // Espera un segundo para que alcance a escucharse.
            setTimeout(function() {

                pasarAMomento2();

            }, 1000);

        }).catch(function() {

            // Si tampoco se puede reproducir, continúa normalmente.
            pasarAMomento2();

        });

    }

});


// INICIAR LA PANTALLA

// Borra el progreso anterior porque estamos comenzando una partida nueva.
reiniciarPartida();

// Carga los textos y prepara los audios.
cargarDatos();

// AVISAR AL INDEX PRINCIPAL QUE DEBE INICIAR LA MÚSICA

window.parent.postMessage("iniciar-musica-feliz", "*");