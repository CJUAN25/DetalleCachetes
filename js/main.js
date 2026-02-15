// ============================================
// REGALO DIGITAL: LOFI NOCTURNO MÁGICO Y 3D
// main.js - Mecánica principal "Atrapar Estrellas"
// ============================================

// ===== ARRAY DE RECUERDOS (HISTORIAS ESPECIALES) =====
const recuerdos = [
    'Una de nuestras primeras evidencias juntos, quién iba a pensar que esto sí iba a funcionar (igual sí tenía mucha fe).',
    'Recuerdo que este día la pasé muy bien contigo, extraño esa sensación de que querías tomarte una foto recostándote sobre mí... recuerdo tanto que me dijiste que nosotros no parecíamos de pelear, que daba la impresión de que nos iba a funcionar bien todo porque éramos todo bien o nos entendíamos.',
    'Recuerdo mucho ese día porque me prendí súper fácil con un granizado y no sé cómo llegué a la casa pero igual el premio estaba al llegar.',
    'Nuestro primer viaje juntos, tarde y todo pero disfruté mucho tu compañía, disfruté verte manejar, ver los atardeceres y conocer más contigo, sentir tus abrazos y todo... espero ojalá volver a vivirlo.',
    'Esta no se queda por fuera, teníamos la oportunidad de sacar la mejor foto pero te dio pena, aun así lo recuerdo de manera muy especial.',
    'Este día la pasé tan pero tan bien contigo, un día frío, pero con buena compañía. Para ser sincero lo disfruté, aunque aún tengo un poquito de miedo por el descuido que se disfrutó jaja.',
    'La foto que me da nostalgia, marcaba un antes y un después de lo que pasó e iba a pasar después en Florencia. Aún no acepto que hubiéramos quedado a distancia, no quería que quedara como un sueño todo lo vivido, quería que siguiéramos viviendo más de lo que nos faltó.'
];

// ===== ARRAY DE MENSAJES ANTIGUOS (PARA FLIP CARDS) =====
const mensajesAntiguos = [
    'Tienes una forma de ser que me encanta y una personalidad muy noble, no cambies eso.',
    'Tienes la mejor sonrisa del mundo; cada vez que te veo sonreír, me enamoro más.',
    'Gracias por aguantar lo estresante que soy a veces.',
    'Eres demasiado inteligente y creativa. Créetelo más, porque eres capaz de mucho más de lo que piensas.',
    'Aunque a veces sea frío o te diga "piroba", sabes que te quiero mucho y que todo es molestando.',
    'Gracias por existir y por hacer tan bonito todo cuando estás tú, espero verte pronto.',
    'La verdad es que eres muy linda y quiero compartir mucho más tiempo contigo.'
];

const mensajesPorPieza = {
    pieza1: mensajesAntiguos[0],
    pieza2: mensajesAntiguos[1],
    pieza3: mensajesAntiguos[2],
    pieza4: mensajesAntiguos[3],
    pieza5: mensajesAntiguos[4],
    pieza6: mensajesAntiguos[5],
    pieza7: mensajesAntiguos[6]
};

// ===== VARIABLES GLOBALES =====
const totalObjetivo = 8;
let estrellasAtrapadas = 0;
let piezasReveladas = 0;
let finalPuzzleActivado = false;
let puzzleCompletoPendienteFinal = false;
let experienciaIniciada = false;
let timeoutToast = null;
let lluviaCorazonesInterval = null;
let sorpresaFinalIniciada = false;
let puedeActivarSorpresaFinal = false;

const puzzleConfig = [
    { id: 'pieza1', src: 'assets/fotos/foto1.jpeg' },
    { id: 'pieza2', src: 'assets/fotos/foto2.jpeg' },
    { id: 'pieza3', src: 'assets/fotos/foto3.jpeg' },
    { id: 'pieza4', src: 'assets/fotos/foto4.jpeg' },
    { id: 'pieza5', src: 'assets/fotos/foto5.png' },
    { id: 'pieza6', src: 'assets/fotos/foto6.png' },
    { id: 'pieza7', src: 'assets/fotos/foto7.jpeg' }
];

