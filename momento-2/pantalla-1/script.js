// ELEMENTOS DE LA PANTALLA

// Busca los elementos del HTML donde aparecerán los textos.
let titulo = document.getElementById("titulo");
let cantidadRegalos = document.getElementById("cantidad-regalos");


// FUNCIÓN PARA CARGAR LOS DATOS

// Carga la información guardada en datos.json.
async function cargarDatos() {

    // Busca el archivo JSON.
    let respuesta = await fetch("datos.json");

    // Convierte su contenido para utilizarlo en JavaScript.
    let datos = await respuesta.json();


    // MOSTRAR INFORMACIÓN

    // Muestra la instrucción principal.
    titulo.textContent = datos.titulo;

    // Muestra la cantidad inicial de regalos terminados.
    cantidadRegalos.textContent = datos.contador;

}


// INICIAR PANTALLA

// Ejecuta la función para mostrar la información.
cargarDatos();