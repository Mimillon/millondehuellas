const TOTAL_PIXELES = 1000;
const jsonURL = 'data.json';
const formularioURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdNsFaS88azYxKMneXh3MdrKQ2sCkR5XzxDh6mcXz9Z8VEK3g/viewform';

fetch(jsonURL)
  .then(r => r.json())
  .then(data => {
    const grid = document.getElementById('pixel-grid');
    const ocupados = {};
    data.forEach((entry, i) => {
      ocupados[entry.posicion] = entry;
    });

    for (let i = 1; i <= TOTAL_PIXELES; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';

      if (ocupados[i]) {
        pixel.title = `${ocupados[i].nombre}: ${ocupados[i].mensaje}`;
        pixel.style.backgroundImage = `url(${ocupados[i].imagen})`;
        pixel.style.backgroundSize = 'cover';
        pixel.onclick = () => window.open(ocupados[i].link, '_blank');
        pixel.classList.add("ocupado");
      } else {
        pixel.title = "Disponible - haz clic para reservar";
        pixel.onclick = () => window.open(formularioURL + `?usp=pp_url&entry.1234567890=${i}`, '_blank');
      }

      grid.appendChild(pixel);
    }
  });
