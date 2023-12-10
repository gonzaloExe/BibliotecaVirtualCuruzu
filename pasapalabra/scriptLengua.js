

// Total preguntas del juego
const TOTAL_PREGUNTAS = 20;
// Tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
// Estructura para almacenar las preguntas
const bd_juego = [
  {
    id: 1,
    pregunta: "Figura retórica que consiste en atribuir cualidades humanas a seres inanimados o abstractos",
    respuesta: "personificación"
  },
  {
    id: 2,
    pregunta: "Género literario que se caracteriza por la narración de hechos reales o ficticios en forma de prosa",
    respuesta: "novela"
  },
  {
    id: 3,
    pregunta: "Repetición de un sonido, sílaba o palabra al comienzo de varias palabras en un verso o frase",
    respuesta: "aliteración"
  },
  {
    id: 4,
    pregunta: "Conjunto de palabras ordenadas según ciertas reglas y utilizadas como forma de comunicación",
    respuesta: "lenguaje"
  },
  {
    id: 5,
    pregunta: "Recursos gráficos utilizados en la escritura para dar énfasis o expresar ideas de manera no literal",
    respuesta: "figuras retóricas"
  },
  {
    id: 6,
    pregunta: "Obra literaria escrita para ser representada por actores en un escenario",
    respuesta: "drama"
  },
  {
    id: 7,
    pregunta: "Género literario que se caracteriza por la expresión de sentimientos y emociones de manera subjetiva",
    respuesta: "poesía"
  },
  {
    id: 8,
    pregunta: "Conjunto de reglas y normas que rigen el uso de un idioma",
    respuesta: "gramática"
  },
  {
    id: 9,
    pregunta: "Estudio científico de la estructura y el desarrollo de las palabras en un idioma",
    respuesta: "lexicología"
  },
  {
    id: 10,
    pregunta: "Uso exagerado o abusivo de palabras para expresar una idea o sentimiento",
    respuesta: "hipérbole"
  },
  {
    id: 11,
    pregunta: "Forma literaria que utiliza las palabras para representar o imitar sonidos o ruidos de la realidad",
    respuesta: "onomatopeya"
  },
  {
    id: 12,
    pregunta: "Estudio de los signos y las reglas que rigen el uso de la lengua en la comunicación",
    respuesta: "lingüística"
  },
  {
    id: 13,
    pregunta: "Obra literaria en la que el autor cuenta su propia vida y experiencias",
    respuesta: "autobiografía"
  },
  {
    id: 14,
    pregunta: "Conjunto de reglas y convenciones establecidas para la escritura y composición de textos",
    respuesta: "ortografía"
  },
  {
    id: 15,
    pregunta: "Palabra o conjunto de palabras con las que se inicia un poema épico o una canción popular",
    respuesta: "estrofa"
  },
  {
    id: 16,
    pregunta: "Representación gráfica de una palabra o concepto",
    respuesta: "símbolo"
  },
  {
    id: 17,
    pregunta: "Expresión breve y sentenciosa que expresa una verdad o un pensamiento profundo",
    respuesta: "adagio"
  },
  {
    id: 18,
    pregunta: "Estudio de la historia y evolución de las palabras y su significado",
    respuesta: "etimología"
  },
  {
    id: 19,
    pregunta: "Expresión literaria en la que se utiliza una comparación para resaltar una cualidad o característica",
    respuesta: "metáfora"
  },
  {
    id: 20,
    pregunta: "Uso de palabras o expresiones que suenan de manera similar pero tienen significados diferentes",
    respuesta: "juego de palabras"
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