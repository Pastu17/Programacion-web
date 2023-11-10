let seleccionadas = [];

function seleccionarCelda(event) {
  const celda = event.target;
  if (!celda.classList.contains('seleccionada')) {
    celda.classList.add('seleccionada');
    seleccionadas.push(celda);
    if (seleccionadas.length === 2) {
      const letra1 = seleccionadas[0].textContent;
      const letra2 = seleccionadas[1].textContent;
      if (letra1 === letra2) {
        seleccionadas.forEach(celda => celda.classList.add('encontrada'));
      } else {
        setTimeout(() => {
          seleccionadas.forEach(celda => celda.classList.remove('seleccionada'));
        }, 1000);
      }
      seleccionadas = [];
    }
  }
}

let palabras = [];
const grid = document.getElementById("sopaDeLetras");
const listaPalabras = document.getElementById("listaPalabras");

function crearSopaDeLetras(filas, columnas) {
  grid.innerHTML = "";
  for (let i = 0; i < filas; i++) {
    const fila = document.createElement("div");
    fila.classList.add("fila");
    for (let j = 0; j < columnas; j++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.textContent = getRandomChar();
      celda.addEventListener("click", seleccionarCelda); // Agregado el evento de click
      fila.appendChild(celda);
    }
    grid.appendChild(fila);
  }

  // Agregar palabras a la sopa de letras
  palabras.forEach(palabra => {
    const direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
    let filaInicial = Math.floor(Math.random() * filas);
    let columnaInicial = Math.floor(Math.random() * columnas);

    if (direccion === "horizontal" && columnaInicial + palabra.length <= columnas) {
      for (let j = 0; j < palabra.length; j++) {
        grid.childNodes[filaInicial].childNodes[columnaInicial + j].textContent = palabra[j];
      }
    } else if (direccion === "vertical" && filaInicial + palabra.length <= filas) {
      for (let i = 0; i < palabra.length; i++) {
        grid.childNodes[filaInicial + i].childNodes[columnaInicial].textContent = palabra[i];
      }
    }
  });

  listaPalabras.innerHTML = ""; // Limpiar la lista de palabras
  palabras.forEach(palabra => {
    const li = document.createElement("li");
    li.textContent = palabra;
    listaPalabras.appendChild(li);
  });
}

function getRandomChar() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function agregarPalabra() {
    if (palabras.length >= 10) {
      alert("Ya has agregado el máximo de 10 palabras.");
      return;
    }
    
    const nuevaPalabra = document.getElementById("nuevaPalabra").value.toUpperCase();
    if (nuevaPalabra && !palabras.includes(nuevaPalabra)) {
      palabras.unshift(nuevaPalabra);
      document.getElementById("nuevaPalabra").value = "";
      crearSopaDeLetras(5, 5);
    }
  }

document.getElementById("agregarPalabra").addEventListener("click", agregarPalabra);

document.getElementById("generarSopa").addEventListener("click", function() {
  const filas = parseInt(document.getElementById("filas").value);
  const columnas = parseInt(document.getElementById("columnas").value);
  if (filas >= 1 && filas <= 10 && columnas >= 1 && columnas <= 10) {
    crearSopaDeLetras(filas, columnas);
  } else {
    alert("Por favor ingresa valores válidos para filas y columnas (entre 1 y 10).");
  }
});