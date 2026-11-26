
/* ELEMENTOS DE LA PANTALLA */

let fachada = document.getElementById("fachada");
let narracion = document.getElementById("narracion");
let cantidadEntregas = document.getElementById("cantidad-entregas");
let textoInstruccion = document.getElementById("texto-instruccion");
let instruccion = document.getElementById("instruccion");

let regalo = document.getElementById("regalo");
let imagenRegalo = document.getElementById("imagen-regalo");

let animacionSwipe = document.getElementById("animacion-swipe");


// VARIABLES DEL PROYECTO

let lugarSeleccionado = localStorage.getItem("lugarSeleccionado");

let ventanasEntregadas =
    JSON.parse(localStorage.getItem("ventanasEntregadas")) || [];

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


// SONIDOS

// Sonido que aparece cuando el regalo entra por la ventana.
let sonidoVidrio = new Audio("../../sonidos/vidrio.mp3");

// Sonido cuando falla el lanzamiento.
let sonidoFallo = new Audio("../../sonidos/oh grave.mp3");

// Sonidos de las diferentes escenas.
let sonidoNavidad = new Audio("../../sonidos/música feliz.mp3");
let sonidoChimenea = new Audio("../../sonidos/chimenea.mp3");
let sonidoRonquido = new Audio("../../sonidos/ronquido.mp3");
let sonidoPerro = new Audio("../../sonidos/ladrido.mp3");
let sonidoPasos = new Audio("../../sonidos/pasos.mp3");
let sonidoRisas = new Audio("../../sonidos/risas.mp3");

// La música navideña y la chimenea se mantienen mientras
// esté activa la escena de Navidad.
sonidoNavidad.loop = true;
sonidoChimenea.loop = true;

// Ajustar el volumen de los sonidos.
sonidoVidrio.volume = 0.45;
sonidoFallo.volume = 0.8;
sonidoNavidad.volume = 0.7;
sonidoChimenea.volume = 0.8;
sonidoRonquido.volume = 0.8;
sonidoPerro.volume = 0.8;
sonidoPasos.volume = 0.8;
sonidoRisas.volume = 0.8;


// VARIABLE PARA CONTROLAR LA SECUENCIA DE SONIDOS

// Permite evitar que una escena anterior siga reproduciéndose
// cuando el usuario selecciona otra ventana.
let secuenciaAudio = 0;


// FUNCIÓN PARA DETENER LOS SONIDOS DE LAS ESCENAS

function detenerAudiosVentana() {

    // Detener el sonido del vidrio.
    sonidoVidrio.pause();
    sonidoVidrio.currentTime = 0;
    sonidoVidrio.onended = null;

    // Detener la música y la chimenea de Navidad.
    sonidoNavidad.pause();
    sonidoNavidad.currentTime = 0;

    sonidoChimenea.pause();
    sonidoChimenea.currentTime = 0;

    // Detener los sonidos de las demás escenas.
    sonidoRonquido.pause();
    sonidoRonquido.currentTime = 0;
    sonidoRonquido.onended = null;

    sonidoPerro.pause();
    sonidoPerro.currentTime = 0;
    sonidoPerro.onended = null;

    sonidoPasos.pause();
    sonidoPasos.currentTime = 0;
    sonidoPasos.onended = null;

    sonidoRisas.pause();
    sonidoRisas.currentTime = 0;
    sonidoRisas.onended = null;

}


// FUNCIÓN PARA DETENER UNA SECUENCIA DE SONIDOS

function detenerSecuenciaSonido() {

    // Cambiar el número de secuencia para invalidar
    // cualquier reproducción anterior.
    secuenciaAudio = secuenciaAudio + 1;

    detenerAudiosVentana();

}


// FUNCIÓN PARA CONTINUAR LA MÚSICA DESPUÉS DE UNA ESCENA

