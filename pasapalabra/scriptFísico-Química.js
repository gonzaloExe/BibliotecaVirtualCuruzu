

// Total preguntas del juego
const TOTAL_PREGUNTAS = 20;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "¿Cuál es la unidad de medida de la temperatura?",
    respuesta: "grado Celsius"
  },
  {
    id: 2,
    pregunta: "¿Cuál es la fórmula para calcular la velocidad?",
    respuesta: "velocidad = distancia / tiempo"
  },
  {
    id: 3,
    pregunta: "¿Qué propiedad de la materia indica la cantidad de materia en un objeto?",
    respuesta: "masa"
  },
  {
    id: 4,
    pregunta: "¿Cuál es la fórmula para calcular la densidad?",
    respuesta: "densidad = masa / volumen"
  },
  {
    id: 5,
    pregunta: "¿Cuál es el símbolo químico del hidrógeno?",
    respuesta: "H"
  },
  {
    id: 6,
    pregunta: "¿Cuál es la ley de Newton que establece que a toda acción le corresponde una reacción de igual magnitud pero en sentido contrario?",
    respuesta: "tercera ley de Newton"
  },
  {
    id: 7,
    pregunta: "¿Cuál es la unidad de medida de la energía?",
    respuesta: "joule"
  },
  {
    id: 8,
    pregunta: "¿Cuál es el símbolo químico del oxígeno?",
    respuesta: "O"
  },
  {
    id: 9,
    pregunta: "¿Qué tipo de energía se encuentra en un objeto en movimiento?",
    respuesta: "energía cinética"
  },
  {
    id: 10,
    pregunta: "¿Cuál es la fórmula para calcular la fuerza?",
    respuesta: "fuerza = masa * aceleración"
  },
  {
    id: 11,
    pregunta: "¿Cuál es el símbolo químico del carbono?",
    respuesta: "C"
  },
  {
    id: 12,
    pregunta: "¿Qué propiedad de la materia indica la cantidad de espacio que ocupa un objeto?",
    respuesta: "volumen"
  },
  {
    id: 13,
    pregunta: "¿Cuál es la ley de Newton que establece que la aceleración de un objeto es directamente proporcional a la fuerza neta aplicada e inversamente proporcional a su masa?",
    respuesta: "segunda ley de Newton"
  },
  {
    id: 14,
    pregunta: "¿Cuál es la fórmula para calcular el área de un rectángulo?",
    respuesta: "área = base * altura"
  },
  {
    id: 15,
    pregunta: "¿Cuál es el símbolo químico del agua?",
    respuesta: "H2O"
  },
  {
    id: 16,
    pregunta: "¿Cuál es la ley de Newton que establece que un objeto en reposo tiende a permanecer en reposo y un objeto en movimiento tiende a permanecer en movimiento con la misma velocidad y en línea recta?",
    respuesta: "primera ley de Newton"
  },
  {
    id: 17,
    pregunta: "¿Cuál es la unidad de medida de la presión?",
    respuesta: "pascal"
  },
  {
    id: 18,
    pregunta: "¿Cuál es el símbolo químico del hierro?",
    respuesta: "Fe"
  },
  {
    id: 19,
    pregunta: "¿Qué tipo de energía se encuentra en un objeto en reposo?",
    respuesta: "energía potencial"
  },
  {
    id: 20,
    pregunta: "¿Cuál es la fórmula para calcular el volumen de un cubo?",
    respuesta: "volumen = lado * lado * lado"
  }
];


// Preguntas que ya han sido contestadas. Si están en 0 no han sido contestadas
var estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
comenzar.addEventListener("click", function (event) {
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
myButton.addEventListener("click", function (event) {
  if (respuesta.value === "") {
    alert("Debe ingresar un valor!!");
    return;
  }
  var txtRespuesta = respuesta.value;
  controlarRespuesta(txtRespuesta.toLowerCase());
});

respuesta.addEventListener("keyup", function (event) {
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
pasar.addEventListener("click", function (event) {
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
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
}

// Botón para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function (event) {
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
  screen.orientation.lock("landscape").catch(function (error) {
    console.log("No se pudo bloquear la orientación: ", error);
  });
} else if (screen.lockOrientation) {
  // Bloquear la orientación vertical (versión obsoleta de la API)
  screen.lockOrientation("landscape").catch(function (error) {
    console.log("No se pudo bloquear la orientación: ", error);
  });
} else {
  console.log("La API de bloqueo de orientación no es compatible con este navegador.");
}