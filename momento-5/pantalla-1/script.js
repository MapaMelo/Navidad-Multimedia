
// ELEMENTOS DE LA PANTALLA

let fachada = document.getElementById("fachada");
let narracion = document.getElementById("narracion");
let cantidadEntregas = document.getElementById("cantidad-entregas");
let textoInstruccion = document.getElementById("texto-instruccion");

let regalo = document.getElementById("regalo");
let imagenRegalo = document.getElementById("imagen-regalo");

let mensajeEntrega = document.getElementById("mensaje-entrega");
let tituloMensaje = document.getElementById("titulo-mensaje");
let textoMensaje = document.getElementById("texto-mensaje");
let botonContinuar = document.getElementById("boton-continuar");


// VARIABLES DEL PROYECTO

let lugarSeleccionado = localStorage.getItem("lugarSeleccionado");

let ventanasEntregadas = JSON.parse(localStorage.getItem("ventanasEntregadas")) || [];

let ventanaSeleccionada = null;

let regaloActual = ventanasEntregadas.length + 1;

let datos;

let ultimoToque = 0;
let tiempoUltimoToque = 0;
let temporizadorToque = null;

let puntoInicialX = 0;
let puntoInicialY = 0;

let lanzamientoEnCurso = false;
let entregaEnCurso = false;

let intentosFallidos = 0;


// CONFIGURACIÓN DE LAS FACHADAS Y LAS VENTANAS

let fachadas = {

    "colombia": {
        numero: 1,
        imagen: "assets/1. Colombia.jpg",
        ventanas: [
            { top: "18.3%", left: "16%", width: "18%", height: "15,38%" },
            { top: "18.03%", left: "66%", width: "16%", height: "15,38%" },
            { top: "38.2%", left: "14.3%", width: "25%", height: "15,38%" },
            { top: "38.1%", left: "61%", width: "25%", height: "15,38%" },
            { top: "57%", left: "14.7%", width: "26%", height: "15,38%" },
            { top: "57.5%", left: "60%", width: "23.5%", height: "15,38%" }
        ]
    },

    "francia": {
        numero: 2,
        imagen: "assets/2. Francia.jpg",
        ventanas: [
            { top: "13%", left: "16%", width: "40%", height: "40%" },
            { top: "13%", left: "42%", width: "16%", height: "10%" },
            { top: "13%", left: "68%", width: "16%", height: "10%" },
            { top: "39%", left: "10%", width: "24%", height: "16%" },
            { top: "39%", left: "38%", width: "24%", height: "16%" },
            { top: "39%", left: "66%", width: "24%", height: "16%" }
        ]
    },

    "estados-unidos": {
        numero: 3,
        imagen: "assets/3. Estados Unidos.jpg",
        ventanas: [
            { top: "15.55%", left: "21.79%", width: "16.9%", height: "87,9%" },
            { top: "15.5%", left: "62.73%", width: "16.55%", height: "7,94%" },
            { top: "35.9%", left: "21.6%", width: "17.1%", height: "7,94%" },
            { top: "36%", left: "62.75%", width: "16.9%", height: "7,98%" },
            { top: "54.1%", left: "0%", width: "36%", height: "7,94%" },
            { top: "58.6%", left: "70.2%", width: "12.8%", height: "7,94%" }
        ]
    },

    "nepal": {
        numero: 4,
        imagen: "assets/4. Nepal.png",
        ventanas: [
            { top: "18%", left: "15%", width: "33%", height: "17%" },
            { top: "18%", left: "53%", width: "33%", height: "17%" },
            { top: "39%", left: "15%", width: "33%", height: "17%" },
            { top: "39%", left: "53%", width: "33%", height: "17%" },
            { top: "61%", left: "15%", width: "33%", height: "17%" },
            { top: "61%", left: "53%", width: "33%", height: "17%" }
        ]
    },

    "egipto": {
        numero: 5,
        imagen: "assets/5. Egipto.jpg",
        ventanas: [
            { top: "19%", left: "10%", width: "23%", height: "17%" },
            { top: "19%", left: "39%", width: "23%", height: "17%" },
            { top: "19%", left: "68%", width: "23%", height: "17%" },
            { top: "42%", left: "10%", width: "23%", height: "17%" },
            { top: "42%", left: "39%", width: "23%", height: "17%" },
            { top: "42%", left: "68%", width: "23%", height: "17%" }
        ]
    },

    "nueva-zelanda": {
        numero: 6,
        imagen: "assets/6. Nueva Zelanda.jpg",
        ventanas: [
            { top: "23%", left: "40%", width: "20%", height: "12%" },
            { top: "39%", left: "14%", width: "23%", height: "17%" },
            { top: "39%", left: "39%", width: "23%", height: "17%" },
            { top: "39%", left: "64%", width: "23%", height: "17%" },
            { top: "65%", left: "14%", width: "23%", height: "17%" },
            { top: "65%", left: "64%", width: "23%", height: "17%" }
        ]
    }

};


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    let respuesta = await fetch("datos.json");
    datos = await respuesta.json();

    narracion.textContent = datos.narracionInicial;

    textoInstruccion.textContent = datos.instruccionInicial;

    // BUSCAR LA FACHADA DEL PAÍS SELECCIONADO

    if (fachadas[lugarSeleccionado]) {

        fachada.style.backgroundImage =
            "url('" + fachadas[lugarSeleccionado].imagen + "')";

        // CARGAR LAS SEIS VENTANAS

        for (let i = 1; i <= 6; i++) {

            let zona = document.getElementById("zona-ventana-" + i);

            let imagen = document.getElementById("iluminada-" + i);

            let posicion = fachadas[lugarSeleccionado].ventanas[i - 1];

            // UBICAR LA ZONA TÁCTIL

            zona.style.top = posicion.top;
            zona.style.left = posicion.left;
            zona.style.width = posicion.width;
            zona.style.height = posicion.height;

            // UBICAR LA IMAGEN ILUMINADA EN EL MISMO LUGAR

            imagen.style.top = posicion.top;
            imagen.style.left = posicion.left;
            imagen.style.width = posicion.width;
            imagen.style.height = posicion.height;

            // CARGAR LA IMAGEN DE LA VENTANA DEL PAÍS

            imagen.src = "assets/" +
                fachadas[lugarSeleccionado].numero + "." + i + ".png";

            // MOSTRAR LAS VENTANAS QUE YA RECIBIERON REGALO

            if (ventanasEntregadas.includes(i)) {

                imagen.style.display = "block";

                zona.classList.add("entregada");

            }

        }

        actualizarContador();

        // REVISAR SI YA SE COMPLETARON LAS SEIS ENTREGAS

        if (ventanasEntregadas.length === 6) {

            mostrarFinal();

        }

    } else {

        narracion.textContent = "No se encontró la fachada. Vuelve al mapa.";

    }

}


