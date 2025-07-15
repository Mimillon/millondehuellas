
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('pixel-grid');
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';

      if (data[i]) {
        pixel.title = `${data[i].nombre}: ${data[i].mensaje}`;
        if (data[i].imagen) {
          pixel.style.backgroundImage = `url(${data[i].imagen})`;
          pixel.style.backgroundSize = 'cover';
        }
        pixel.onclick = () => window.open(data[i].link, '_blank');
      } else {
        pixel.onclick = abrirFormulario;
      }
      grid.appendChild(pixel);
    }
  })
  .catch(err => console.error('Error al cargar datos:', err));
