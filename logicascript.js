document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixelGrid');
    const pixelsSoldSpan = document.getElementById('pixelsSold');
    const progressBar = document.getElementById('progress');
    const buyPixelsBtn = document.getElementById('buyPixelsBtn');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');

    const TOTAL_PIXELS = 1000000;
    const GRID_SIZE = 100; // Representaremos 1 millón de píxeles con una cuadrícula de 100x100 para visualización.
                          // Cada "celda" de esta cuadrícula representará 100x100 píxeles reales (10,000 píxeles).
    let pixelsSold = 0; // Esto debería venir de una base de datos real en un entorno de producción.
    let currentZoom = 1;

    // Función para simular la carga de píxeles vendidos (para demostración)
    function loadPixels() {
        // En una aplicación real, esto cargaría datos de un servidor.
        // Aquí simulamos algunos píxeles ya "vendidos"
        const soldPixelData = [
            { id: 0, img: 'assets/logo_ejemplo.png', link: 'https://ejemplo.com', title: 'Empresa X' },
            { id: 105, img: 'assets/huellita.png', link: 'https://nuestra-causa.com', title: 'Amor animal' },
            { id: 250, img: 'assets/logo_ejemplo2.png', link: 'https://otra-web.com', title: 'Mi Tienda' },
            // Agrega más datos de píxeles vendidos aquí si quieres
        ];

        soldPixelData.forEach(data => {
            const pixelElement = document.getElementById(`pixel-${data.id}`);
            if (pixelElement) {
                if (data.img) {
                    const img = document.createElement('img');
                    img.src = data.img;
                    img.alt = data.title || 'Píxel vendido';
                    pixelElement.appendChild(img);
                }
                if (data.link) {
                    pixelElement.style.cursor = 'pointer';
                    pixelElement.onclick = () => window.open(data.link, '_blank');
                }
                pixelElement.title = data.title || 'Píxel vendido';
                pixelElement.style.backgroundColor = '#FFD700'; // Color para píxeles vendidos
                pixelsSold++;
            }
        });
        updateStats();
    }

    // Generar la cuadrícula de píxeles
    function generatePixelGrid() {
        pixelGrid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
        pixelGrid.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;

        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.id = `pixel-${i}`;
            pixel.title = `Píxel #${i + 1}`; // Título inicial
            // En un entorno real, aquí se verificaría si el píxel ya está vendido
            // y se cargaría la imagen/enlace correspondiente.
            pixelGrid.appendChild(pixel);
        }
        loadPixels(); // Cargar los píxeles simulados
    }

    // Actualizar contador y barra de progreso
    function updateStats() {
        pixelsSoldSpan.textContent = pixelsSold;
        progressBar.value = pixelsSold;
        progressBar.max = TOTAL_PIXELS / (TOTAL_PIXELS / (GRID_SIZE * GRID_SIZE)); // Ajusta el máximo de la barra
    }

    // Funcionalidad de compra (simulada)
    buyPixelsBtn.addEventListener('click', () => {
        alert('¡Gracias por tu interés! Próximamente habilitaremos la plataforma de compra de píxeles. ¡Mantente atento!');
        // Aquí iría la lógica para redirigir a una página de selección de píxeles o un modal de compra.
    });

    // Funcionalidad de Zoom (básica)
    function applyZoom() {
        pixelGrid.style.transform = `scale(${currentZoom})`;
        pixelGrid.style.transformOrigin = 'center center';
    }

    zoomInBtn.addEventListener('click', () => {
        if (currentZoom < 3) { // Limitar el zoom máximo
            currentZoom += 0.2;
            applyZoom();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > 0.5) { // Limitar el zoom mínimo
            currentZoom -= 0.2;
            applyZoom();
        }
    });

    // Inicializar la cuadrícula
    generatePixelGrid();
    updateStats();
});