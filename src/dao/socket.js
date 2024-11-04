import { Server } from 'socket.io';
import { ProductManager } from './ProductManager.js';

const productManager = new ProductManager();

const setupSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');
        console.log(`nuevo user ${socket.id}`)

        socket.on('getProducts', async () => {
            try {
                const Productos = await productManager.getAll();
                socket.emit('Products', Productos);
            } catch (error) {
                throw new Error(error);
            }
        })

        socket.on('newProduct', async (data) => {
            try {
                const newProduct = await productManager.addProduct(data);
                socket.emit('productoAñadido', newProduct);
            } catch (error) {
                throw new Error(error);
            }
        })

        socket.on('deleteProduct', async (id) => {
            try {
                const deletedProduct = await productManager.deleteProduct(Number(id));
                socket.emit('productoEliminado', deletedProduct);
            } catch (error) {
                throw new Error(error);
            }
        })
    });
};



export default setupSocket