function continuarMusicaAmbiente() {

    // Avisar al index principal que debe reanudar la música.
    window.parent.postMessage("reanudar-musica-ambiente", "*");

}


// FUNCIÓN PARA REPRODUCIR EL SONIDO DE UNA ESCENA

function reproducirSonidoEscena(nombreEscena, numeroSecuencia) {

    // Revisar que esta siga siendo la escena actual.
    if (numeroSecuencia !== secuenciaAudio) {
        return;
    }

    // ESCENA DE NAVIDAD

    if (nombreEscena === "navidad") {

        // Reproducir música navideña.
        sonidoNavidad.currentTime = 0;

        sonidoNavidad.play().catch(function() {
            console.log("No se pudo reproducir la música navideña.");
        });

        // Reproducir el sonido de la chimenea.
        sonidoChimenea.currentTime = 0;

        sonidoChimenea.play().catch(function() {
            console.log("No se pudo reproducir la chimenea.");
        });

        // Ambos sonidos continuarán hasta que se seleccione
        // otra ventana.

    }


    // ESCENA DE ALGUIEN DURMIENDO

    else if (nombreEscena === "durmiendo") {

        sonidoRonquido.currentTime = 0;

        sonidoRonquido.play().catch(function() {
            console.log("No se pudo reproducir el ronquido.");
        });

    }


    // ESCENA DEL PERRO

    else if (nombreEscena === "perro") {

        sonidoPerro.currentTime = 0;

        sonidoPerro.play().catch(function() {
            console.log("No se pudo reproducir el ladrido.");
        });

    }


    // ESCENA DEL DESCUBRIMIENTO

    else if (nombreEscena === "descubrimiento") {

        sonidoPasos.currentTime = 0;

        sonidoPasos.play().catch(function() {
            console.log("No se pudieron reproducir los pasos.");
        });

    }


    // ESCENA DE CELEBRACIÓN

    else if (nombreEscena === "celebracion") {

        sonidoRisas.currentTime = 0;

        sonidoRisas.play().catch(function() {
            console.log("No se pudieron reproducir las risas.");
        });

    }


    // ESCENA DE LAS GALLETAS

    else if (nombreEscena === "galletas") {

        // Reproducir el sonido de la fogata.
        sonidoChimenea.currentTime = 0;

        sonidoChimenea.play().catch(function() {
            console.log("No se pudo reproducir la chimenea de las galletas.");
        });

    }

}


// FUNCIÓN PARA INICIAR LOS SONIDOS DE UNA ENTREGA

function iniciarSecuenciaSonido(nombreEscena) {

    // REPRODUCIR EL SONIDO INDIVIDUAL DE LA ESCENA.
    // El sonido del vidrio se reproduce por separado
    // cuando aparece la ventana iluminada.

    reproducirSonidoEscena(nombreEscena, secuenciaAudio);

}


// CONFIGURACIÓN DE LAS FACHADAS Y LAS VENTANAS

