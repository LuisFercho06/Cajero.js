var cuentas = [
  { nombre: "Luis", saldo: 200, password: "123" },
  { nombre: "Camilo", saldo: 290, password: "234" },
  { nombre: "Johanna", saldo: 67, password: "888" }
];

var indiceCuentaActual = -1;

function iniciarSesion() {
  var seleccion = document.getElementById("cuentas");
  var password = document.getElementById("password").value;
  var indiceCuenta = seleccion.options.selectedIndex;

  if (verificarPassword(indiceCuenta, password)) {
    indiceCuentaActual = indiceCuenta;
    mostrarOperaciones();
    limpiarFormulario();
  } else {
    mostrarMensajeError("Contraseña incorrecta. Intenta nuevamente.");
  }
}

function verificarPassword(indiceCuenta, password) {
  var opcionSeleccionada = document.getElementById("cuentas").options[indiceCuenta];
  var passwordCorrecta = opcionSeleccionada.dataset.password;

  return password === passwordCorrecta;
}

function mostrarOperaciones() {
  var seleccionCuenta = document.getElementById("seleccion-cuenta");
  var operaciones = document.getElementById("operaciones");
  var nombreCuenta = document.getElementById("nombre-cuenta");
  var saldo = document.getElementById("saldo");

  var cuentaActual = cuentas[indiceCuentaActual];
  nombreCuenta.textContent = "Cuenta: " + cuentaActual.nombre;
  saldo.textContent = cuentaActual.saldo;

  seleccionCuenta.style.display = "none";
  operaciones.style.display = "block";
}

function limpiarFormulario() {
  document.getElementById("password").value = "";
  document.getElementById("mensaje-error").textContent = "";
  document.getElementById("mensaje-operacion").textContent = "";
  document.getElementById("monto").value = "";
}

function mostrarMensajeError(mensaje) {
  document.getElementById("mensaje-error").textContent = mensaje;
}

function consultarSaldo() {
  var saldo = cuentas[indiceCuentaActual].saldo;
  document.getElementById("mensaje-operacion").textContent = "Saldo actual: $" + saldo;
}

function ingresarMonto() {
  var montoInput = document.getElementById("monto");
  var btnOperacion = document.getElementById("btn-operacion");

  montoInput.style.display = "block";
  btnOperacion.textContent = "Ingresar";
  btnOperacion.style.display = "inline-block";
}

function retirarMonto() {
  var montoInput = document.getElementById("monto");
  var btnOperacion = document.getElementById("btn-operacion");

  montoInput.style.display = "block";
  btnOperacion.textContent = "Retirar";
  btnOperacion.style.display = "inline-block";
}

function realizarOperacion() {
  var montoInput = document.getElementById("monto");
  var monto = parseFloat(montoInput.value);
  var btnOperacion = document.getElementById("btn-operacion");
  var cuentaActual = cuentas[indiceCuentaActual];

  if (btnOperacion.textContent === "Ingresar") {
    if (monto > 0) {
      cuentaActual.saldo += monto;
      document.getElementById("mensaje-operacion").textContent = "Monto ingresado: $" + monto + "\nNuevo saldo: $" + cuentaActual.saldo;
      montoInput.value = "";
    } else {
      document.getElementById("mensaje-operacion").textContent = "El monto ingresado debe ser mayor a 0.";
    }
  } else if (btnOperacion.textContent === "Retirar") {
    if (monto > 0) {
      if (monto <= cuentaActual.saldo) {
        if (monto >= 10 && monto <= 990) {
          cuentaActual.saldo -= monto;
          document.getElementById("mensaje-operacion").textContent = "Monto retirado: $" + monto + "\nNuevo saldo: $" + cuentaActual.saldo;
          montoInput.value = "";
        } else {
          document.getElementById("mensaje-operacion").textContent = "El monto debe ser mayor o igual a $10 y menor o igual a $990.";
        }
      } else {
        document.getElementById("mensaje-operacion").textContent = "Saldo insuficiente.";
      }
    } else {
      document.getElementById("mensaje-operacion").textContent = "El monto a retirar debe ser mayor a 0.";
    }
  }
}

function cerrarSesion() {
  indiceCuentaActual = -1;
  limpiarFormulario();

  var seleccionCuenta = document.getElementById("seleccion-cuenta");
  var operaciones = document.getElementById("operaciones");

  seleccionCuenta.style.display = "block";
  operaciones.style.display = "none";
}