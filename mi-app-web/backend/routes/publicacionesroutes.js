const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs'); // Importa fs para manejar el sistema de archivos
const multer = require('multer');
const publicacionesController = require('../Controllers/publicacionescontroller');

// Configuración de Multer para guardar archivos en /public
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tipo = req.body.tipo;
    let carpeta = 'imagenes';
    if (tipo === 'imagen') carpeta = 'imagenes';
    else if (tipo === 'video') carpeta = 'videos';
    else if (tipo === 'audio') carpeta = 'audios';

    const dir = path.join(__dirname, '..', 'public', carpeta);
// filepath: mi-app-web/backend/routes/publicacionesroutes.js
    // Crear la carpeta si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nombre = Date.now() + ext;
    cb(null, nombre);
  }
});

const upload = multer({ storage });

// Ruta para obtener todas las publicaciones
router.get('/', publicacionesController.listarPublicaciones);

// Ruta para obtener una publicación por ID
router.get('/:id', publicacionesController.obtenerPublicacionPorId);

// Ruta para subir una nueva publicación
router.post('/', upload.single('archivo'), publicacionesController.crearPublicacion);
// ...existing code...
router.delete('/:id', publicacionesController.eliminarPublicacion);
// ...existing code...
module.exports = router;