// Total preguntas del juego
const TOTAL_PREGUNTAS = 20;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "Proceso mediante el cual los organismos vivos producen descendencia similar a ellos",
    respuesta: "reproducción"
  },
  {
    id: 2,
    pregunta: "Unidad básica de la vida",
    respuesta: "célula"
  },
  {
    id: 3,
    pregunta: "Molécula que contiene la información genética de los seres vivos",
    respuesta: "ADN"
  },
  {
    id: 4,
    pregunta: "Capacidad de los organismos vivos para adaptarse al medio ambiente",
    respuesta: "adaptación"
  },
  {
    id: 5,
    pregunta: "Proceso mediante el cual las plantas fabrican su propio alimento utilizando la energía del sol",
    respuesta: "fotosíntesis"
  },
  {
    id: 6,
    pregunta: "Ciencia que estudia los organismos y su relación con el medio ambiente",
    respuesta: "ecología"
  },
  {
    id: 7,
    pregunta: "Órgano responsable de la respiración en los seres humanos",
    respuesta: "pulmones"
  },
  {
    id: 8,
    pregunta: "Proceso de transformación de una larva en un adulto",
    respuesta: "metamorfosis"
  },
  {
    id: 9,
    pregunta: "Órgano responsable del bombeo de sangre en el cuerpo humano",
    respuesta: "corazón"
  },
  {
    id: 10,
    pregunta: "Estudio de los seres vivos y su estructura",
    respuesta: "anatomía"
  },
  {
    id: 11,
    pregunta: "Ciencia que se encarga del estudio de los genes y la herencia",
    respuesta: "genética"
  },
  {
    id: 12,
    pregunta: "Proceso mediante el cual los organismos obtienen energía de los alimentos",
    respuesta: "digestión"
  },
  {
    id: 13,
    pregunta: "Sustancia química responsable de transmitir las señales entre las células nerviosas",
    respuesta: "neurotransmisor"
  },
  {
    id: 14,
    pregunta: "Conjunto de organismos de diferentes especies que viven juntos en un mismo lugar",
    respuesta: "ecosistema"
  },
  {
    id: 15,
    pregunta: "Ciencia que estudia los virus y su relación con los organismos vivos",
    respuesta: "virología"
  },
  {
    id: 16,
    pregunta: "Hueso más largo del cuerpo humano",
    respuesta: "fémur"
  },
  {
    id: 17,
    pregunta: "Capa externa y protectora de las células vegetales",
    respuesta: "pared celular"
  },
  {
    id: 18,
    pregunta: "Proceso de liberación de energía en las células para realizar sus funciones",
    respuesta: "respiración celular"
  },
  {
    id: 19,
    pregunta: "Órgano responsable de la filtración y eliminación de desechos en el cuerpo humano",
    respuesta: "riñón"
  },
  {
    id: 20,
    pregunta: "Proceso de cambio gradual de las especies a lo largo del tiempo",
    respuesta: "evolución"
  }
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


