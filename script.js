const USUARIO = "Tokito";
const CONTRASENA = "Gaara";

function login(){
  

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("login-error");

  if (user === USUARIO && pass === CONTRASENA) {
    document.getElementById("login-container").style.display = "none";
    mostrarPregunta();
  } else {
    error.innerText = "Datos incorrectos 💔... Pista: Nuestros hijos";
  }
}


const preguntas = [
  {
    texto: "De que equipo de futbol era de chiquito?",
    opciones: ["Racing", "Boca", "River", "San Miguel"],
    correcta: "Racing"
  },
  {
    texto: "Cual es mi personaje de Dragon Ball favorito?",
    opciones: ["Goku", "Gohan", "Picolo", "Vegeta"],
    correcta: "Goku"
  },
  {
    texto: "Completa la frase: 'Quien es el mas .... de la casa?",
    opciones: ["Lindo", "Capo", "Putito", "Gay"],
    correcta: "Putito"
  },
  {
    texto: "Fecha en la que tuve que haber nacido?",
    opciones: ["10/08/00", "15/08/00", "25/08/00", "12/08/00"],
    correcta: "12/08/00"
  },
  {
    texto: "Cual es mi segundo anime favorito?",
    opciones: ["Demon Slayer", "My Hero Academia", "Black Cover", "Dragon Ball"],
    correcta: "My Hero Academia"
  }
];

let indicePregunta = 0;

function aceptar() {
  alert("SABÍA QUE IBAS A DECIR QUE SÍ! 💖 TE AMO 3 MUCHOS, TENEMOS CITA EL 14! 🌹");
}

function escapar(boton) {
    
    const width = window.innerWidth - boton.offsetWidth;
    const height = window.innerHeight - boton.offsetHeight;

    
    const x = Math.random() * width;
    const y = Math.random() * height;

  
    boton.style.position = "fixed"; 
    boton.style.left = x + "px";
    boton.style.top = y + "px";
    boton.style.zIndex = "9999"; 
}

function mostrarPregunta() {
  document.getElementById("quiz-container").style.display = "block";
  const p = preguntas[indicePregunta];
  document.getElementById("pregunta").innerText = p.texto;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  p.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => {
      if (op === p.correcta) {
        indicePregunta++;
        if (indicePregunta < preguntas.length) {
          mostrarPregunta();
        } else {
          iniciarAnimacion();
        }
      } else {
        alert("UFF, casii... ahr, si ves este cartel es porque le erraste y me debes un chocolate 🍫");
      }
    };
    opcionesDiv.appendChild(btn);
  });
}

function iniciarAnimacion() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("flores-container").style.display = "block";

  const audio = document.querySelector("audio");
  if (audio) {
    audio.play().catch(e => {
      console.warn("Autoplay bloqueado");
    });
  }

  const canvas = document.getElementById("flores");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const textos = ["💖", "🌸", "💐", "💕", "🌼", "🪻", "🌹", "🌻", "🌷"];
  const items = [];

  for (let i = 0; i < 80; i++) {
    items.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocidad: 1 + Math.random() * 2,
      texto: textos[Math.floor(Math.random() * textos.length)],
      tamaño: 16 + Math.random() * 20,
      opacidad: 0.8 + Math.random() * 0.2
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let item of items) {
      ctx.font = `${item.tamaño}px Segoe UI`;
      ctx.fillStyle = `rgba(255,255,255,${item.opacidad})`;
      ctx.fillText(item.texto, item.x, item.y);
      item.y += item.velocidad;
      if (item.y > canvas.height) {
        item.y = -20;
        item.x = Math.random() * canvas.width;
        item.texto = textos[Math.floor(Math.random() * textos.length)];
      }
    }
    requestAnimationFrame(animar);
  }

  animar();
}
