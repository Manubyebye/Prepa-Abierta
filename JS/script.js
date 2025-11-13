document.addEventListener('DOMContentLoaded', function () {
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let autoSlideInterval;

    // Crear los puntos indicadores
    sliderImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const sliderDots = document.querySelectorAll('.slider-dot');

    function showSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index >= sliderImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = sliderImages.length - 1;
        } else {
            currentIndex = index;
        }

        // Ocultar todas las imágenes y desactivar todos los puntos
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        // Mostrar la imagen actual y activar el punto correspondiente
        sliderImages[currentIndex].classList.add('active');
        sliderDots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para los botones de navegación
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    // Iniciar el carrusel y el auto-slide
    showSlide(currentIndex);
    startAutoSlide();

    // Detener el auto-slide al interactuar con el mouse (opcional)
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
});

// Animación para requisitos al hacer scroll
function initRequisitosAnimation() {
    const requisitosItems = document.querySelectorAll('.requisito-item');
    
    // Crear observer para detectar cuando los elementos son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que llegue al viewport
    });

    // Observar cada item de requisitos
    requisitosItems.forEach(item => {
        observer.observe(item);
    });
}

// Llamar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initRequisitosAnimation();
});

// Animación para la sección Plan de Estudios
function initPlanEstudiosAnimation() {
    const featureItems = document.querySelectorAll('.feature-item');
    const planImage = document.querySelector('.image-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('feature-item')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target === planImage) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    featureItems.forEach(item => {
        observer.observe(item);
    });
    
    if (planImage) {
        observer.observe(planImage);
    }
}

// Llamar la función en DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initRequisitosAnimation();
    initPlanEstudiosAnimation(); // ← Agregar esta línea
});