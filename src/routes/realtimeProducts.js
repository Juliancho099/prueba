import {Router} from 'express';
import { ProductManager } from '../dao/ProductManager.js';
const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const Products = await productManager.getAll();
        res.render('realTimeProducts', {
            title: 'Productos en tiempo real',
            products: Products
        })
    } catch (error) {
        throw new Error(error);
    }
})

export default router