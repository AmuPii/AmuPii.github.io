document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (!slider) return; // Se não achar o slider, para o script (evita erros)

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active'); // Muda o cursor no CSS
        
        // Pega a posição inicial
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Se não estiver segurando o clique, não faz nada
        e.preventDefault(); // IMPEDE que o navegador selecione texto
        
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Velocidade do scroll (aumente o 2 se quiser mais rápido)
        slider.scrollLeft = scrollLeft - walk;
    });
    // --- THEME TOGGLE (dark / light) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
            if (themeToggle) { themeToggle.setAttribute('aria-pressed', 'true'); themeToggle.title = 'Ativar modo escuro'; }
        } else {
            document.body.classList.remove('light-mode');
            if (themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
            if (themeToggle) { themeToggle.setAttribute('aria-pressed', 'false'); themeToggle.title = 'Ativar modo claro'; }
        }
    }

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

});