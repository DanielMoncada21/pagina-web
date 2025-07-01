const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const publicacionesRoutes = require('./routes/publicacionesroutes');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/publicaciones', publicacionesRoutes);

// DB + Start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a MySQL');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err);
  });