let fachadas = {

    "colombia": {
        numero: 1,
        imagen: "assets/1. Colombia.jpg",
        ventanas: [
            { top: "18.3%", left: "16%", width: "18%", height: "15.38%" },
            { top: "18.03%", left: "66%", width: "16%", height: "15.38%" },
            { top: "38.2%", left: "14.3%", width: "25%", height: "15.38%" },
            { top: "38.1%", left: "61%", width: "25%", height: "15.38%" },
            { top: "57%", left: "14.7%", width: "26%", height: "15.38%" },
            { top: "57.5%", left: "60%", width: "23.5%", height: "15.38%" }
        ]
    },

    "francia": {
        numero: 2,
        imagen: "assets/2. Francia.jpg",
        ventanas: [
            { top: "24%", left: "11%", width: "23.8%", height: "17%" },
            { top: "24%", left: "38.6%", width: "23.8%", height: "17%" },
            { top: "24%", left: "66%", width: "23.8%", height: "17%" },
            { top: "46.1%", left: "14.3%", width: "17.3%", height: "14%" },
            { top: "46.1%", left: "32.5%", width: "35.7%", height: "13.7%" },
            { top: "46.1%", left: "69.1%", width: "17.3%", height: "14%" }
        ]
    },

    "estados-unidos": {
        numero: 3,
        imagen: "assets/3. Estados Unidos.jpg",
        ventanas: [
            { top: "15.55%", left: "21.79%", width: "16.9%", height: "12.4%" },
            { top: "15.5%", left: "62.73%", width: "16.55%", height: "12.9%" },
            { top: "35.9%", left: "21.6%", width: "17.1%", height: "13.3%" },
            { top: "35.8%", left: "62.5%", width: "17.5%", height: "13.4%" },
            { top: "54.1%", left: "0%", width: "36%", height: "40%" },
            { top: "58.6%", left: "70.2%", width: "12.8%", height: "13.3%" }
        ]
    },

    "nepal": {
        numero: 4,
        imagen: "assets/4. Nepal.png",
        ventanas: [
            { top: "17%", left: "26%", width: "14%", height: "8.2%" },
            { top: "17%", left: "61.8%", width: "13%", height: "8.2%" },
            { top: "35.5%", left: "26%", width: "14%", height: "8%" },
            { top: "35.5%", left: "61.8%", width: "13%", height: "8%" },
            { top: "53.5%", left: "26.3%", width: "13%", height: "8%" },
            { top: "53.5%", left: "61.8%", width: "13%", height: "8%" }
        ]
    },

    "egipto": {
        numero: 5,
        imagen: "assets/5. Egipto.jpg",
        ventanas: [
            { top: "20.6%", left: "15.5%", width: "11%", height: "11.8%" },
            { top: "20.5%", left: "44.8%", width: "11.4%", height: "12%" },
            { top: "20.35%", left: "74%", width: "10.9%", height: "12.2%" },
            { top: "44.8%", left: "15.5%", width: "11%", height: "10.6%" },
            { top: "44.6%", left: "44.8%", width: "11%", height: "10.6%" },
            { top: "44.6%", left: "74%", width: "11.5%", height: "10.6%" }
        ]
    },

    "nueva-zelanda": {
        numero: 6,
        imagen: "assets/6. Nueva Zelanda.jpg",
        ventanas: [
            { top: "22%", left: "45.7%", width: "8.7%", height: "6%" },
            { top: "39.13%", left: "20%", width: "11.8%", height: "10.74%" },
            { top: "40%", left: "45%", width: "10.3%", height: "9.9%" },
            { top: "40%", left: "68.6%", width: "11%", height: "10%" },
            { top: "64.5%", left: "19%", width: "11.8%", height: "9.5%" },
            { top: "64.9%", left: "70.4%", width: "11%", height: "8.8%" }
        ]
    }

};


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    let respuesta = await fetch("datos.json");
    datos = await respuesta.json();

    narracion.textContent = datos.narracionInicial;
    textoInstruccion.textContent = datos.instruccionInicial;

    // MOSTRAR LA INSTRUCCIÓN SOLO SI TODAVÍA NO SE HA
    // COMPLETADO NINGUNA ENTREGA.

    if (ventanasEntregadas.length === 0) {
        instruccion.style.display = "block";
    } else {
        instruccion.style.display = "none";
    }


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


        // SI YA SE COMPLETARON LAS SEIS ENTREGAS,
        // MOSTRAR EL MENSAJE FINAL.

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

    // NO PERMITIR OTRA SELECCIÓN MIENTRAS EL REGALO ESTÁ EN MOVIMIENTO

    if (lanzamientoEnCurso || entregaEnCurso) {
        return;
    }

    // REVISAR SI ESA VENTANA YA RECIBIÓ UN REGALO

    if (ventanasEntregadas.includes(numero)) {

        narracion.textContent = "Esa ventana ya recibió su regalo. ¡Busca otra!";
        return;

    }

    // DETENER LOS SONIDOS DE LA ESCENA ANTERIOR

    detenerSecuenciaSonido();

    // REANUDAR LA MÚSICA AMBIENTE MIENTRAS SE PREPARA
    // EL SIGUIENTE REGALO.

    continuarMusicaAmbiente();


    // GUARDAR LA VENTANA SELECCIONADA

    ventanaSeleccionada = numero;
    localStorage.setItem("ventanaSeleccionada", numero);


    // OCULTAR DEFINITIVAMENTE LA INSTRUCCIÓN DE DOBLE TOQUE

    instruccion.style.display = "none";


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

    imagenRegalo.src = "assets/" + regaloActual + " REGALO M.jpg";

    regalo.style.display = "block";
    regalo.style.transform = "translate(0, 0)";

    regalo.classList.remove("volando");
    regalo.classList.remove("fallido");


    // MOSTRAR LA ANIMACIÓN DE SWIPE

    animacionSwipe.style.display = "block";


    // ACTUALIZAR LA NARRACIÓN DE PAPÁ NOEL

    narracion.textContent = datos.narracionSeleccion;

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


    // ANIMAR EL REGALO.
    // EL SONIDO DEL VIDRIO NO SE REPRODUCE TODAVÍA.

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


    // REPRODUCIR EL SONIDO DE ERROR

    sonidoFallo.currentTime = 0;

    sonidoFallo.play().catch(function() {

        console.log("No se pudo reproducir el sonido del fallo.");

    });


    // MOSTRAR EL MOVIMIENTO DE CAÍDA

    regalo.classList.add("fallido");
    regalo.style.transform = "translate(0, 90px) rotate(25deg)";


    // ELEGIR EL COMENTARIO DE PAPÁ NOEL

    let posicionMensaje = intentosFallidos - 1;

    if (posicionMensaje >= datos.fallos.length) {
        posicionMensaje = datos.fallos.length - 1;
    }

    narracion.textContent = datos.fallos[posicionMensaje];


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


    // IDENTIFICAR LA ESCENA QUE CORRESPONDE A ESTA VENTANA

    let numeroPais = fachadas[lugarSeleccionado].numero;

    let claveVentana = numeroPais + "." + ventanaSeleccionada;

    let nombreEscena = datos.escenasPorVentana[claveVentana];


    // OCULTAR EL REGALO

    regalo.style.display = "none";
    regalo.style.transform = "translate(0, 0)";
    regalo.classList.remove("volando");


    // MOSTRAR LA VENTANA ILUMINADA

    let imagen = document.getElementById(
        "iluminada-" + ventanaSeleccionada
    );

    imagen.style.display = "block";


    // PAUSAR LA MÚSICA AMBIENTE MIENTRAS SUENA EL VIDRIO

    window.parent.postMessage("pausar-musica-ambiente", "*");


    // REPRODUCIR EL VIDRIO DESDE EL SEGUNDO 2.
    // ESTO OCURRE JUSTO CUANDO APARECE LA VENTANA ILUMINADA.

    sonidoVidrio.currentTime = 2;

    sonidoVidrio.onended = function() {

        // REANUDAR LA MÚSICA AMBIENTE CUANDO TERMINE EL VIDRIO.

        continuarMusicaAmbiente();

        sonidoVidrio.onended = null;

    };

    sonidoVidrio.play().catch(function() {

        console.log("No se pudo reproducir el sonido del vidrio.");

        // Si el sonido no se puede reproducir,
        // reanudar la música ambiente igualmente.

        continuarMusicaAmbiente();

    });


    // INICIAR EL SONIDO INDIVIDUAL DE LA ESCENA.

    iniciarSecuenciaSonido(nombreEscena);


    // QUITAR EL RESALTADO Y DESACTIVAR LA VENTANA

    let zona = document.getElementById(
        "zona-ventana-" + ventanaSeleccionada
    );

    zona.classList.remove("seleccionada");
    zona.classList.add("entregada");


    // OCULTAR LA ANIMACIÓN DE SWIPE

    animacionSwipe.style.display = "none";


    // ACTUALIZAR EL CONTADOR

    actualizarContador();


    // MOSTRAR LA REACCIÓN DE PAPÁ NOEL

    mostrarHistoria();

}


