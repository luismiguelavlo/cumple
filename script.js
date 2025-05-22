gsap.registerPlugin(MotionPathPlugin);

// Crear pájaros voladores
function createBirds() {
  const birdsContainer = document.getElementById('birds');
  const numBirds = 5;

  for (let i = 0; i < numBirds; i++) {
    const bird = document.createElement('div');
    bird.className = 'bird';
    birdsContainer.appendChild(bird);

    // Posición inicial aleatoria
    const startY = gsap.utils.random(100, 300);
    const startX = gsap.utils.random(-100, window.innerWidth + 100);

    gsap.set(bird, {
      x: startX,
      y: startY
    });

    // Animación de vuelo
    gsap.to(bird, {
      duration: gsap.utils.random(15, 25),
      x: `+=${window.innerWidth + 200}`,
      y: gsap.utils.random(startY - 50, startY + 50),
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => x % (window.innerWidth + 200))
      }
    });

    // Animación de aleteo
    gsap.to(bird, {
      scaleY: 0.5,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
}

createBirds();

// Agregar después de createBirds()
function createStars() {
  const landscape = document.querySelector('.landscape');
  const numStars = 100;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = `star star-${Math.ceil(Math.random() * 3)}`;
    
    // Posición aleatoria
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 60}%`; // Solo en la parte superior del cielo
    
    landscape.appendChild(star);

    // Animación adicional de brillo
    gsap.to(star, {
      scale: gsap.utils.random(0.8, 1.2),
      duration: gsap.utils.random(1, 3),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

createStars();

// Texto de saludo
gsap.to(".greeting", {
  duration: 1.5,
  scale: 1.2,
  opacity: 1,
  ease: "elastic.out(1, 0.5)"
});

gsap.to(".name", {
  delay: 1.5,
  duration: 1,
  opacity: 1,
  y: -10,
  ease: "power2.out"
});

// Animación de globos flotando hacia arriba
gsap.utils.toArray(".balloon").forEach((balloon, i) => {
  gsap.to(balloon, {
    duration: 8,
    y: -600,
    x: gsap.utils.random(-100, 100),
    rotation: gsap.utils.random(-30, 30),
    repeat: -1,
    delay: i,
    ease: "sine.inOut",
    yoyo: true
  });
});

// Confeti (simulado con círculos animados)
for (let i = 0; i < 50; i++) {
  const div = document.createElement("div");
  div.style.width = "8px";
  div.style.height = "8px";
  div.style.borderRadius = "50%";
  div.style.backgroundColor = gsap.utils.random(["#ff4081", "#4caf50", "#2196f3", "#ffc107"]);
  div.style.position = "absolute";
  div.style.left = `${Math.random() * 100}%`;
  div.style.top = `-${Math.random() * 100}px`;
  document.querySelector(".confetti").appendChild(div);

  gsap.to(div, {
    duration: gsap.utils.random(3, 6),
    y: "100vh",
    x: `+=${gsap.utils.random(-100, 100)}`,
    rotation: gsap.utils.random(0, 360),
    repeat: -1,
    delay: gsap.utils.random(0, 5),
    ease: "none"
  });
}

// Mensajes para mostrar al explotar globos
const explosionMessages = [
  "¡Feliz cumpleaños Tomás, que este y todos los muchos años por venir estén llenos de alegría, salud y buenos momentos!. by: Juan Manuel 🎁",
  "¡Feliz cumpleaños al único líder de proyectos que puede gestionar un sprint, un deploy en viernes y una fiesta de cumpleaños sin que se caiga nada (bueno, excepto él después de unos tragos)! 🥳🍻 by: Luis Miguel ",
  "¡Que tengas un día increíble! 🥳",
  "¡Querido Tomas el adagio popular dice que los años nos vuelven mas viejos, pero mi pensar es que nos vuelven mas sabios, por eso en este nuevo año de vida te deseo te llegue cargado de mas sabiduría salud y prosperidad, que cumplas muchos años mas by: Darwin Mora! 🤗",
];

// Añadir evento a cada globo
let currentMessage = null;

document.querySelectorAll(".balloon").forEach((balloon, index) => {
  balloon.addEventListener("click", () => {
    // Si ya hay un mensaje, elimínalo primero
    if (currentMessage) {
      gsap.to(currentMessage, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => currentMessage.remove()
      });
    }

    // Obtener la posición del globo para el confeti
    const balloonRect = balloon.getBoundingClientRect();
    const balloonX = balloonRect.left + balloonRect.width / 2;
    const balloonY = balloonRect.top + balloonRect.height / 2;

    // Crear confeti para la explosión
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.style.width = "8px";
      confetti.style.height = "8px";
      confetti.style.borderRadius = "50%";
      confetti.style.backgroundColor = gsap.utils.random(["#ff4081", "#4caf50", "#2196f3", "#ffc107"]);
      confetti.style.position = "absolute";
      confetti.style.left = `${balloonX}px`;
      confetti.style.top = `${balloonY}px`;
      document.querySelector(".confetti").appendChild(confetti);

      // Animación del confeti
      gsap.to(confetti, {
        duration: gsap.utils.random(1, 2),
        x: gsap.utils.random(-150, 150),
        y: gsap.utils.random(-150, 150),
        rotation: gsap.utils.random(0, 360),
        opacity: 0,
        ease: "power2.out",
        onComplete: () => confetti.remove()
      });
    }

    // Animación de explosión
    gsap.to(balloon, {
      scale: 2,
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        const msg = document.createElement("div");
        msg.className = "balloon-msg";
        msg.innerText = explosionMessages[index % explosionMessages.length];
        balloon.parentElement.appendChild(msg);
        currentMessage = msg;

        gsap.fromTo(msg, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
        );

        // Quita el globo del DOM
        balloon.remove();
      }
    });
  });
});

// Mostrar texto de invitación
gsap.to(".invitation", {
  delay: 2.5,
  duration: 1,
  opacity: 1,
  y: -10,
  ease: "power2.out"
});

// Gestión del regalo que escapa
const giftBox = document.getElementById("giftBox");
const giftMsg = document.querySelector(".gift-msg");
const giftContainer = document.querySelector(".gift-container");

// Posicionar inicialmente la caja de regalo en la parte inferior
gsap.set(giftBox, { 
  x: 0, 
  y: 0,
  left: "50%",
  top: "85%", // Cambiado para posicionar en la parte inferior
  xPercent: -50,
  yPercent: -50
});

gsap.set(giftMsg, { 
  x: 0, 
  y: -80,
  left: "50%",
  top: "85%", // Ajustado para mantener el mensaje sobre la caja
  xPercent: -50
});

giftBox.addEventListener("mouseenter", () => {
  // Obtener dimensiones de la ventana
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const boxRect = giftBox.getBoundingClientRect();
  
  // Calcular los límites para que la caja no se salga de la pantalla
  const maxX = windowWidth - boxRect.width;
  const maxY = windowHeight - boxRect.height;
  
  // Generar posición aleatoria dentro de los límites de la pantalla completa
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  // Animar la caja y el mensaje juntos a una posición absoluta
  gsap.to(giftBox, {
    x: 0,
    y: 0,
    left: randomX,
    top: randomY,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      // Pequeña animación de rebote al llegar a la nueva posición
      gsap.to(giftBox, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
  });
  
  // Mantener el mensaje encima de la caja
  gsap.to(giftMsg, {
    x: 0,
    y: 0,
    left: randomX + boxRect.width/2,
    top: randomY - 60,
    xPercent: -50,
    duration: 0.5
  });
  
  // Efecto de rotación 3D al escapar
  gsap.to(giftBox, {
    rotationY: gsap.utils.random(-15, 15),
    rotationX: gsap.utils.random(-10, 10),
    duration: 0.5
  });
});

// Restablecer rotación cuando el mouse sale
giftBox.addEventListener("mouseleave", () => {
  gsap.to(giftBox, {
    rotationY: 0,
    rotationX: 0,
    duration: 0.5
  });
});

// Añadir un pequeño movimiento flotante constante a la caja de regalo
gsap.to(giftBox, {
  y: "+=10",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

function resetPage() {
  // Eliminar mensajes actuales
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
  }

  // Eliminar todos los globos existentes
  document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());

  // Recrear los globos
  const balloonsContainer = document.querySelector('.balloons');
  const colors = ['red', 'blue', 'green', 'yellow'];
  colors.forEach(color => {
    const balloon = document.createElement('div');
    balloon.className = `balloon ${color}`;
    balloonsContainer.appendChild(balloon);
    
    // Reiniciar animación del globo
    gsap.to(balloon, {
      duration: 8,
      y: -600,
      x: gsap.utils.random(-100, 100),
      rotation: gsap.utils.random(-30, 30),
      repeat: -1,
      delay: colors.indexOf(color),
      ease: "sine.inOut",
      yoyo: true
    });

    // Volver a añadir el evento click
    balloon.addEventListener("click", handleBalloonClick);
  });

  // Resetear posición del regalo
  const giftBox = document.getElementById("giftBox");
  const giftMsg = document.querySelector(".gift-msg");
  
  gsap.set(giftBox, { 
    x: 0, 
    y: 0,
    left: "50%",
    top: "85%",
    xPercent: -50,
    yPercent: -50,
    rotationY: 0,
    rotationX: 0,
    scale: 1
  });

  gsap.set(giftMsg, { 
    x: 0, 
    y: -80,
    left: "50%",
    top: "85%",
    xPercent: -50
  });
}

// Extraer la función del manejo del click del globo para poder reutilizarla
function handleBalloonClick() {
  if (currentMessage) {
    gsap.to(currentMessage, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => currentMessage.remove()
    });
  }

  const balloonRect = this.getBoundingClientRect();
  const balloonX = balloonRect.left + balloonRect.width / 2;
  const balloonY = balloonRect.top + balloonRect.height / 2;

  // Crear confeti para la explosión
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.borderRadius = "50%";
    confetti.style.backgroundColor = gsap.utils.random(["#ff4081", "#4caf50", "#2196f3", "#ffc107"]);
    confetti.style.position = "absolute";
    confetti.style.left = `${balloonX}px`;
    confetti.style.top = `${balloonY}px`;
    document.querySelector(".confetti").appendChild(confetti);

    gsap.to(confetti, {
      duration: gsap.utils.random(1, 2),
      x: gsap.utils.random(-150, 150),
      y: gsap.utils.random(-150, 150),
      rotation: gsap.utils.random(0, 360),
      opacity: 0,
      ease: "power2.out",
      onComplete: () => confetti.remove()
    });
  }

  gsap.to(this, {
    scale: 2,
    opacity: 0,
    duration: 0.3,
    ease: "power1.in",
    onComplete: () => {
      const index = Array.from(this.parentElement.children).indexOf(this);
      const msg = document.createElement("div");
      msg.className = "balloon-msg";
      msg.innerText = explosionMessages[index % explosionMessages.length];
      this.parentElement.appendChild(msg);
      currentMessage = msg;

      gsap.fromTo(msg, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );

      this.remove();
    }
  });
}

// Añadir el evento click al botón de reinicio
document.getElementById('resetButton').addEventListener('click', resetPage);

// Control de audio
const soundButton = document.getElementById('soundButton');
const backgroundMusic = document.getElementById('backgroundMusic');
let isMuted = true;

// Asegurarse de que el audio está cargado
backgroundMusic.load();

// Función para manejar el estado del audio
function toggleAudio() {
    if (isMuted) {
        backgroundMusic.play();
        soundButton.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reinicia la posición del audio
        soundButton.textContent = '🔈';
    }
    isMuted = !isMuted;
}

// Click en el botón de sonido
soundButton.addEventListener('click', toggleAudio);

// Iniciar música automáticamente cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.volume = 0.5; // 50% del volumen máximo
    // Intentar reproducir automáticamente
    try {
        backgroundMusic.play();
        soundButton.textContent = '🔊';
        isMuted = false;
    } catch (error) {
        console.log('Autoplay bloqueado:', error);
    }
});

// Backup: permitir reproducción con cualquier interacción del usuario
document.body.addEventListener('click', () => {
    if (isMuted && !backgroundMusic.playing) {
        try {
            backgroundMusic.play();
            soundButton.textContent = '🔊';
            isMuted = false;
        } catch (error) {
            console.log('Error al reproducir el audio:', error);
        }
    }
}, { once: true }); // El evento se ejecutará solo una vez



