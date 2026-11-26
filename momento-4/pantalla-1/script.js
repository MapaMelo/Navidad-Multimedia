
// ELEMENTOS DE LA PANTALLA

let narracion = document.getElementById("narracion");


// FUNCIÓN PARA CARGAR LOS DATOS

async function cargarDatos() {

    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    narracion.textContent = datos.narracion;

}


// FUNCIÓN PARA SELECCIONAR UN PAÍS

function seleccionarPais(pais) {

    // Guardar el país seleccionado para utilizarlo en la fachada.
    localStorage.setItem("lugarSeleccionado", pais);

    // Pasar a la pantalla de la fachada.
    window.location.href = "../../momento-5/pantalla-1/fachada.html";

}


// INTERACCIONES CON LOS SEIS PAÍSES

document.getElementById("zona-estados-unidos").onclick = function() {
    seleccionarPais("estados-unidos");
};

document.getElementById("zona-francia").onclick = function() {
    seleccionarPais("francia");
};

document.getElementById("zona-colombia").onclick = function() {
    seleccionarPais("colombia");
};

document.getElementById("zona-nepal").onclick = function() {
    seleccionarPais("nepal");
};

document.getElementById("zona-egipto").onclick = function() {
    seleccionarPais("egipto");
};

document.getElementById("zona-nueva-zelanda").onclick = function() {
    seleccionarPais("nueva-zelanda");
};


// INICIAR LA PANTALLA

cargarDatos();