// MOSTRAR LA REACCIÓN DESPUÉS DE LA ENTREGA

function mostrarHistoria() {

    // IDENTIFICAR EL PAÍS Y LA VENTANA SELECCIONADA

    let numeroPais = fachadas[lugarSeleccionado].numero;
    let claveVentana = numeroPais + "." + ventanaSeleccionada;


    // BUSCAR QUÉ ESCENA CORRESPONDE A ESA VENTANA

    let nombreEscena = datos.escenasPorVentana[claveVentana];
    let historia = datos.historias[nombreEscena];


    // MOSTRAR LA REACCIÓN DE PAPÁ NOEL EN LA PARTE SUPERIOR

    if (ventanasEntregadas.length === 1) {

        narracion.textContent = datos.narracionPrimeraEntrega;

    } else if (ventanasEntregadas.length === 6) {

        narracion.textContent =
            "¡ENTREGAS COMPLETADAS! " + datos.mensajeFinal;

    } else {

        narracion.textContent = historia.texto;

    }


    // NO VOLVER A MOSTRAR LA INSTRUCCIÓN DE DOBLE TOQUE

    instruccion.style.display = "none";


    // INDICAR QUE YA SE PUEDE SELECCIONAR OTRA VENTANA

    if (ventanasEntregadas.length < 6) {

        // LIBERAR LA SELECCIÓN PARA PODER ELEGIR OTRA VENTANA

        entregaEnCurso = false;
        ventanaSeleccionada = null;


        // PREPARAR EL SIGUIENTE REGALO

        regaloActual = ventanasEntregadas.length + 1;

        localStorage.setItem("regaloActual", regaloActual);
        localStorage.removeItem("ventanaSeleccionada");

    } else {

        // DESPUÉS DE LA ÚLTIMA ENTREGA, PASAR AL MOMENTO 6

        entregaEnCurso = true;

        setTimeout(function() {

            irAMomento6();

        }, 8000);

    }

}


