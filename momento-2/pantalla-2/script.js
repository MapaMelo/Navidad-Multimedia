
// ELEMENTOS DE LA PANTALLA
let narracion = document.getElementById("narracion");

// FUNCIÓN PARA CARGAR LOS DATOS
async function cargarDatos() {
    let respuesta = await fetch("datos.json");
    let datos = await respuesta.json();

    // MOSTRAR EL TEXTO
    narracion.textContent = datos.narracion;
}

// FUNCIÓN PARA GUARDAR EL JUGUETE Y PASAR A LA SIGUIENTE PANTALLA
function seleccionarJuguete(juguete) {

    // GUARDAR EL JUGUETE SELECCIONADO
    localStorage.setItem("jugueteSeleccionado", juguete);

    // IR A LA PANTALLA DE SELECCIÓN DE PAPEL
    window.location.href = "../pantalla-3/papeles.html";
}

// INTERACCIÓN: MATRIUSHKAS
document.getElementById("zona-matriushkas").onclick = function() {
    seleccionarJuguete("matriushkas");
};

// INTERACCIÓN: ROBOT
document.getElementById("zona-robot").onclick = function() {
    seleccionarJuguete("robot");
};

// INTERACCIÓN: LIBROS
document.getElementById("zona-libros").onclick = function() {
    seleccionarJuguete("libros");
};

// INTERACCIÓN: OSO
document.getElementById("zona-oso").onclick = function() {
    seleccionarJuguete("oso");
};

// INTERACCIÓN: BALÓN
document.getElementById("zona-balon").onclick = function() {
    seleccionarJuguete("balon");
};

// INTERACCIÓN: MUÑECA
document.getElementById("zona-muneca").onclick = function() {
    seleccionarJuguete("muneca");
};

// INICIAR PANTALLA
cargarDatos();
S