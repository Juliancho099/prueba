import {Router} from 'express';
import { ProductManager } from '../dao/ProductManager.js';
const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    const limit = req.query.limit || 10;
    try {
        const Products = await productManager.getAll(limit);
        res.render('home', {
            title: 'Home',
            products: Products
        })
    } catch (error) {
        throw new Error(error);
    }
})

export default router