// FUNCIÓN PARA PASAR AL MOMENTO 6

function irAMomento6() {

    // DETENER LOS SONIDOS DE LA ÚLTIMA ESCENA.

    detenerSecuenciaSonido();


    // REANUDAR LA MÚSICA AMBIENTE PARA QUE CONTINÚE
    // DURANTE LA TRANSICIÓN AL MOMENTO 6.

    continuarMusicaAmbiente();


    // PASAR AL MOMENTO 6.

    window.location.href =
        "../../momento-6/pantalla-1/cansado.html";

}


// MOSTRAR EL FINAL SI SE RECARGA LA PANTALLA
// CUANDO LAS SEIS ENTREGAS YA ESTÁN COMPLETADAS.

function mostrarFinal() {

    regalo.style.display = "none";
    animacionSwipe.style.display = "none";
    instruccion.style.display = "none";


    // MOSTRAR EL MENSAJE FINAL

    narracion.textContent =
        "¡ENTREGAS COMPLETADAS! " + datos.mensajeFinal;

    entregaEnCurso = true;


    // PASAR AL MOMENTO 6 DESPUÉS DE DAR TIEMPO PARA LEER

    setTimeout(function() {

        irAMomento6();

    }, 7000);

}


// CARGAR LA ANIMACIÓN DE SWIPE

lottie.loadAnimation({

    container: animacionSwipe,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "../../momento-2/pantalla-4/assets/gesto.json"

});


// INICIAR LA PANTALLA

cargarDatos();
