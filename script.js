// TABLERO CREACION DE MATRIZ
var tablero = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];




var jugadorActual = 'X';
var juegoActivo = true;

// Función para manejar el clic en una celda del tablero (jugador)

function haceMovimiento(fila, col) {

  if (juegoActivo && tablero[fila][col] === '') {
    tablero[fila][col] = jugadorActual;
    document.getElementById('board').rows[fila].cells[col].innerHTML = jugadorActual;

    // Verificar si hay un ganador
    if (verificarGanador(jugadorActual)) {
      document.getElementById('message').innerText = '¡' + jugadorActual + ' ha ganado!';
      juegoActivo = false;
    } else
    
    if (verificarEmpate()) {
      // Verificar si hay empate
      document.getElementById('message').innerText = '¡Empate!';
      juegoActivo = false;
    } else {
      // Cambiar el turno del jugador
      jugadorActual = 'O';
      document.getElementById('message').innerText = 'Turno de la Máquina\nSímbolo ' + jugadorActual;
      // Realizar el movimiento de la máquina
      setTimeout(hacerMovimientoComputadora, 1000);
    }
  }
}

function reiniciarJuego(){
  location.reload();
}

// Función para manejar el movimiento de la máquina
function hacerMovimientoComputadora() {
  var movimientosDisponibles = obtenerMovimientosDisponibles();

  if (movimientosDisponibles.length > 0) {
    var indiceAleatorio = Math.floor(Math.random() * movimientosDisponibles.length);
    var movimiento = movimientosDisponibles[indiceAleatorio];

    tablero[movimiento.fila][movimiento.col] = jugadorActual;
    document.getElementById('board').rows[movimiento.fila].cells[movimiento.col].innerHTML = jugadorActual;

    // Verificar si la máquina ha ganado
    if (verificarGanador(jugadorActual)) {
      document.getElementById('message').innerText = '¡La máquina ha ganado!';
      juegoActivo = false;
    } else if (verificarEmpate()) {
      // Verificar si hay empate
      document.getElementById('message').innerText = '¡Empate!';
      juegoActivo = false;
    } else {
      jugadorActual = 'X'; // Cambiar el turno al jugador
      document.getElementById('message').innerText = 'Turno del Jugador\nSímbolo ' + jugadorActual;
    }
  }
}

// Función para obtener los movimientos disponibles en el tablero
//Recordar que se esta obteniendo por medio de una matriz
function obtenerMovimientosDisponibles() {
  var movimientos = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tablero[i][j] === '') {
        movimientos.push({ fila: i, col: j });
      }
    }
  }
  return movimientos;
}

// Función para verificar si hay un ganador
//Recordar que la verificacion se esta obteniendo por medio de una matriz
function verificarGanador(jugador) {
  for (var i = 0; i < 3; i++) {
    // Verificar filas
    if (tablero[i][0] === jugador && tablero[i][1] === jugador && tablero[i][2] === jugador) {
      return true;
    }
    // Verificar columnas
    if (tablero[0][i] === jugador && tablero[1][i] === jugador && tablero[2][i] === jugador) {
      return true;
    }
  }
  // Verificar diagonales
  if (tablero[0][0] === jugador && tablero[1][1] === jugador && tablero[2][2] === jugador) {
    return true;
  }
  if (tablero[0][2] === jugador && tablero[1][1] === jugador && tablero[2][0] === jugador) {
    return true;
  }
  return false;
}



// Función para verificar si hay empate
//Recordar que se esta obteniendo por medio de una matriz
function verificarEmpate() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tablero[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

//////////////FWD COSTA RICA /////////////////