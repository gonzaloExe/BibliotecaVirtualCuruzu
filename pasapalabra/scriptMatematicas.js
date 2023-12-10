
// Total preguntas del juego
const TOTAL_PREGUNTAS = 20;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "Operación matemática que consiste en sumar dos o más números",
    respuesta: "suma"
  },
  {
    id: 2,
    pregunta: "Número que se obtiene al dividir la circunferencia de un círculo entre su diámetro",
    respuesta: "pi"
  },
  {
    id: 3,
    pregunta: "Propiedad matemática que establece que la suma de dos números no depende del orden en que se suman",
    respuesta: "propiedad conmutativa"
  },
  {
    id: 4,
    pregunta: "Expresión matemática que establece una igualdad entre dos cantidades o expresiones",
    respuesta: "ecuación"
  },
  {
    id: 5,
    pregunta: "Valor numérico que se encuentra en el centro de un conjunto de datos ordenados de menor a mayor",
    respuesta: "mediana"
  },
  {
    id: 6,
    pregunta: "Estudio de las propiedades y las relaciones de los números y las operaciones",
    respuesta: "aritmética"
  },
  {
    id: 7,
    pregunta: "Figura geométrica de tres lados",
    respuesta: "triángulo"
  },
  {
    id: 8,
    pregunta: "Proceso matemático que consiste en determinar el valor numérico desconocido en una ecuación",
    respuesta: "resolver"
  },
  {
    id: 9,
    pregunta: "Conjunto de números que se obtienen al multiplicar un número por cada uno de los números enteros",
    respuesta: "tabla de multiplicar"
  },
  {
    id: 10,
    pregunta: "Conjunto ordenado de números o cantidades",
    respuesta: "secuencia"
  },
  {
    id: 11,
    pregunta: "Teorema matemático que establece que en un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos",
    respuesta: "teorema de Pitágoras"
  },
  {
    id: 12,
    pregunta: "Conjunto de puntos que se encuentran a la misma distancia de un punto fijo llamado centro",
    respuesta: "circunferencia"
  },
  {
    id: 13,
    pregunta: "Número que se obtiene al elevar una base a un exponente",
    respuesta: "potencia"
  },
  {
    id: 14,
    pregunta: "Área de la matemática que se encarga del estudio de las propiedades y las relaciones de las figuras geométricas en el plano o en el espacio",
    respuesta: "geometría"
  },
  {
    id: 15,
    pregunta: "Operación matemática que consiste en dividir un número en partes iguales",
    respuesta: "división"
  },
  {
    id: 16,
    pregunta: "Conjunto de números que se extiende infinitamente en ambas direcciones en una recta",
    respuesta: "números reales"
  },
  {
    id: 17,
    pregunta: "Teorema matemático que establece que el orden de los factores no altera el producto",
    respuesta: "propiedad conmutativa de la multiplicación"
  },
  {
    id: 18,
    pregunta: "Área de la matemática que se encarga del estudio de las propiedades y las relaciones de los números",
    respuesta: "álgebra"
  },
  {
    id: 19,
    pregunta: "Conjunto de números que se obtienen al sumar un número por cada uno de los números enteros",
    respuesta: "tabla de sumar"
  },
  {
    id: 20,
    pregunta: "Conjunto de números enteros positivos y negativos, incluyendo el cero",
    respuesta: "números enteros"
  },
]

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