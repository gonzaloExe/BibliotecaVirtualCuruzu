


// Total preguntas del juego
const TOTAL_PREGUNTAS = 20;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "Fecha del comienzo de la Revolución Francesa",
    respuesta: "1789"
  },
  {
    id: 2,
    pregunta: "Civilización antigua que construyó las pirámides de Giza",
    respuesta: "egipcios"
  },
  {
    id: 3,
    pregunta: "Emperador romano que adoptó el cristianismo como religión oficial del Imperio",
    respuesta: "constantino"
  },
  {
    id: 4,
    pregunta: "Líder militar y político francés que se convirtió en emperador y gobernó gran parte de Europa en el siglo XIX",
    respuesta: "napoleon"
  },
  {
    id: 5,
    pregunta: "Fecha del comienzo de la Primera Guerra Mundial",
    respuesta: "1914"
  },
  {
    id: 6,
    pregunta: "Cultura antigua que construyó la ciudad de Machu Picchu en los Andes",
    respuesta: "incas"
  },
  {
    id: 7,
    pregunta: "Fecha del final de la Segunda Guerra Mundial",
    respuesta: "1945"
  },
  {
    id: 8,
    pregunta: "Revolución que ocurrió en Rusia en 1917 y condujo al derrocamiento del gobierno zarista",
    respuesta: "revolución rusa"
  },
  {
    id: 9,
    pregunta: "Líder político y defensor de los derechos civiles en Sudáfrica que luchó contra el apartheid",
    respuesta: "nelson mandela"
  },
  {
    id: 10,
    pregunta: "Fecha del comienzo de la Guerra Fría",
    respuesta: "1947"
  },
  {
    id: 11,
    pregunta: "Civilización antigua que construyó la ciudad de Teotihuacán en México",
    respuesta: "teotihuacanos"
  },
  {
    id: 12,
    pregunta: "Reina de Inglaterra conocida como la Reina Virgen y que gobernó durante el período isabelino",
    respuesta: "isabel i"
  },
  {
    id: 13,
    pregunta: "Fecha del comienzo de la Revolución Industrial",
    respuesta: "1760"
  },
  {
    id: 14,
    pregunta: "Dictador alemán que lideró el partido nazi y desencadenó la Segunda Guerra Mundial",
    respuesta: "adolf hitler"
  },
  {
    id: 15,
    pregunta: "Civilización antigua que construyó la ciudad de Troya en Asia Menor",
    respuesta: "troyanos"
  },
  {
    id: 16,
    pregunta: "Fecha de la firma de la Declaración de Independencia de los Estados Unidos",
    respuesta: "1776"
  },
  {
    id: 17,
    pregunta: "Revolución que tuvo lugar en China entre 1949 y 1951, liderada por Mao Zedong",
    respuesta: "revolución china"
  },
  {
    id: 18,
    pregunta: "Imperio que dominó gran parte de Europa durante la Edad Media",
    respuesta: "imperio romano"
  },
  {
    id: 19,
    pregunta: "Fecha del comienzo de la Revolución Rusa",
    respuesta: "1917"
  },
  {
    id: 20,
    pregunta: "Filósofo y líder político chino que fundó el confucianismo",
    respuesta: "confucio"
  },
];



// Preguntas que ya han sido contestadas. Si están en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var cantidadAcertadas = 0;

// Variable que mantiene el número de pregunta actual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

// Boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

// Creamos el círculo con los números del 1 al 20
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = i;
  circle.id = i;
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(93 + 140 * Math.cos(angle));
  const y = Math.round(93 + 140 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

// Función que carga la pregunta
function cargarPregunta() {
  numPreguntaActual++;
  if (numPreguntaActual >= TOTAL_PREGUNTAS) {
    numPreguntaActual = 0;
  }

  if (estadoPreguntas.indexOf(0) >= 0) {
    while (estadoPreguntas[numPreguntaActual] === 1) {
      numPreguntaActual++;
      if (numPreguntaActual >= TOTAL_PREGUNTAS) {
        numPreguntaActual = 0;
      }
    }

    document.getElementById("letra-pregunta").textContent = numPreguntaActual + 1;
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
    var numero = numPreguntaActual + 1;
    document.getElementById(numero).classList.add("pregunta-actual");
  } else {
    clearInterval(countdown);
    mostrarPantallaFinal();
  }
}

// Detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
var myButton = document.getElementById("myButton");
myButton.addEventListener("click", function(event) {
  if (respuesta.value === "") {
    alert("Debe ingresar un valor!!");
    return;
  }
  var txtRespuesta = respuesta.value;
  controlarRespuesta(txtRespuesta.toLowerCase());
});

respuesta.addEventListener("keyup", function(event) {
  // Detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if (respuesta.value === "") {
      alert("Debe ingresar un valor!!");
      return;
    }
    // Obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

// Función que controla la respuesta
function controlarRespuesta(txtRespuesta) {
  if (txtRespuesta.toLowerCase().trim() === bd_juego[numPreguntaActual].respuesta) {
    cantidadAcertadas++;
    estadoPreguntas[numPreguntaActual] = 1;
    var numero = numPreguntaActual + 1;
    document.getElementById(numero).classList.remove("pregunta-actual");
    document.getElementById(numero).classList.add("bien-respondida");
  } else {
    estadoPreguntas[numPreguntaActual] = 1;
    var numero = numPreguntaActual + 1;
    document.getElementById(numero).classList.remove("pregunta-actual");
    document.getElementById(numero).classList.add("mal-respondida");
  }
  respuesta.value = "";
  cargarPregunta();
}

// Botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var numero = numPreguntaActual + 1;
  document.getElementById(numero).classList.remove("pregunta-actual");
  cargarPregunta();
});

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo() {
  countdown = setInterval(() => {
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

// Mostrar la pantalla final
function mostrarPantallaFinal() {
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = ((cantidadAcertadas * 100) / TOTAL_PREGUNTAS) + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

// Botón para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);

  var circulos = document.getElementsByClassName("circle");
  for (i = 0; i < circulos.length; i++) {
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

// Verificar si la API de bloqueo de orientación es compatible con el navegador
if (screen.orientation && screen.orientation.lock) {
  // Bloquear la orientación vertical
  screen.orientation.lock("landscape").catch(function(error) {
    console.log("No se pudo bloquear la orientación: ", error);
  });
} else if (screen.lockOrientation) {
  // Bloquear la orientación vertical (versión obsoleta de la API)
  screen.lockOrientation("landscape").catch(function(error) {
    console.log("No se pudo bloquear la orientación: ", error);
  });
} else {
  console.log("La API de bloqueo de orientación no es compatible con este navegador.");
}