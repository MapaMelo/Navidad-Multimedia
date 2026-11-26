
// REINICIAR LOS DATOS DE LA PARTIDA

function reiniciarPartida() {

    // MOMENTO 2: REGALOS
    localStorage.removeItem("juguetesTerminados");
    localStorage.removeItem("jugueteSeleccionado");
    localStorage.removeItem("papelSeleccionado");

    // MOMENTO 2: COMENTARIO DE LA MÚSICA
    localStorage.removeItem("comentarioMusicaMostrado");

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

let reloj;
let ohOtraVez;


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

    // Sonido del reloj que ya teníamos en el proyecto.
    reloj = new Audio(datos.audio.reloj);

    // Sonido de Papá Noel cuando piensa: "Otra vez...".
    ohOtraVez = new Audio("../../sonidos/oh de otra vez.mp3");


    // El reloj se repite.
    reloj.loop = true;


    // VOLUMEN DE LOS AUDIOS

    reloj.volume = 0.25;
    ohOtraVez.volume = 0.8;


    // REPRODUCIR EL RELOJ

    reloj.play().catch(function() {

        console.log("El navegador bloqueó el sonido del reloj.");

    });


    // REPRODUCIR OH DE OTRA VEZ

    // Espera cinco segundos antes de reproducir el sonido.
    setTimeout(function() {

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

    }, 5000);

}


// BOTÓN PARA COMENZAR

botonComenzar.addEventListener("click", function(event) {

    // Evita que el enlace cambie de pantalla inmediatamente.
    event.preventDefault();

    // Intenta iniciar la música feliz desde el reproductor principal.
    // Si ya está sonando, el index principal no la reinicia.
    window.parent.postMessage("iniciar-musica-feliz", "*");


    // Espera un segundo para que la música alcance a escucharse.
    setTimeout(function() {

        // Pasa a la pantalla de preparación de regalos.
        window.location.href = botonComenzar.href;

    }, 1000);

});


// INICIAR LA PANTALLA

// Borra el progreso anterior porque estamos comenzando una partida nueva.
reiniciarPartida();

// Carga los textos y prepara los audios.
cargarDatos();


// AVISAR AL INDEX PRINCIPAL QUE DEBE REINICIAR LAS MÚSICAS

window.parent.postMessage("reiniciar-musicas", "*");

// AVISAR AL INDEX PRINCIPAL QUE DEBE INICIAR LA MÚSICA FELIZ

window.parent.postMessage("iniciar-musica-feliz", "*");
