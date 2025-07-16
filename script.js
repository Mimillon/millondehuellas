const TOTAL_PIXELES = 1000;
const jsonURL = 'data.json';
const formularioURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdNsFaS88azYxKMneXh3MdrKQ2sCkR5XzxDh6mcXz9Z8VEK3g/viewform';
let ocupados = {};
let grid;

fetch(jsonURL)
  .then(r => r.json())
  .then(data => {
    grid = document.getElementById('pixel-grid');
    data.forEach(entry => ocupados[entry.posicion] = entry);
    dibujarPixeles();
  });

function dibujarPixeles() {
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
}

// ADMINISTRADOR
function validarAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if (pass === 'admin123') {
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    alert('Contraseña incorrecta.');
  }
}

function guardarPixel() {
  const pos = parseInt(document.getElementById('pos').value);
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;
  const imagen = document.getElementById('imagen').value;
  const link = document.getElementById('link').value;

  if (!pos || !nombre || !imagen || !link) {
    alert("Debes completar todos los campos");
    return;
  }

  ocupados[pos] = { posicion: pos, nombre, mensaje, imagen, link };
  alert("Pixel actualizado (solo visible localmente, debes subir a GitHub manualmente)");
  location.reload();
}
