
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

// Busca los elementos del HTML utilizando sus identificadores.
let titulo = document.getElementById("titulo");
let narracion = document.getElementById("narracion");


// FUNCIÓN PARA CARGAR LOS DATOS

// async permite utilizar await para esperar a que se cargue la información.
async function cargarDatos() {

    // Busca el archivo datos.json.
    let respuesta = await fetch("datos.json");

    // Convierte la información del JSON para poder utilizarla en JavaScript.
    let datos = await respuesta.json();


    // MOSTRAR LOS TEXTOS

    // Coloca el título del JSON dentro del primer recuadro.
    titulo.textContent = datos.titulo;

    // Coloca el pensamiento de Papá Noel dentro del segundo recuadro.
    narracion.textContent = datos.narracion;


    // AUDIOS

    // Crea un reproductor para la música navideña.
    let musica = new Audio(datos.audio.musica);

    // Crea un reproductor para el sonido del reloj.
    let reloj = new Audio(datos.audio.reloj);

    // Hace que la música se repita mientras permanezca abierta la pantalla.
    musica.loop = true;

    // Hace que el tic-tac también se repita.
    reloj.loop = true;

    // Ajusta el volumen de la música. El valor va de 0 a 1.
    musica.volume = 0.35;

    // Ajusta el volumen del reloj.
    reloj.volume = 0.25;


    // INTENTAR REPRODUCIR LOS AUDIOS

    // Intenta iniciar la música cuando se carga la pantalla.
    // catch permite manejar el caso en que el navegador bloquee la reproducción automática.
    musica.play().catch(function() {
        console.log("El navegador no permitió reproducir la música automáticamente");
    });

    // Intenta iniciar el sonido del reloj.
    reloj.play().catch(function() {
        console.log("El navegador no permitió reproducir el reloj automáticamente");
    });

}


// INICIAR LA PANTALLA

// Borra el progreso anterior porque estamos comenzando una partida nueva.
reiniciarPartida();

// Llama a la función para cargar los textos y preparar los audios.
cargarDatos();
