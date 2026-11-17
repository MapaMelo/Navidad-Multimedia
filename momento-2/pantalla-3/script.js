
// ELEMENTOS DE LA PANTALLA
let narracion = document.getElementById("narracion");

// FUNCIÓN PARA CARGAR LOS DATOS
async function cargarDatos() {
    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    // MOSTRAR EL PENSAMIENTO DE PAPÁ NOEL
    narracion.textContent = datos.narracion;
}

// FUNCIÓN PARA GUARDAR EL PAPEL Y PASAR A ENVOLVER
function seleccionarPapel(papel) {

    // GUARDAR EL PAPEL SELECCIONADO
    localStorage.setItem("papelSeleccionado", papel);

    // IR A LA PANTALLA DE ENVOLVER
    window.location.href = "../pantalla-4/envolver.html";
}

// INTERACCIÓN: PAPEL 1
document.getElementById("zona-papel-1").onclick = function() {
    seleccionarPapel("1");
};

// INTERACCIÓN: PAPEL 2
document.getElementById("zona-papel-2").onclick = function() {
    seleccionarPapel("2");
};

// INTERACCIÓN: PAPEL 3
document.getElementById("zona-papel-3").onclick = function() {
    seleccionarPapel("3");
};

// INICIAR PANTALLA
cargarDatos();
