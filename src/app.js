import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { engine } from 'express-handlebars';
import setupSocket  from './dao/socket.js';
import realtiemeProducts from './routes/realtimeProducts.js';
import home from './routes/home.js'; // Importar el archivo socket.js

const app = express();
const PORT = 8080;

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname, 'views')); // Asegúrate de que la carpeta views exista

// Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/realtimeproducts', realtiemeProducts);
app.use('/', home)

// Crear servidor HTTP
const httpServer = createServer(app);
setupSocket(httpServer); // Configurar Socket.IO con el servidor HTTP

// Iniciar servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

