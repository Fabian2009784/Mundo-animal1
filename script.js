
const botonInicio = document.createElement("button");

botonInicio.textContent = "↑ Volver arriba";
botonInicio.className = "volver-arriba";
botonInicio.setAttribute("aria-label", "Volver al inicio de la página");

document.body.appendChild(botonInicio);

botonInicio.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    botonInicio.classList.toggle("visible", window.scrollY > 300);
});

const visor = document.getElementById("visorFotos");
const fotoAmpliada = document.getElementById("fotoAmpliada");
const descripcionFoto = document.getElementById("descripcionFoto");
const cerrarVisor = document.getElementById("cerrarVisor");
const fotoAnterior = document.getElementById("fotoAnterior");
const fotoSiguiente = document.getElementById("fotoSiguiente");

const fotos = Array.from(
    document.querySelectorAll(
        ".galeria-grid img, .razas-grid img, .tarjeta img"
    )
);

let indiceActual = 0;

function mostrarFoto(indice) {
    indiceActual = (indice + fotos.length) % fotos.length;

    const foto = fotos[indiceActual];

    fotoAmpliada.src = foto.src;
    fotoAmpliada.alt = foto.alt;
    descripcionFoto.textContent =
        `${foto.alt} (${indiceActual + 1} de ${fotos.length})`;
}

function abrirVisor(indice) {
    mostrarFoto(indice);
    visor.classList.add("activo");
    visor.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    cerrarVisor.focus();
}

function cerrarVentana() {
    visor.classList.remove("activo");
    visor.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

fotos.forEach((foto, indice) => {
    foto.addEventListener("click", () => abrirVisor(indice));
});

cerrarVisor.addEventListener("click", cerrarVentana);

fotoAnterior.addEventListener("click", () => {
    mostrarFoto(indiceActual - 1);
});

fotoSiguiente.addEventListener("click", () => {
    mostrarFoto(indiceActual + 1);
});

visor.addEventListener("click", (evento) => {
    if (evento.target === visor) {
        cerrarVentana();
    }
});

document.addEventListener("keydown", (evento) => {
    if (!visor.classList.contains("activo")) return;

    if (evento.key === "Escape") cerrarVentana();
    if (evento.key === "ArrowRight") {
        mostrarFoto(indiceActual + 1);
    }
    if (evento.key === "ArrowLeft") {
        mostrarFoto(indiceActual - 1);
    }
});

/* CONTROLES DEL CARRUSEL */

const carrusel = document.querySelector(
    ".galeria-carrusel .galeria-grid"
);

const anterior = document.getElementById("galeriaAnterior");
const siguiente = document.getElementById("galeriaSiguiente");

if (carrusel && anterior && siguiente) {
    anterior.addEventListener("click", () => {
        carrusel.scrollBy({
            left: -carrusel.clientWidth,
            behavior: "smooth"
        });
    });

    siguiente.addEventListener("click", () => {
        carrusel.scrollBy({
            left: carrusel.clientWidth,
            behavior: "smooth"
        });
    });
}


/* FUNCIONAMIENTO DEL CARRUSEL */
document.querySelectorAll(".carrusel").forEach((carrusel) => {
    const slides = carrusel.querySelectorAll(".carrusel-slide");
    const anterior = carrusel.querySelector(".anterior");
    const siguiente = carrusel.querySelector(".siguiente");
    const contenedorPuntos = carrusel.querySelector(".carrusel-puntos");

    if (!slides.length || !anterior || !siguiente || !contenedorPuntos) {
        return;
    }

    let indice = 0;
    let temporizador;

    slides.forEach((slide, i) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "carrusel-punto";
        punto.setAttribute("aria-label", `Mostrar imagen ${i + 1}`);

        punto.addEventListener("click", () => mostrar(i));
        contenedorPuntos.appendChild(punto);
    });

    const puntos = contenedorPuntos.querySelectorAll(".carrusel-punto");

    function mostrar(nuevoIndice) {
        indice = (nuevoIndice + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("activo", i === indice);
        });

        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === indice);
            punto.setAttribute("aria-current", i === indice ? "true" : "false");
        });

        reiniciarTemporizador();
    }

    function reiniciarTemporizador() {
        clearInterval(temporizador);
        temporizador = setInterval(() => mostrar(indice + 1), 4000);
    }

    anterior.addEventListener("click", () => mostrar(indice - 1));
    siguiente.addEventListener("click", () => mostrar(indice + 1));

    mostrar(0);
});

/* ABRIR IMÁGENES DEL CARRUSEL EN EL VISOR */
document.querySelectorAll(".carrusel-slide img").forEach((imagen) => {
    imagen.style.cursor = "zoom-in";

    imagen.addEventListener("click", () => {
        const visor = document.getElementById("visorFotos");
        const fotoAmpliada = document.getElementById("fotoAmpliada");
        const descripcion = document.getElementById("descripcionFoto");

        if (!visor || !fotoAmpliada) return;

        fotoAmpliada.src = imagen.src;
        fotoAmpliada.alt = imagen.alt;

        if (descripcion) {
            descripcion.textContent = imagen.alt;
        }

        visor.classList.add("activo");
        visor.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

        visor.setAttribute("aria-hidden", "false");
    });
});
