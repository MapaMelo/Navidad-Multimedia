// ELEMENTOS DE LA PANTALLA

// Busca los elementos del HTML donde aparecerán los textos.
let titulo = document.getElementById("titulo");
let cantidadRegalos = document.getElementById("cantidad-regalos");
let zonaRegalos = document.getElementById("zona-regalos");


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

    // Si ya se terminaron los seis regalos, cambia el destino del botón.
    if (cantidad === 6) {

        // IR A LA PANTALLA DEL TRINEO.
        zonaRegalos.href = "../../momento-3/pantalla-1/trineo.html";

        // Cambia el texto del botón.
        zonaRegalos.textContent = "CONTINUAR";

    } else {

        // Si faltan regalos, permite volver a la estantería.
        zonaRegalos.href = "../pantalla-2/estanteria.html";

        // Mantiene el texto del botón.
        zonaRegalos.textContent = "TOCAR PARA CONTINUAR";
    }

}


// INICIAR PANTALLA

// Ejecuta la función para mostrar la información.
cargarDatos();