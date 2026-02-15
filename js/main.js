// ============================================
// REGALO DIGITAL: LOFI NOCTURNO MÁGICO Y 3D
// main.js - Mecánica principal "Atrapar Estrellas"
// ============================================

console.log('✨ Bienvenida, piroba ✨');

// ===== ARRAY DE MENSAJES ESPECIALES =====
const mensajes = [
    'hola piroba',
    'Tienes una forma de ser que me encanta y una personalidad muy noble, no cambies eso.',
    'Tienes la mejor sonrisa del mundo; cada vez que te veo sonreír, me enamoro más.',
    'Mi vida, tienes el cabello más hermoso que existe y no me cansare de decirlo.',
    'Eres demasiado inteligente y creativa. Créetelo más, porque eres capaz de mucho más de lo que piensas.',
    'Perdón por querer pelear tanto a veces, ya sabes cómo soy.',
    'Prepárese, porque la voy a seguir estresando por mucho tiempo más, ya que soy su "pedacito de estrés".',
    'Aunque a veces sea frío o te diga "piroba", sabes que te quiero mucho y que todo es molestando.',
    'La verdad es que estás muy linda y solo quiero compartir mucho más tiempo contigo.',
    'Gracias por existir y por hacer tan bonito todo cuando estás tú, espero verte pronto.'
];

// ===== VARIABLES GLOBALES =====
const totalObjetivo = 6;
let estrellasAtrapadas = 0;
let currentVideoIndex = 1;
let piezasReveladas = 0;
let finalPuzzleActivado = false;
let experienciaIniciada = false;
let timeoutToast = null;

const puzzleConfig = [
    { id: 'pieza1', src: 'assets/fotos/foto1.jpeg' },
    { id: 'pieza2', src: 'assets/fotos/foto2.jpeg' },
    { id: 'pieza3', src: 'assets/fotos/foto3.jpeg' },
    { id: 'pieza4', src: 'assets/fotos/foto4.png' },
    { id: 'pieza5', src: 'assets/fotos/foto5.png' },
    { id: 'pieza6', src: 'assets/fotos/foto6.jpeg' }
];

const ordenRevelado = ['pieza1', 'pieza2', 'pieza3', 'pieza4', 'pieza5', 'pieza6'];

// ===== SISTEMA DE CROSSFADE PARA VIDEO EN BUCLE INFINITO =====
function initVideoCrossfade() {
    const video1 = document.getElementById('backgroundVideo1');
    const video2 = document.getElementById('backgroundVideo2');

    if (!video1 || !video2) {
        console.warn('⚠️ Los elementos de video no encontrados. Verifica los IDs.');
        return;
    }

    const handleVideoEnd = (activeVideo, nextVideo, videoNum) => {
        return function () {
            nextVideo.currentTime = 0;
            nextVideo.play().catch(() => {});

            setTimeout(() => {
                activeVideo.style.opacity = '0';
                nextVideo.style.opacity = '1';
                activeVideo.pause();
                currentVideoIndex = videoNum === 1 ? 2 : 1;
            }, 500);
        };
    };

    video1.addEventListener('ended', handleVideoEnd(video1, video2, 1));
    video2.addEventListener('ended', handleVideoEnd(video2, video1, 2));

    video1.play().catch(() => {
        console.warn('⚠️ Autoplay bloqueado. Se activará tras interacción del usuario.');
    });
}

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

// ===== ROMPECABEZAS MÁGICO (6 FOTOS) =====
function initPuzzle() {
    puzzleConfig.forEach((item) => {
        const pieza = document.getElementById(item.id);
        if (!pieza) {
            return;
        }

        pieza.innerHTML = `
            <img class="pieza-bg" src="${item.src}" alt="" loading="eager" decoding="sync">
            <img class="pieza-img" src="${item.src}" alt="${item.id}" loading="eager" decoding="sync">
        `;
        pieza.style.opacity = '0';
        pieza.style.filter = 'blur(10px)';

        if (item.id === 'pieza6') {
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

    const esCentro = id === 'pieza6';

    gsap.to(pieza, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: esCentro ? 1.18 : 1,
        duration: 1.5,
        ease: 'back.out(1.6)'
    });

    piezasReveladas += 1;

    if (piezasReveladas === 6) {
        setTimeout(() => {
            const tarjetaMensajes = document.querySelector('.message-card');
            const seccionFinal = document.getElementById('seccion-final');

            if (tarjetaMensajes) {
                tarjetaMensajes.style.display = 'none';
            }

            if (seccionFinal) {
                seccionFinal.style.display = 'flex';
                gsap.to('#seccion-final', { opacity: 1, duration: 1.5 });
            }
        }, 1000);

        finalDeSanValentin();
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

function finalDeSanValentin() {
    if (finalPuzzleActivado) {
        return;
    }

    finalPuzzleActivado = true;
    const puzzleInner = document.getElementById('puzzleInner');

    if (!puzzleInner) {
        return;
    }

    gsap.delayedCall(2, () => {
        lanzarConfettiApertura();
        gsap.to(puzzleInner, {
            rotateY: 180,
            duration: 1.7,
            ease: 'back.inOut(1.7)',
            onComplete: lanzarConfettiDorado
        });
    });
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
        acciones.style.display = 'none';
        mensajeFinal.textContent = '¡Sabía que ibas a decir que sí! Te amo y perdona ser tan lento y enviarte esto tan tarde, sabes que siempre lo mejor va a lo último y por eso siempre llego tarde. ❤️';
        lanzarConfettiApertura();
        lanzarConfettiDorado();
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
    initPuzzle();
    initBotonesAmor();
    actualizarContador();
    iniciarLluviaDeEstrellas();

    window.addEventListener('resize', () => {
        initBackgroundStars();
        initGalaxyNebula();
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

        error.textContent = 'Esa no es la fecha piroba. Intente de nuevo. 🙄❤️';
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
        const nuevoMensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
        messageText.textContent = `"${nuevoMensaje}"`;
        messageText.style.opacity = '1';
        messageText.style.transform = 'translateY(0)';
    }, 220);
}

// ===== GENERADOR DE ESTRELLAS (MECÁNICA PRINCIPAL) =====
function crearEstrella() {
    const estrella = document.createElement('div');
    estrella.className = 'estrella-fugaz';

    const size = 20.16 + Math.random() * 10.296;
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
