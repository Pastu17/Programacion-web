// Variable para mantener un registro de los números sacados
var numerosSacados = [];

// Función para generar un número aleatorio y mostrarlo en la bola
function sacarBola() {
  var numero;
  do {
    numero = Math.floor(Math.random() * 90) + 1;
  } while (numerosSacados.includes(numero));

  numerosSacados.push(numero);

  var bola = document.getElementById('bola');
  var numeroBola = document.getElementById('numeroBola');

  numeroBola.innerText = numero;
  bola.style.visibility = 'visible';

  marcarNumeroEnCarton(numero);
  verificarLinea();
  verificarBingo();
}

// Función para marcar un número en el cartón
function marcarNumeroEnCarton(numero) {
  var numerosCarton = document.getElementsByClassName('numero');
  for (var i = 0; i < numerosCarton.length; i++) {
    if (numerosCarton[i].innerText == numero) {
      numerosCarton[i].classList.add('marcado');
    }
  }
}

// Función para verificar si se ha completado una línea
function verificarLinea() {
  var filas = document.getElementsByClassName('fila');
  for (var i = 0; i < filas.length; i++) {
    var numerosFila = filas[i].getElementsByClassName('numero');
    var lineaCompleta = true;
    for (var j = 0; j < numerosFila.length; j++) {
      if (!numerosFila[j].classList.contains('marcado')) {
        lineaCompleta = false;
        break;
      }
    }
    if (lineaCompleta) {
      alert('¡Has completado una línea!');
      break;
    }
  }
}

// Función para verificar si se ha completado el bingo
function verificarBingo() {
  var cartonCompleto = true;
  var numerosCarton = document.getElementsByClassName('numero');
  for (var i = 0; i < numerosCarton.length; i++) {
    if (!numerosCarton[i].classList.contains('marcado')) {
      cartonCompleto = false;
      break;
    }
  }
  if (cartonCompleto) {
    alert('¡BINGO! ¡Has completado el cartón!');
  }
}