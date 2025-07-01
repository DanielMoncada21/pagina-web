const Publicaciones = require('../models/publicacionesmodels');
const path = require('path');
const fs = require('fs');

// Obtener todas las publicaciones
const listarPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicaciones.findAll({
      order: [['fecha', 'DESC']]
    });
    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
};

// Obtener una publicación por ID
const obtenerPublicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicaciones.findByPk(id);
    if (publicacion) {
      res.json(publicacion);
    } else {
      res.status(404).json({ error: 'Publicación no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener publicación:', error);
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
};

// Crear nueva publicación
const crearPublicacion = async (req, res) => {
  try {
    const { tipo, descripcion, categoria } = req.body;

    // Generar ruta del archivo
    let ruta = null;
    if (req.file) {
      let carpeta = 'imagenes';
      if (tipo === 'imagen') carpeta = 'imagenes';
      else if (tipo === 'video') carpeta = 'videos';
      else if (tipo === 'audio') carpeta = 'audios';
      ruta = `${carpeta}/${req.file.filename}`;
    }

    const nueva = await Publicaciones.create({
      tipo,
      ruta,
      descripcion,
      categoria,
      fecha: new Date()
    });

    res.json(nueva);
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error al guardar la publicación' });
  }
};

// Eliminar publicación y archivo físico
const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicaciones.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    // Borra el archivo físico si existe
    if (publicacion.ruta) {
      const archivoPath = path.join(__dirname, '..', 'public', publicacion.ruta);
      if (fs.existsSync(archivoPath)) {
        fs.unlinkSync(archivoPath);
      }
    }

    await publicacion.destroy();
    res.json({ mensaje: 'Publicación eliminada' });
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
};

module.exports = {
  listarPublicaciones,
  obtenerPublicacionPorId,
  crearPublicacion,
  eliminarPublicacion
};