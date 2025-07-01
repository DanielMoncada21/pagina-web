function mostrarVista(vista) {
  document.querySelectorAll('.vista').forEach(v => v.classList.remove('activa'));
  document.getElementById('vista-' + vista).classList.add('activa');
}

document.addEventListener('DOMContentLoaded', async () => {
  const contenedorArchivos = document.getElementById('contenedor-archivos');
  const contenedorTextos = document.getElementById('contenedor-textos');

  try {
    const res = await fetch('/api/publicaciones');
    const publicaciones = await res.json();

    publicaciones.forEach(pub => {
      const div = document.createElement('div');
      div.classList.add('publicacion');

      if (pub.tipo === 'imagen' && pub.ruta) {
        div.innerHTML = `
          <img src="${pub.ruta}" alt="${pub.descripcion || ''}" style="max-width: 100%">
          <p>${pub.descripcion || ''}</p>
        `;
        contenedorArchivos.appendChild(div);
      }

      else if (pub.tipo === 'video' && pub.ruta) {
        div.innerHTML = `
          <video src="${pub.ruta}" controls style="max-width: 100%"></video>
          <p>${pub.descripcion || ''}</p>
        `;
        contenedorArchivos.appendChild(div);
      }

      else if (pub.tipo === 'audio' && pub.ruta) {
        div.innerHTML = `
          <audio src="${pub.ruta}" controls></audio>
          <p>${pub.descripcion || ''}</p>
        `;
        contenedorArchivos.appendChild(div);
      }

      else if (pub.tipo === 'texto') {
        div.innerHTML = `
          <h3>${pub.categoria || 'Texto'}</h3>
          <p>${pub.descripcion || ''}</p>
        `;
        contenedorTextos.appendChild(div);
      }

      // Botón eliminar solo para admin
      if (localStorage.getItem('esAdmin') === 'true') {
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Eliminar';
        btnBorrar.onclick = async () => {
          if (confirm('¿Seguro que quieres eliminar esta publicación?')) {
            await fetch(`/api/publicaciones/${pub.id}`, { method: 'DELETE' });
            location.reload();
          }
        };
        div.appendChild(btnBorrar);
      }
    });
  } catch (err) {
    console.error('❌ Error al cargar publicaciones:', err);
  }
});