const ordenRevelado = ['pieza1', 'pieza2', 'pieza3', 'pieza4', 'pieza5', 'pieza6', 'pieza7'];

// ===== CAPA DE NEBULOSAS =====
function initGalaxyNebula() {
    let galaxyNebula = document.getElementById('galaxyNebula');

    if (!galaxyNebula) {
        galaxyNebula = document.createElement('div');
        galaxyNebula.id = 'galaxyNebula';
        document.body.insertBefore(galaxyNebula, document.body.firstChild);
    }

    galaxyNebula.innerHTML = '';

    const nebulaColors = [
        'rgba(147, 51, 234, 0.26)',
        'rgba(59, 130, 246, 0.22)',
        'rgba(236, 72, 153, 0.18)',
        'rgba(56, 189, 248, 0.2)'
    ];

    for (let index = 0; index < 6; index++) {
        const cloud = document.createElement('span');
        cloud.className = 'nebula-cloud';

        const size = 220 + Math.random() * 420;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.left = `${Math.random() * 90}%`;
        cloud.style.top = `${Math.random() * 90}%`;
        cloud.style.setProperty('--nebula-color', nebulaColors[Math.floor(Math.random() * nebulaColors.length)]);
        cloud.style.setProperty('--drift-duration', `${24 + Math.random() * 20}s`);
        cloud.style.setProperty('--drift-x', `${(Math.random() * 2 - 1) * 70}px`);
        cloud.style.setProperty('--drift-y', `${(Math.random() * 2 - 1) * 60}px`);

        galaxyNebula.appendChild(cloud);
    }
}

