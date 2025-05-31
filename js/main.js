 // galeria 
        let currentIndex = 0;

function moveSlide(direction) {
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const total = items.length;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = total - 1;
  if (currentIndex >= total) currentIndex = 0;

  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
        // Toggle para modo oscuro/claro
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Verificar preferencia del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Cargar tema guardado o usar preferencia del sistema
        if (localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Alternar tema
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });

        // Slider functionality
        document.addEventListener('DOMContentLoaded', function () {
            const slides = document.querySelectorAll('.slides');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const dots = document.querySelectorAll('.dot');
            let currentIndex = 0;
            let slideInterval;
            const totalSlides = slides.length;
            const slideDuration = 5000; // 5 segundos

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                currentIndex = index;
            }

            function nextSlide() {
                showSlide((currentIndex + 1) % totalSlides);
                resetSlideTimer();
            }

            function prevSlide() {
                showSlide((currentIndex - 1 + totalSlides) % totalSlides);
                resetSlideTimer();
            }

            function resetSlideTimer() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, slideDuration);
            }

            // Initialize slider
            if (slides.length > 0) { // Asegurarse que hay slides antes de inicializar
                showSlide(0);
                slideInterval = setInterval(nextSlide, slideDuration);
            }


            // Event listeners
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetSlideTimer();
                });
            });

            // Pause on hover
            const slider = document.querySelector('.slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
                slider.addEventListener('mouseleave', () => resetSlideTimer());
            }
        });
