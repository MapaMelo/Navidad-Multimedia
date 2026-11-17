
// ELEMENTOS DE LA PANTALLA
let regalo = document.getElementById("regalo");
let narracion = document.getElementById("narracion");
let cantidadRegalos = document.getElementById("cantidad-regalos");
let guiaGesto = document.getElementById("guia-gesto");
let mensajeFinal = document.getElementById("mensaje-final");
let botonContinuar = document.getElementById("boton-continuar");

// RECUPERAR LAS ELECCIONES GUARDADAS
let juguete = localStorage.getItem("jugueteSeleccionado");
let papel = localStorage.getItem("papelSeleccionado");

// LISTA DE JUGUETES TERMINADOS
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

    // COMPROBAR QUE EXISTAN LAS DOS ELECCIONES
    if (!juguete || !papel || !numerosJuguetes[juguete]) {
        window.location.href = "../pantalla-2/estanteria.html";
        return;
    }

    // CARGAR EL PENSAMIENTO
    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    narracion.textContent = datos.narracion;

    // MOSTRAR EL CONTADOR
    cantidadRegalos.textContent = juguetesTerminados.length + "/6";

    // MOSTRAR EL JUGUETE SOBRE EL PAPEL
    regalo.src = "assets/" + imagenesIniciales[juguete];

    // SI YA ESTABA TERMINADO, NO PERMITIR REPETIRLO
    if (juguetesTerminados.includes(juguete)) {
        window.location.href = "../pantalla-1/mesatrabajo.html";
    }
}

// DETECTAR CUANDO SE COLOCAN DOS DEDOS
regalo.addEventListener("touchstart", function(event) {

    // COMPROBAR QUE HAYA EXACTAMENTE DOS DEDOS
    if (event.touches.length === 2 && !gestoCompletado) {

        // GUARDAR LA DISTANCIA INICIAL
        distanciaInicial = calcularDistancia(
            event.touches[0],
            event.touches[1]
        );
    }

}, { passive: false });

// DETECTAR CUANDO LOS DEDOS SE ACERCAN
regalo.addEventListener("touchmove", function(event) {

    // EVITAR QUE LA PANTALLA SE DESPLACE
    if (event.touches.length === 2 && !gestoCompletado) {

        event.preventDefault();

        // CALCULAR LA DISTANCIA ACTUAL
        let distanciaActual = calcularDistancia(
            event.touches[0],
            event.touches[1]
        );

        // COMPROBAR SI LOS DEDOS SE ACERCARON SUFICIENTE
        if (distanciaInicial > 0 &&
            distanciaActual < distanciaInicial * 0.60) {

            terminarRegalo();
        }
    }

}, { passive: false });

// FUNCIÓN PARA TERMINAR EL REGALO
function terminarRegalo() {

    // EVITAR QUE SE COMPLETE MÁS DE UNA VEZ
    if (gestoCompletado) {
        return;
    }

    gestoCompletado = true;

    // OBTENER EL NÚMERO DEL JUGUETE
    let numeroJuguete = numerosJuguetes[juguete];

    // CONSTRUIR EL NOMBRE DE LA IMAGEN FINAL
    let imagenFinal = numeroJuguete + ". Papel " + papel + ".jpg";

    // MOSTRAR EL REGALO ENVUELTO
    regalo.src = "assets/" + imagenFinal;

    // AGREGAR EL JUGUETE A LA LISTA DE TERMINADOS
    juguetesTerminados.push(juguete);

    // GUARDAR LA LISTA ACTUALIZADA
    localStorage.setItem(
        "juguetesTerminados",
        JSON.stringify(juguetesTerminados)
    );

    // ACTUALIZAR EL CONTADOR
    cantidadRegalos.textContent = juguetesTerminados.length + "/6";

    // CAMBIAR EL PENSAMIENTO SEGÚN EL REGALO TERMINADO
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

    // OCULTAR LA GUÍA DEL GESTO
    guiaGesto.style.display = "none";

    // MOSTRAR EL MENSAJE Y EL BOTÓN
    mensajeFinal.style.display = "block";

    // GUARDAR QUE YA NO HAY UNA SELECCIÓN PENDIENTE
    localStorage.removeItem("jugueteSeleccionado");
    localStorage.removeItem("papelSeleccionado");
}

// BOTÓN PARA CONTINUAR
botonContinuar.onclick = function() {

    // SI YA ESTÁN LOS SEIS REGALOS, IR AL TRINEO
    if (juguetesTerminados.length === 6) {
        window.location.href = "../../momento-3/trineo.html";
    } else {

        // SI FALTAN REGALOS, VOLVER A LA MESA
        window.location.href = "../pantalla-1/mesatrabajo.html";
    }
};

// INICIAR PANTALLA
cargarDatos();
