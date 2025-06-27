document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const destino = document.getElementById("destino").value;
  const personas = document.getElementById("personas").value.trim();
  const fecha = document.getElementById("fecha").value;
  const comentarios = document.getElementById("comentarios").value.trim();

  // Validaciones
  if (!nombre || !correo || !destino || !personas || !fecha) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo)) {
    alert("Correo electrónico inválido.");
    return;
  }

  const hoy = new Date();
  const fechaIngresada = new Date(fecha);
  hoy.setHours(0, 0, 0, 0);
  if (fechaIngresada <= hoy) {
    alert("La fecha debe ser futura.");
    return;
  }

  const nuevo = {
    nombre,
    correo,
    destino,
    personas,
    fecha,
    comentarios: comentarios || "Ninguno"
  };

  let registros = JSON.parse(localStorage.getItem("clientes")) || [];
  registros.push(nuevo);
  localStorage.setItem("clientes", JSON.stringify(registros));

  alert("Registro guardado correctamente.");
  document.getElementById("formulario").reset();
});

function exportarTXT() {
  const registros = JSON.parse(localStorage.getItem("clientes")) || [];

  if (registros.length === 0) {
    alert("No hay registros para exportar.");
    return;
  }

  let contenido = registros.map(r =>
    `Nombre: ${r.nombre} | Email: ${r.correo} | Destino: ${r.destino} | Personas: ${r.personas} | Fecha: ${r.fecha}`
  ).join("\n");

  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "clientes.txt";
  enlace.click();
}
