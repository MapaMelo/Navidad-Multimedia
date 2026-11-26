// ELEMENTOS DE LA PANTALLA

// Busca los elementos del HTML donde aparecerán los textos.
let titulo = document.getElementById("titulo");
let cantidadRegalos = document.getElementById("cantidad-regalos");
let zonaRegalos = document.getElementById("zona-regalos");


// ANIMACIÓN TAP

// Busca el espacio del HTML donde se reproducirá la animación.
let animacionTap = document.getElementById("animacion-tap");

// Carga y reproduce la animación que guardamos en la carpeta assets.
lottie.loadAnimation({

    // Indica dónde aparecerá la animación.
    container: animacionTap,

    // Utiliza SVG para dibujar los elementos de la animación.
    renderer: "svg",

    // Hace que la animación se repita continuamente.
    loop: true,

    // Hace que la animación comience automáticamente.
    autoplay: true,

    // Indica la ubicación del archivo JSON de la animación.
    path: "assets/tap.json"

});


// FUNCIÓN PARA CARGAR LOS DATOS

// Carga la información guardada en datos.json.
async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido para utilizarlo en JavaScript.
    let datos = await respuesta.json();

    // Muestra la instrucción principal.
    titulo.textContent = datos.titulo;

    // Recupera la lista de regalos que ya se terminaron.
    let juguetesTerminados = JSON.parse(localStorage.getItem("juguetesTerminados")) || [];

    // Cuenta cuántos regalos se han terminado.
    let cantidad = juguetesTerminados.length;

    // Actualiza el contador.
    cantidadRegalos.textContent = cantidad + "/6";

    // Si ya se terminaron los seis regalos, cambia el destino de la zona interactiva.
    if (cantidad === 6) {

        // IR A LA PANTALLA DEL TRINEO.
        zonaRegalos.href = "../../momento-3/pantalla-1/trineo.html";

    } else {

        // Si faltan regalos, permite volver a la estantería.
        zonaRegalos.href = "../pantalla-2/estanteria.html";

    }

}


// INICIAR PANTALLA

// Ejecuta la función para mostrar la información.
cargarDatos();