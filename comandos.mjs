let contador = 0;
let victoria = 0;
let control = [];
var images = ["caballo", "copa", "espada", "oro", "rey", "sota"];
var clone = images.slice(0);
var cards = images.concat(clone);
// Función mezcladora
for (
  var j, x, i = cards.length;
  i;
  j = Math.floor(Math.random() * i),
    x = cards[--i],
    cards[i] = cards[j],
    cards[j] = x
) {}
//----------------------------------
var seconds = 0;
var tens = 0;
var minutes = 0;
let pares = 0;
let score = 10000;

// Función del reloj

const startTime = new Date().valueOf();
let nextExpected = startTime + 100;

function printElapsedTime(startTime) {
  let curTime = new Date().valueOf();
  let nextInterval = 100 + nextExpected - curTime;
  let tiempofinal = setTimeout(printElapsedTime, nextInterval, startTime);
  nextExpected = curTime + nextInterval;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var appendMinutes = document.getElementById("minutes");
  tens++;
  appendTens.innerHTML = tens;

  if (tens > 9) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }

  if (seconds > 59) {
    minutes++;
    appendMinutes.innerHTML = "0" + minutes;
    tens = 0;
    appendTens.innerHTML = 0;
    seconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }

  if (minutes > 9) {
    appendMinutes.innerHTML = minutes;
  }
  if (victoria == 6) {
    clearTimeout(tiempofinal);
    appendTens.innerHTML = 0;
    appendSeconds.innerHTML = "00";
    appendMinutes.innerHTML = 0;
  }
}

//-----Función principal--------------

function prueba(elementid) {
  // dbox("Ganaste!" + "<br>" + "Tu puntaje fue de: " + score);
  setTimeout(printElapsedTime, 100, startTime);
  let dni = elementid;
  let valor = document.getElementById(dni);
  if (valor.src.slice(-11) == "reverso.png") {
    valor.style.transform = "rotateY(180deg)";
    valor.style.transitionProperty = "all 0.5s ease-in-out";
    valor.style.transitionDuration = "0.8s";
    valor.style.pointerEvents = "none";
    // valor.setAttribute("data-estado", "frente");
    valor.setAttribute("src", "./imgcartas/" + cards[dni - 1] + ".png");
    control.push(dni);
    contador++;
    // console.log(control, contador);
  } else {
    valor.style.transform = "rotateY(0deg)";
    valor.style.transitionProperty = "all 0.5s ease-in-out";
    valor.style.transitionDuration = "0.8s";
    valor.style.pointerEvents = "auto";
    // valor.setAttribute("data-estado", "dorso");
    valor.src = "./imgcartas/reverso.png";
  }
  if (contador == 2) {
    for (let i = 1; i < 13; i++) {
      document.getElementById(i).style.pointerEvents = "none";
    }
    if (
      document.getElementById(control[0]).src !=
      document.getElementById(control[1]).src
    ) {
      pares++;
      setTimeout(function () {
        document.getElementById(control[0]).style.transform = "rotateY(0deg)";
        document.getElementById(control[0]).style.transitionProperty =
          "all 0.5s ease-in-out";
        document.getElementById(control[0]).style.transitionDuration = "0.8s";
        document.getElementById(control[0]).src = "./imgcartas/reverso.png";
        document.getElementById(control[1]).style.transform = "rotateY(0deg)";
        document.getElementById(control[1]).style.transitionProperty =
          "all 0.5s ease-in-out";
        document.getElementById(control[1]).style.transitionDuration = "0.8s";
        document.getElementById(control[1]).src = "./imgcartas/reverso.png";
        contador = 0;
        control = [];
      }, 1000);
    } else if (control[0] != control[1]) {
      setTimeout(function () {
        document.getElementById(control[0]).style.opacity = "0.6";
        document.getElementById(control[0]).style.pointerEvents = "none";
        document.getElementById(control[0]).style.cursor = "default";
        document.getElementById(control[1]).style.opacity = "0.6";
        document.getElementById(control[1]).style.pointerEvents = "none";
        document.getElementById(control[1]).style.cursor = "default";
        contador = 0;
        control = [];
        victoria++;
        // console.log("Victoria " + victoria);
      }, 1002);
    }

    setTimeout(function () {
      for (let i = 1; i < 13; i++) {
        document.getElementById(i).style.pointerEvents = "auto";
      }
    }, 1001);
  }
  setTimeout(function () {
    if (victoria == 6) {
      for (let i = 1; i < 13; i++) {
        document.getElementById(i).style.pointerEvents = "none";
      }
      score = Math.round(
        score - minutes * 60 * 10 * 4 - seconds * 10 * 2 - tens - pares * 250
      );
      if (score < 0) {
        score = 0;
      }
      // console.log([
      //   minutes * 60 * 10 * 4 - seconds * 10 * 2 - tens,
      //   pares * 250,
      //   pares,
      // ]);
      return dbox("Ganaste!" + "<br>" + "Tu puntuación fue de: " + score);
    }
  }, 1005);
}

//--------------Mensaje final----------------------------

function dbox(msg) {
  if (msg != undefined) {
    document.getElementById("boxTxt").innerHTML = msg;
    document.getElementById("boxBack").classList.add("show");
  } else {
    //para el botón guardar puntuación momentáneamente
    document.getElementById("boxBack").classList.remove("show");
  }
}

//--------------Botón Volver a Jugar------------------------

function reiniciar() {
  window.location.reload();
}

//----------------Guardar Puntos----------------------------

function guardar() {
  console.log(localStorage.getItem("puntaje"));
  if (localStorage.getItem("puntaje") != null) {
    if (localStorage.getItem("puntaje") < score) {
      localStorage.puntaje = score;
    }
  } else {
    localStorage.setItem("puntaje", score);
  }
  console.log(score);
  window.location.reload();
}
