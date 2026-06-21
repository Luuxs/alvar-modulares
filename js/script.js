document.addEventListener("DOMContentLoaded", function () {
    
    /* ==========================================================================
       1. MOTOR DE ANIMACIÓN POR SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const scrollElements = document.querySelectorAll(".fade-in, .fade-in-reveal");

    const observerOptions = {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% del contenedor asoma en pantalla
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inyecta la clase .visible para activar la animación de CSS
                entry.target.classList.add("visible");
                // Deja de observar el elemento para liberar memoria y optimizar el rendimiento
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });

    /* ==========================================================================
       2. MOTOR DE APERTURA DEL MENÚ HAMBURGUESA (RESPONSIVE)
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Forzamos a que inicien cerrados limpiamente al cargar el sitio
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');

        menuToggle.addEventListener('click', function (e) {
            e.preventDefault(); // Previene comportamientos erráticos en navegadores móviles
            
            // Alterna la clase 'open' para activar los estilos CSS correspondientes
            this.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }
});
// ==========================================================================
// SISTEMA PREMIUM DE VISUALIZACIÓN EN ALTA CALIDAD (LIGHTBOX)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.getElementById("closeModal");
    const zoomButtons = document.querySelectorAll(".btn-zoom");

    if (modal && zoomButtons.length > 0) {
        // Al hacer clic en el cuadrito, abre el modal y carga la foto real
        zoomButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const fullSrc = btn.getAttribute("data-full");
                modalImg.src = fullSrc;
                modal.style.display = "flex";
                setTimeout(() => {
                    modal.style.opacity = "1";
                    modalImg.style.transform = "scale(1)";
                }, 10);
            });
        });

        // Función para cerrar de forma animada
        const closeModalWindow = () => {
            modal.style.opacity = "0";
            modalImg.style.transform = "scale(0.95)";
            setTimeout(() => {
                modal.style.display = "none";
                modalImg.src = "";
            }, 300);
        };

        // Cerrar con el botón X
        closeBtn.addEventListener("click", closeModalWindow);

        // Cerrar al hacer clic en el fondo oscuro
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModalWindow();
            }
        });
    }
});