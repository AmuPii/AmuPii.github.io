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
});