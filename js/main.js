document.addEventListener('DOMContentLoaded', function() {
    // Configuración del slider
    const slides = document.querySelectorAll('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval;
    const totalSlides = slides.length;
    const slideDuration = 5000; // 5 segundos por slide

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Asegurarse de que el índice esté dentro del rango
        index = (index + totalSlides) % totalSlides;
        
        // Ocultar todos los slides y mostrar solo el actual
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.classList.toggle('active', i === index);
        });
        
        // Actualizar los indicadores de puntos
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        showSlide(currentIndex + 1);
        resetSlideTimer();
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        showSlide(currentIndex - 1);
        resetSlideTimer();
    }

    // Reiniciar el temporizador del auto-play
    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Inicializar el slider
    function initSlider() {
        // Mostrar el primer slide
        showSlide(0);
        
        // Configurar el auto-play
        slideInterval = setInterval(nextSlide, slideDuration);
        
        // Eventos para los botones de navegación
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Eventos para los puntos indicadores
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideTimer();
            });
        });
        
        // Pausar el auto-play cuando el mouse está sobre el slider
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => resetSlideTimer());
        }
    }

    // Iniciar el slider
    initSlider();
});