// ACTUALIZAR EL CONTADOR

function actualizarContador() {

    cantidadEntregas.textContent = ventanasEntregadas.length + "/6";

}


// SELECCIONAR UNA VENTANA

function seleccionarVentana(numero) {

    // NO PERMITIR OTRA SELECCIÓN DURANTE UN LANZAMIENTO O MENSAJE

    if (entregaEnCurso || lanzamientoEnCurso) {
        return;
    }

    // REVISAR SI ESA VENTANA YA RECIBIÓ UN REGALO

    if (ventanasEntregadas.includes(numero)) {

        narracion.textContent = "Esa ventana ya recibió su regalo. ¡Busca otra!";

        return;
    }

    // GUARDAR LA VENTANA SELECCIONADA

    ventanaSeleccionada = numero;

    localStorage.setItem("ventanaSeleccionada", numero);

    // QUITAR EL RESALTADO ANTERIOR

    for (let i = 1; i <= 6; i++) {

        let zona = document.getElementById("zona-ventana-" + i);

        zona.classList.remove("seleccionada");

    }

    // RESALTAR LA NUEVA VENTANA

    let zonaSeleccionada =
        document.getElementById("zona-ventana-" + numero);

    zonaSeleccionada.classList.add("seleccionada");

    // MOSTRAR EL REGALO QUE CORRESPONDE

    imagenRegalo.src = "assets/" + regaloActual + ". REGALO M.jpg";

    regalo.style.display = "block";

    regalo.style.transform = "translate(0, 0)";

    regalo.classList.remove("volando");
    regalo.classList.remove("fallido");

    // ACTUALIZAR LOS TEXTOS

    narracion.textContent = datos.narracionSeleccion;

    textoInstruccion.textContent = datos.instruccionSeleccion;

}


// DETECTAR DOBLE TOQUE EN LAS VENTANAS

