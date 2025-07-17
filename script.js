// Usar JSON simulado local
const jsonURL = 'data.json';

fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('pixel-grid');
    data.forEach(entry => {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.title = `${entry.nombre}: ${entry.mensaje}`;
      pixel.style.backgroundImage = entry.imagen ? `url(${entry.imagen})` : 'none';
      pixel.style.backgroundSize = 'cover';
      pixel.onclick = () => window.open(entry.link, '_blank');
      grid.appendChild(pixel);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));