// ===== FONDO DE ESTRELLAS =====
function initBackgroundStars() {
    let starsBackground = document.getElementById('starsBackground');
    if (!starsBackground) {
        starsBackground = document.createElement('div');
        starsBackground.id = 'starsBackground';
        document.body.insertBefore(starsBackground, document.body.firstChild);
    }

    starsBackground.innerHTML = '';

    const areaFactor = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    const starCount = Math.max(130, Math.min(260, areaFactor));

    for (let index = 0; index < starCount; index++) {
        const star = document.createElement('div');
        star.className = 'estrella-fondo';

        const sizeRoll = Math.random();
        if (sizeRoll < 0.25) {
            star.classList.add('star-xs');
        } else if (sizeRoll < 0.6) {
            star.classList.add('star-sm');
        } else if (sizeRoll < 0.9) {
            star.classList.add('star-md');
        } else {
            star.classList.add('star-lg');
        }

        const toneRoll = Math.random();
        if (toneRoll > 0.8) {
            star.classList.add('star-cyan');
        } else if (toneRoll < 0.12) {
            star.classList.add('star-gold');
        }

        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;

        const duration = 2.5 + Math.random() * 5;
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s ease-in-out`;

        if (Math.random() > 0.35) {
            const floatDuration = 7 + Math.random() * 9;
            const floatDelay = Math.random() * 3;
            star.style.animation += `, float ${floatDuration}s infinite ${floatDelay}s ease-in-out`;
        }

        if (Math.random() > 0.6) {
            const driftDuration = 16 + Math.random() * 16;
            star.style.animation += `, driftSlow ${driftDuration}s infinite linear`;
        }

        starsBackground.appendChild(star);
    }
}

function initMagicBackgroundOrnaments() {
    let magicBackground = document.getElementById('magicDustBackground');
    if (!magicBackground) {
        magicBackground = document.createElement('div');
        magicBackground.id = 'magicDustBackground';
        document.body.insertBefore(magicBackground, document.body.firstChild);
    }

    magicBackground.innerHTML = '';

    const orbCount = Math.max(16, Math.floor((window.innerWidth * window.innerHeight) / 52000));
    const sparkleCount = Math.max(24, Math.floor((window.innerWidth * window.innerHeight) / 36000));

    for (let index = 0; index < orbCount; index++) {
        const orb = document.createElement('span');
        orb.className = 'magic-orb';

        const size = 70 + Math.random() * 220;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.setProperty('--orb-hue', `${Math.floor(Math.random() * 360)}deg`);
        orb.style.setProperty('--orb-opacity', `${0.12 + Math.random() * 0.2}`);

        magicBackground.appendChild(orb);

        gsap.to(orb, {
            x: (Math.random() * 2 - 1) * 120,
            y: (Math.random() * 2 - 1) * 95,
            scale: 0.88 + Math.random() * 0.45,
            duration: 14 + Math.random() * 14,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    for (let index = 0; index < sparkleCount; index++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'magic-spark';
        sparkle.textContent = Math.random() > 0.45 ? '✦' : '•';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.fontSize = `${10 + Math.random() * 18}px`;
        sparkle.style.setProperty('--spark-opacity', `${0.25 + Math.random() * 0.55}`);

        magicBackground.appendChild(sparkle);

        gsap.to(sparkle, {
            y: -70 - Math.random() * 130,
            x: (Math.random() * 2 - 1) * 40,
            opacity: 0,
            duration: 5 + Math.random() * 5,
            repeat: -1,
            ease: 'power1.inOut',
            delay: Math.random() * 4,
            yoyo: true
        });
    }
}

// ===== AGREGAR ANIMACIONES CSS DINÁMICAMENTE =====
function addStarAnimationStyles() {
    if (document.getElementById('dynamic-star-animations')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'dynamic-star-animations';
    style.innerHTML = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.85; }
        }

        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
            100% { transform: translateY(0) translateX(0); opacity: 0.2; }
        }

        @keyframes driftSlow {
            0% { transform: translateX(0); }
            50% { transform: translateX(14px); }
            100% { transform: translateX(0); }
        }
    `;

    document.head.appendChild(style);
}

// ===== ROMPECABEZAS MÁGICO (7 FOTOS CON FLIP CARDS) =====
function initPuzzle() {
    puzzleConfig.forEach((item, index) => {
        const pieza = document.getElementById(item.id);
        if (!pieza) {
            return;
        }

        // Limpiar contenido previo
        pieza.innerHTML = '';

        // Crear estructura de flip card
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.backgroundImage = `url('${item.src}')`;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const mensaje = mensajesPorPieza[item.id] || mensajesAntiguos[Math.min(index, mensajesAntiguos.length - 1)] || 'Siempre tendrás un mensaje bonito detrás de cada recuerdo.';
        const textoBack = document.createElement('p');
        textoBack.textContent = mensaje;
        cardBack.appendChild(textoBack);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        pieza.appendChild(cardInner);

        pieza.style.opacity = '0';
        pieza.style.filter = 'blur(10px)';

        if (item.id === 'pieza7') {
            pieza.style.transform = 'translate(-50%, -50%) scale(0.5)';
        } else {
            pieza.style.transform = 'scale(0.5)';
        }
    });
}

function revelarSiguientePieza() {
    if (piezasReveladas >= ordenRevelado.length) {
        return;
    }

    const id = ordenRevelado[piezasReveladas];
    const pieza = document.getElementById(id);
    if (!pieza) {
        return;
    }

    const esCentro = id === 'pieza7';

    gsap.to(pieza, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: esCentro ? 1.18 : 1,
        duration: 1.5,
        ease: 'back.out(1.6)'
    });

    piezasReveladas += 1;

    if (piezasReveladas === ordenRevelado.length) {
        puzzleCompletoPendienteFinal = true;
        puedeActivarSorpresaFinal = false;
    }
}

function lanzarConfettiDorado() {
    if (typeof confetti !== 'function') {
        return;
    }

    confetti({
        particleCount: 180,
        spread: 85,
        startVelocity: 38,
        origin: { y: 0.58 },
        colors: ['#ffd166', '#ffe9a8', '#fff4cc', '#f6c453']
    });
}

function lanzarConfettiApertura() {
    if (typeof confetti !== 'function') {
        return;
    }

    confetti({
        particleCount: 90,
        spread: 65,
        startVelocity: 30,
        origin: { y: 0.62 },
        colors: ['#ffd166', '#ffe9a8', '#ffc9de', '#f6c453']
    });
}

