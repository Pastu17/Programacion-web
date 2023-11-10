function enviarFormulario() {
  // Obtener los datos del formulario

  
const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  // Validar los datos
  if (nombre === "") {
    alert("Debes ingresar un nombre.");
    return;
  }

  if (email === "") {
    alert("Debes ingresar un correo electrónico.");
    return;
  }

  // Enviar el formulario
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/enviar-formulario.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`nombre=${nombre}&email=${email}`);

  // Mostrar un mensaje de confirmación
  alert("Tu mensaje ha sido enviado.");
}