for (let i = 1; i <= 6; i++) {

    let zona = document.getElementById("zona-ventana-" + i);

    zona.onclick = function() {

        let ahora = Date.now();

        // REVISAR SI HUBO DOS TOQUES RÁPIDOS EN LA MISMA VENTANA

        if (ultimoToque === i && ahora - tiempoUltimoToque < 350) {

            clearTimeout(temporizadorToque);

            ultimoToque = 0;

            seleccionarVentana(i);

        } else {

            ultimoToque = i;

            tiempoUltimoToque = ahora;

            clearTimeout(temporizadorToque);

            temporizadorToque = setTimeout(function() {

                ultimoToque = 0;

            }, 350);

        }

    };

}


// EMPEZAR EL LANZAMIENTO CUANDO SE TOCA EL REGALO

regalo.addEventListener("pointerdown", function(event) {

    if (ventanaSeleccionada === null ||
        entregaEnCurso ||
        lanzamientoEnCurso) {

        return;

    }

    puntoInicialX = event.clientX;
    puntoInicialY = event.clientY;

    lanzamientoEnCurso = true;

});


// TERMINAR EL LANZAMIENTO CUANDO SE LEVANTA EL DEDO

document.addEventListener("pointerup", function(event) {

    if (!lanzamientoEnCurso) {
        return;
    }

    lanzamientoEnCurso = false;

    let puntoFinalX = event.clientX;
    let puntoFinalY = event.clientY;

    // CALCULAR LA DISTANCIA DEL MOVIMIENTO

    let diferenciaX = puntoFinalX - puntoInicialX;
    let diferenciaY = puntoFinalY - puntoInicialY;

    let distancia = Math.sqrt(
        diferenciaX * diferenciaX + diferenciaY * diferenciaY
    );

    // CALCULAR EL CENTRO DE LA VENTANA SELECCIONADA

    let zona = document.getElementById(
        "zona-ventana-" + ventanaSeleccionada
    );

    let rectangulo = zona.getBoundingClientRect();

    let centroX = rectangulo.left + rectangulo.width / 2;
    let centroY = rectangulo.top + rectangulo.height / 2;

    // COMPROBAR SI EL MOVIMIENTO FUE HACIA LA VENTANA

    let distanciaInicial = Math.sqrt(
        (puntoInicialX - centroX) * (puntoInicialX - centroX) +
        (puntoInicialY - centroY) * (puntoInicialY - centroY)
    );

    let distanciaFinal = Math.sqrt(
        (puntoFinalX - centroX) * (puntoFinalX - centroX) +
        (puntoFinalY - centroY) * (puntoFinalY - centroY)
    );

    // EL LANZAMIENTO NECESITA DISTANCIA Y DIRECCIÓN CORRECTAS

    if (distancia >= 100 && distanciaFinal < distanciaInicial) {

        lanzarRegalo();

    } else {

        fallarLanzamiento();

    }

});


// ANIMAR EL REGALO HACIA LA VENTANA

function lanzarRegalo() {

    let zona = document.getElementById(
        "zona-ventana-" + ventanaSeleccionada
    );

    let rectangulo = zona.getBoundingClientRect();

    let regaloRectangulo = regalo.getBoundingClientRect();

    // CALCULAR HACIA DÓNDE DEBE VOLAR EL REGALO

    let diferenciaX =
        rectangulo.left + rectangulo.width / 2 -
        (regaloRectangulo.left + regaloRectangulo.width / 2);

    let diferenciaY =
        rectangulo.top + rectangulo.height / 2 -
        (regaloRectangulo.top + regaloRectangulo.height / 2);

    // BLOQUEAR OTRAS ACCIONES DURANTE LA ANIMACIÓN

    lanzamientoEnCurso = true;

    // ANIMAR EL REGALO

    regalo.classList.add("volando");

    regalo.style.transform =
        "translate(" + diferenciaX + "px, " + diferenciaY +
        "px) scale(0.2) rotate(20deg)";

    // DESPUÉS DE LA ANIMACIÓN, CONFIRMAR LA ENTREGA

    setTimeout(function() {

        lanzamientoEnCurso = false;

        completarEntrega();

    }, 750);

}


// CUANDO EL LANZAMIENTO FALLA