function mostrarPreguntaFinalEstatica() {
    const tarjetaMensajes = document.querySelector('.message-card');
    const seccionFinal = document.getElementById('seccion-final');
    const acciones = document.getElementById('accionesAmor');

    if (tarjetaMensajes) {
        tarjetaMensajes.style.display = 'none';
    }

    if (seccionFinal) {
        seccionFinal.style.display = 'flex';
        gsap.to('#seccion-final', { opacity: 1, duration: 1.5 });
    }

    if (acciones) {
        acciones.style.pointerEvents = 'auto';
        acciones.style.opacity = '1';
    }

    puedeActivarSorpresaFinal = true;
}

function finalDeSanValentin() {
    if (finalPuzzleActivado) {
        return;
    }

    finalPuzzleActivado = true;
    const puzzleInner = document.getElementById('puzzleInner');

    if (!puzzleInner) {
        return;
    }

    gsap.delayedCall(2.5, () => {
        lanzarConfettiApertura();
        const puzzleContainer = document.getElementById('puzzleContainer');

        if (puzzleContainer) {
            gsap.to(puzzleContainer, {
                scale: 1.05,
                duration: 1.2,
                repeat: 1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        gsap.to(puzzleInner, {
            rotateY: 180,
            duration: 2.8,
            ease: 'power2.inOut',
            onComplete: () => {
                // Congelación absoluta - Detener TODO
                gsap.killTweensOf(puzzleInner, true);
                gsap.killTweensOf(puzzleContainer, true);
                gsap.killTweensOf('#puzzleContainer', true);
                gsap.killTweensOf('#puzzleInner', true);
                
                // Aplicar clase de bloqueo PRIMERO
                puzzleInner.classList.add('mensaje-bloqueado');
                
                // Luego establecer estilos inline como respaldo
                puzzleInner.style.transform = 'rotateY(180deg)';
                puzzleInner.style.pointerEvents = 'none';
                puzzleInner.style.willChange = 'auto';
                
                // Bloquear el contenedor
                if (puzzleContainer) {
                    puzzleContainer.classList.add('puzzle-congelado');
                    puzzleContainer.style.pointerEvents = 'none';
                    puzzleContainer.style.animation = 'none';
                }

                // Lanzar confetti
                lanzarConfettiDorado();
                
                // Después del confetti, mostrar pregunta (con pequeño delaypara que el confetti termine)
                gsap.delayedCall(0.6, () => {
                    // Re-asegurar bloqueo antes de mostrar
                    puzzleInner.classList.add('mensaje-bloqueado');
                    puzzleInner.style.transform = 'rotateY(180deg)';
                    
                    // Activar monitoreo para prevenir auto-giros
                    protegerPuzzleCongelado();
                    
                    // Mostrar pista final
                    mostrarPreguntaFinalEstatica();
                });
            }
        });
    });
}

// Función para monitorear y prevenir cambios no autorizados en el puzzle
function protegerPuzzleCongelado() {
    const puzzleInner = document.getElementById('puzzleInner');
    if (!puzzleInner || !puzzleInner.classList.contains('mensaje-bloqueado')) {
        return;
    }

    // Usar MutationObserver para detectar cambios de estilo
    const observer =  new MutationObserver(() => {
        if (puzzleInner.classList.contains('mensaje-bloqueado')) {
            // Si tiene la clase bloqueada, asegurar que el transform está fijo
            if (!puzzleInner.style.transform.includes('rotateY(180deg)')) {
                puzzleInner.style.transform = 'rotateY(180deg)';
            }
        }
    });

    observer.observe(puzzleInner, {
        attributes: true,
        attributeFilter: ['style']
    });

    // Re-proteger después de 8s (cuando debería estar completamente mostrada la pregunta)
    setTimeout(() => {
        observer.disconnect();
    }, 8000);
}

function mostrarToastAmor(mensaje) {
    const toast = document.getElementById('toastAmor');
    if (!toast) {
        return;
    }

    toast.textContent = mensaje;
    toast.classList.add('mostrar');

    if (timeoutToast) {
        clearTimeout(timeoutToast);
    }

    timeoutToast = setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 2200);
}

function iniciarLluviaDeCorazones() {
    if (lluviaCorazonesInterval) {
        return;
    }

    const corazones = ['💗', '💖'];

    const crearCorazon = () => {
        const corazon = document.createElement('div');
        corazon.className = 'corazon-lluvia';
        corazon.textContent = corazones[Math.floor(Math.random() * corazones.length)];

        const size = 18 + Math.random() * 26;
        const duracion = 4.5 + Math.random() * 3.8;
        const drift = (Math.random() * 120) - 60;

        corazon.style.left = `${Math.random() * 100}vw`;
        corazon.style.fontSize = `${size}px`;
        corazon.style.setProperty('--duracion-caida', `${duracion}s`);
        corazon.style.setProperty('--deriva-corazon', `${drift}px`);
        corazon.style.setProperty('--escala-corazon', `${0.8 + Math.random() * 0.7}`);

        document.body.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, (duracion + 0.6) * 1000);
    };

    for (let index = 0; index < 28; index++) {
        setTimeout(crearCorazon, index * 80);
    }

    lluviaCorazonesInterval = setInterval(crearCorazon, 120);
}

function mostrarSpotifyCentral() {
    let spotifyCode = document.getElementById('spotifyCodeFinal');

    if (!spotifyCode) {
        spotifyCode = document.createElement('img');
        spotifyCode.id = 'spotifyCodeFinal';
        spotifyCode.className = 'spotify-code-final';
        spotifyCode.src = 'assets/fotos/spotify-code.jpeg';
        spotifyCode.alt = 'Código de Spotify';
        spotifyCode.onerror = () => {
            if (spotifyCode.src.includes('spotify-code.jpeg')) {
                spotifyCode.src = 'assets/fotos/spotify-code.jpg';
            }
        };
        document.body.appendChild(spotifyCode);
    } else if (!spotifyCode.src.includes('spotify-code.jpeg') && !spotifyCode.src.includes('spotify-code.jpg')) {
        spotifyCode.src = 'assets/fotos/spotify-code.jpeg';
    }

    gsap.fromTo(spotifyCode,
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
    );

    return spotifyCode;
}

function moverPiezasAlrededorDeSpotify(spotifyCode) {
    const piezas = ordenRevelado
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (!piezas.length) {
        return;
    }

    const posicionesIniciales = piezas.map((pieza) => {
        const rect = pieza.getBoundingClientRect();
        return {
            pieza,
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top
        };
    });

    const escalaFotosFinal = 0.95;

    posicionesIniciales.forEach(({ pieza, width, height, left, top }) => {
        // Aseguramos un tamaño máximo para pantallas pequeñas
        const maxSize = Math.min(window.innerWidth * 0.25, 180);
        const ratio = width / height;
        
        // Recalcular dimensiones base si son muy grandes
        let baseWidth = width;
        let baseHeight = height;
        
        if (baseWidth * escalaFotosFinal > maxSize) {
             baseWidth = maxSize / escalaFotosFinal;
             baseHeight = baseWidth / ratio;
        }

        const widthFinal = baseWidth * escalaFotosFinal;
        const heightFinal = baseHeight * escalaFotosFinal;
        const offsetX = (widthFinal - width) / 2;
        const offsetY = (heightFinal - height) / 2;

        pieza.classList.add('pieza-orbita-final');
        
        // Mover pieza al body para evitar problemas de apilamiento y transformaciones del padre
        if (pieza.parentNode !== document.body) {
            document.body.appendChild(pieza);
        }

        pieza.style.position = 'fixed';
        pieza.style.left = `${left - offsetX}px`;
        pieza.style.top = `${top - offsetY}px`;
        pieza.style.width = `${widthFinal}px`;
        pieza.style.height = `${heightFinal}px`;
        pieza.style.margin = '0';
        pieza.style.transform = 'none';
        pieza.style.opacity = '1';
        pieza.style.filter = 'blur(0px)';
        pieza.style.zIndex = '1250';
        pieza.style.pointerEvents = 'auto'; // Asegurar interactividad para el flip
    });

    const codeRect = spotifyCode.getBoundingClientRect();
    const centroX = window.innerWidth / 2; // Usar el centro de la ventana para mejor centrado
    const centroY = window.innerHeight / 2;
    
    // Radios reducidos para asegurar que entren en pantalla evitando bordes
    const marginSafety = 100; // Margen de seguridad pixelados
    const radioX = Math.min(window.innerWidth * 0.28, (window.innerWidth / 2) - marginSafety);
    const radioY = Math.min(window.innerHeight * 0.22, (window.innerHeight / 2) - marginSafety);

    posicionesIniciales.forEach(({ pieza }, index) => {
        // Recalculamos widthFinal/heightFinal aquí para el posicionamiento correcto
        const rect = pieza.getBoundingClientRect();
        const widthFinal = rect.width;
        const heightFinal = rect.height;
        const angulo = ((index / posicionesIniciales.length) * Math.PI * 2) - (Math.PI / 2);
        
        // Calcular posición ideal
        let destinoX = centroX + (Math.cos(angulo) * radioX) - (widthFinal / 2);
        let destinoY = centroY + (Math.sin(angulo) * radioY) - (heightFinal / 2);

        // Clamping para asegurar que NUNCA se salga del viewport
        destinoX = Math.max(10, Math.min(window.innerWidth - widthFinal - 10, destinoX));
        destinoY = Math.max(10, Math.min(window.innerHeight - heightFinal - 10, destinoY));

        gsap.to(pieza, {
            left: destinoX,
            top: destinoY,
            width: widthFinal,
            height: heightFinal,
            rotation: gsap.utils.random(-8, 8),
            duration: 1.9,
            ease: 'power3.inOut'
        });

        gsap.to(pieza, {
            y: gsap.utils.random(-14, -6),
            duration: gsap.utils.random(2.4, 3.8),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.2 + (index * 0.08)
        });
    });
}

function activarGranSorpresaFinal() {
    if (sorpresaFinalIniciada) {
        return;
    }

    sorpresaFinalIniciada = true;
    document.body.classList.add('permitir-flip-final');

    const mensajeGuia = document.querySelector('.mensaje-guia');
    if (mensajeGuia) {
        mensajeGuia.textContent = 'Gira las fotos mi amor y después escanea el código ✨';
    }

    const seccionFinal = document.getElementById('seccion-final');
    const mensajeFinal = document.getElementById('mensajeFinalPuzzle');
    const acciones = document.getElementById('accionesAmor');
    const puzzleContainer = document.getElementById('puzzleContainer');
    const puzzleInner = document.getElementById('puzzleInner');

    if (mensajeFinal) {
        mensajeFinal.style.display = 'none';
    }

    if (acciones) {
        acciones.style.display = 'none';
    }

    if (seccionFinal) {
        seccionFinal.style.pointerEvents = 'none';
    }

    if (puzzleInner) {
        // DESBLOQUEO TOTAL: Limpiar todas las restricciones
        puzzleInner.classList.remove('mensaje-bloqueado');
        puzzleInner.style.transform = '';
        puzzleInner.style.pointerEvents = '';
        gsap.killTweensOf(puzzleInner, true);
        gsap.set(puzzleInner, { clearProps: 'all' });
        
        gsap.to(puzzleInner, {
            rotateY: 0,
            duration: 1.15,
            ease: 'power2.out'
        });
    }

    if (puzzleContainer) {
        puzzleContainer.classList.remove('puzzle-congelado');
        puzzleContainer.style.pointerEvents = '';
        puzzleContainer.style.opacity = '1';
        puzzleContainer.style.animation = 'none';
        gsap.killTweensOf(puzzleContainer, true);
        gsap.to(puzzleContainer, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }

    const spotifyCode = mostrarSpotifyCentral();

    setTimeout(() => {
        moverPiezasAlrededorDeSpotify(spotifyCode);
    }, 120);

    iniciarLluviaDeCorazones();
    lanzarConfettiApertura();
    lanzarConfettiDorado();
}

function moverBotonNo() {
    const btnNo = document.getElementById('btn-no');
    if (!btnNo) {
        return;
    }

    const ancho = btnNo.offsetWidth || 130;
    const alto = btnNo.offsetHeight || 52;
    const margen = 20;
    const maxX = Math.max(margen, window.innerWidth - ancho - margen);
    const maxY = Math.max(margen, window.innerHeight - alto - margen);

    const left = Math.floor(Math.random() * (maxX - margen + 1)) + margen;
    const top = Math.floor(Math.random() * (maxY - margen + 1)) + margen;

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${left}px`;
    btnNo.style.top = `${top}px`;
    btnNo.style.zIndex = '9997';
}

function initBotonesAmor() {
    const btnSi = document.getElementById('btn-si');
    const btnNo = document.getElementById('btn-no');
    const mensajeFinal = document.getElementById('mensajeFinalPuzzle');
    const acciones = document.getElementById('accionesAmor');

    if (!btnSi || !btnNo || !mensajeFinal || !acciones) {
        return;
    }

    const mensajesBroma = [
        'Amor, lea bien',
        'El botón está muy cerca del sí, entiendo el error 😌',
        'Todos cometen errores de la emoción😌'
    ];

    const escaparNo = (event) => {
        if (event) {
            event.preventDefault();
        }
        moverBotonNo();
    };

    btnNo.addEventListener('mouseover', escaparNo);
    btnNo.addEventListener('touchstart', escaparNo, { passive: false });

    btnNo.addEventListener('click', (event) => {
        event.preventDefault();
        btnNo.style.transform = 'scale(0.8)';
        btnSi.style.transform = 'scale(1.2)';
        const mensaje = mensajesBroma[Math.floor(Math.random() * mensajesBroma.length)];
        mostrarToastAmor(mensaje);

        setTimeout(() => {
            btnNo.style.transform = 'scale(1)';
        }, 350);

        moverBotonNo();
    });

    btnSi.addEventListener('click', () => {
        if (!puedeActivarSorpresaFinal) {
            mostrarToastAmor('Espera un poquito amor, lee el mensaje primero ✨');
            return;
        }

        activarGranSorpresaFinal();
    });
}

function iniciarExperienciaPrincipal() {
    if (experienciaIniciada) {
        return;
    }

    experienciaIniciada = true;
    addStarAnimationStyles();
    initGalaxyNebula();
    initBackgroundStars();
    initMagicBackgroundOrnaments();
    initPuzzle();
    initBotonesAmor();
    actualizarContador();
    iniciarLluviaDeEstrellas();

    window.addEventListener('resize', () => {
        initBackgroundStars();
        initGalaxyNebula();
        initMagicBackgroundOrnaments();
    });
}

function limpiarFecha(valor) {
    return valor.replace(/[^0-9]/g, '');
}

function initPantallaBienvenida() {
    const pantalla = document.getElementById('pantalla-bienvenida');
    const card = document.getElementById('bienvenidaCard');
    const input = document.getElementById('input-fecha');
    const boton = document.getElementById('btn-desbloquear');
    const error = document.getElementById('mensaje-error');

    if (!pantalla || !card || !input || !boton || !error) {
        iniciarExperienciaPrincipal();
        return;
    }


    const validarIngreso = () => {
        const fechaNormalizada = limpiarFecha(input.value.trim());
        const correcta = fechaNormalizada === '26082025';

        if (correcta) {
            error.textContent = '';
            
            // ===== INICIO DE MÚSICA DE FONDO =====
            const audioMusica = document.getElementById('musica-fondo');
            if (audioMusica) {
                audioMusica.volume = 0.4;
                audioMusica.play().catch(e => console.log('Autoplay bloqueado', e));
                
                // Mostrar botón de música
                const btnMusica = document.getElementById('btn-musica');
                if (btnMusica) {
                    btnMusica.style.display = 'flex';
                }
            }
            
            gsap.to('#pantalla-bienvenida', {
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    pantalla.style.display = 'none';
                    iniciarExperienciaPrincipal();
                }
            });
            return;
        }

        error.textContent = 'Esa no es la fecha piroba. Intente de nuevo.🖕​';
        gsap.fromTo(card,
            { x: -10 },
            {
                x: 10,
                duration: 0.07,
                repeat: 5,
                yoyo: true,
                ease: 'power1.inOut',
                onComplete: () => gsap.set(card, { x: 0 })
            }
        );
    };

    boton.addEventListener('click', validarIngreso);

    // Inicializar lógica de botón de música
    const btnMusica = document.getElementById('btn-musica');
    const audioMusica = document.getElementById('musica-fondo');
    
    if (btnMusica && audioMusica) {
        btnMusica.addEventListener('click', () => {
            if (audioMusica.paused) {
                audioMusica.play();
                btnMusica.textContent = '🔊';
                btnMusica.style.opacity = '1';
                btnMusica.title = 'Pausar';
            } else {
                audioMusica.pause();
                btnMusica.textContent = '🔇';
                btnMusica.style.opacity = '0.7';
                btnMusica.title = 'Reproducir';
            }
        });
    }

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validarIngreso();
        }
    });
}

// ===== ACTUALIZAR CONTADOR =====
function actualizarContador() {
    const contadorPrincipal = document.getElementById('contador');
    const contadorVisual = document.getElementById('starsCount');
    const totalVisual = document.getElementById('starTotal');

    if (contadorPrincipal) {
        contadorPrincipal.textContent = estrellasAtrapadas;
    }
    if (contadorVisual) {
        contadorVisual.textContent = Math.min(estrellasAtrapadas, totalObjetivo);
    }
    if (totalVisual) {
        totalVisual.textContent = String(totalObjetivo);
    }
}

// ===== CAMBIAR MENSAJE CON TRANSICIÓN =====
function cambiarMensajeAleatorio() {
    const messageText = document.getElementById('messageText');
    if (!messageText) {
        return;
    }

    messageText.style.transition = 'opacity 0.45s ease-in-out, transform 0.45s ease-in-out';
    messageText.style.opacity = '0';
    messageText.style.transform = 'translateY(8px)';

    setTimeout(() => {
        const indiceRecuerdo = Math.max(0, Math.min(estrellasAtrapadas - 1, recuerdos.length - 1));
        const nuevoRecuerdo = recuerdos[indiceRecuerdo];
        messageText.textContent = `"${nuevoRecuerdo}"`;
        messageText.style.opacity = '1';
        messageText.style.transform = 'translateY(0)';
    }, 220);
}

// ===== GENERADOR DE ESTRELLAS (MECÁNICA PRINCIPAL) =====
function crearEstrella() {
    const estrella = document.createElement('div');
    estrella.className = 'estrella-fugaz';

    const size = 30.192 + Math.random() * 12.3552;
    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;

    const inicioX = Math.random() * (window.innerWidth - 60);
    estrella.style.left = `${inicioX}px`;
    estrella.style.top = '-50px';

    const enFrente = Math.random() > 0.5;
    estrella.style.zIndex = enFrente ? '35' : '8';

    document.body.appendChild(estrella);

    const desplazamientoX = (Math.random() * 320) - 160;
    const destinoY = window.innerHeight + 80;
    const duracion = 5.5 + Math.random() * 3.3;

    const tween = gsap.to(estrella, {
        x: desplazamientoX,
        y: destinoY,
        rotation: Math.random() * 18 - 9,
        ease: 'none',
        duration: duracion,
        onComplete: () => {
            estrella.remove();
        }
    });

    estrella.addEventListener('click', () => {
        if (finalPuzzleActivado) {
            tween.kill();
            gsap.to(estrella, {
                scale: 1.6,
                opacity: 0,
                duration: 0.25,
                ease: 'power2.out',
                onComplete: () => estrella.remove()
            });
            return;
        }

        if (puzzleCompletoPendienteFinal) {
            estrellasAtrapadas += 1;
            actualizarContador();
            cambiarMensajeAleatorio();
            puzzleCompletoPendienteFinal = false;
            finalDeSanValentin();

            tween.kill();
            gsap.to(estrella, {
                scale: 2.4,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.out',
                onComplete: () => estrella.remove()
            });
            return;
        }

        if (estrellasAtrapadas >= totalObjetivo) {
            tween.kill();
            gsap.to(estrella, {
                scale: 1.6,
                opacity: 0,
                duration: 0.25,
                ease: 'power2.out',
                onComplete: () => estrella.remove()
            });
            return;
        }

        estrellasAtrapadas += 1;
        actualizarContador();
        cambiarMensajeAleatorio();
        revelarSiguientePieza();

        tween.kill();
        gsap.to(estrella, {
            scale: 2.4,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => estrella.remove()
        });
    }, { once: true });
}

function iniciarLluviaDeEstrellas() {
    setInterval(() => {
        crearEstrella();
    }, 2800);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initPantallaBienvenida();
});
