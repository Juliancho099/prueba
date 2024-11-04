import express from 'express';
import { ProductManager } from '../dao/ProductManager.js';
const router = express.Router();// Importar la función getIO

const productManager = new ProductManager();

// Obtener todos los productos (con limit opcional)
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getAll(limit);
    res.json(products);
});

// Obtener producto por ID
router.get('/:pid', async (req, res) => {
    const product = await productManager.getById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Agregar nuevo producto
router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    
    const updatedProducts = await productManager.getAll(); // Obtener la lista actualizada de productos
    io.emit('updateProducts', updatedProducts); // Emitir a todos los clientes
    
    res.status(201).json(newProduct);
});

// Actualizar producto por ID
router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Eliminar producto por ID
router.delete('/:pid', async (req, res) => {
    const deletedProduct = await productManager.deleteProduct(parseInt(req.params.pid));
    
    const updatedProducts = await productManager.getAll(); // Obtener la lista actualizada de productos
    io.emit('updateProducts', updatedProducts); // Emitir a todos los clientes
    
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

export default router;