function fallarLanzamiento() {

    intentosFallidos = intentosFallidos + 1;

    lanzamientoEnCurso = true;

    // MOSTRAR EL MOVIMIENTO DE CAÍDA

    regalo.classList.add("fallido");

    regalo.style.transform = "translate(0, 90px) rotate(25deg)";

    // ELEGIR EL COMENTARIO DE PAPÁ NOEL

    let posicionMensaje = intentosFallidos - 1;

    if (posicionMensaje >= datos.fallos.length) {

        posicionMensaje = datos.fallos.length - 1;

    }

    narracion.textContent = datos.fallos[posicionMensaje];

    textoInstruccion.textContent = "¡Inténtalo otra vez!";

    // DEVOLVER EL REGALO A SU POSICIÓN

    setTimeout(function() {

        regalo.style.transition = "none";

        regalo.style.transform = "translate(0, 0)";

        regalo.classList.remove("fallido");

        lanzamientoEnCurso = false;

        // VOLVER A ACTIVAR LA TRANSICIÓN

        setTimeout(function() {

            regalo.style.transition = "";

        }, 50);

    }, 450);

}


// COMPLETAR UNA ENTREGA EXITOSA

function completarEntrega() {

    // GUARDAR LA VENTANA COMO ENTREGADA

    ventanasEntregadas.push(ventanaSeleccionada);

    localStorage.setItem(
        "ventanasEntregadas",
        JSON.stringify(ventanasEntregadas)
    );

    // MOSTRAR LA VENTANA ILUMINADA

    let imagen = document.getElementById(
        "iluminada-" + ventanaSeleccionada
    );

    imagen.style.display = "block";

    // QUITAR EL RESALTADO Y DESACTIVAR LA VENTANA

    let zona = document.getElementById(
        "zona-ventana-" + ventanaSeleccionada
    );

    zona.classList.remove("seleccionada");

    zona.classList.add("entregada");

    // OCULTAR EL REGALO

    regalo.style.display = "none";

    regalo.style.transform = "translate(0, 0)";

    regalo.classList.remove("volando");

    // ACTUALIZAR EL CONTADOR

    actualizarContador();

    // MOSTRAR LA HISTORIA DEL APARTAMENTO

    mostrarHistoria();

}


// MOSTRAR LA HISTORIA DEL APARTAMENTO

function mostrarHistoria() {

    entregaEnCurso = true;

    // IDENTIFICAR EL PAÍS Y LA VENTANA SELECCIONADA

    let numeroPais = fachadas[lugarSeleccionado].numero;

    let claveVentana = numeroPais + "." + ventanaSeleccionada;

    // BUSCAR QUÉ ESCENA CORRESPONDE A ESA VENTANA

    let nombreEscena = datos.escenasPorVentana[claveVentana];

    let historia = datos.historias[nombreEscena];

    // MOSTRAR EL TÍTULO Y LA REACCIÓN DE LA ESCENA

    tituloMensaje.textContent = historia.titulo;

    textoMensaje.textContent = historia.texto;

    mensajeEntrega.style.display = "block";

    botonContinuar.style.display = "block";

    // LA NARRACIÓN DEPENDE DEL ORDEN DE LAS ENTREGAS

    if (ventanasEntregadas.length === 1) {

        narracion.textContent = datos.narracionPrimeraEntrega;

    } else if (ventanasEntregadas.length === 6) {

        narracion.textContent = datos.narracionUltimaEntrega;

    } else {

        narracion.textContent = historia.texto;

    }

    textoInstruccion.textContent = "Entrega completada.";

}


// BOTÓN PARA CONTINUAR CON EL SIGUIENTE REGALO

botonContinuar.onclick = function() {

    mensajeEntrega.style.display = "none";

    entregaEnCurso = false;

    ventanaSeleccionada = null;

    localStorage.removeItem("ventanaSeleccionada");

    // REVISAR SI YA SE COMPLETARON LAS SEIS ENTREGAS

    if (ventanasEntregadas.length === 6) {

        mostrarFinal();

    } else {

        // PASAR AL SIGUIENTE REGALO

        regaloActual = ventanasEntregadas.length + 1;

        localStorage.setItem("regaloActual", regaloActual);

        narracion.textContent = datos.narracionInicial;

        textoInstruccion.textContent = datos.instruccionInicial;

        intentosFallidos = 0;

    }

};


// MOSTRAR EL FINAL DEL RECORRIDO

function mostrarFinal() {

    regalo.style.display = "none";

    mensajeEntrega.style.display = "block";

    tituloMensaje.textContent = "¡ENTREGAS COMPLETADAS!";

    textoMensaje.textContent = datos.mensajeFinal;

    botonContinuar.style.display = "none";

    narracion.textContent = datos.narracionUltimaEntrega;

    textoInstruccion.textContent = "Recorrido terminado.";

}


// INICIAR LA PANTALLA

cargarDatos();
