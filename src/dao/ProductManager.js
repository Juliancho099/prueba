import fs from 'fs';
import path from 'path';
import { getDirname } from '../utils.js';
const productsFilePath = path.join(getDirname(), 'src', 'data', 'products.json');

export class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  // Cargar productos desde el archivo
  loadProducts() {
    if (fs.existsSync(productsFilePath)) {
      const data = fs.readFileSync(productsFilePath, 'utf-8');
      this.products = JSON.parse(data);
    }
  }

  // Guardar productos en el archivo
  saveProducts() {
    fs.writeFileSync(productsFilePath, JSON.stringify(this.products, null, 2));
  }

  // Listar todos los productos (con opción de limit)
  getAll(limit) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  // Obtener producto por ID
  getById(id) {
    return this.products.find(product => product.id === id);
  }

  // Agregar nuevo producto
  addProduct(product) {
    if (!product.title || !product.price || !product.description || !product.thumbnail || !product.code || !product.stock || !product.category) {
      throw new Error('Faltan campos obligatorios');
      
    }
    const productoFound = this.products.find(p => p.code === product.code);
    if (productoFound) {
      throw new Error('El producto ya existe');
    }
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = {
      id: id,
      price: Number(product.price),
      ...product,
      status: true,
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  // Actualizar producto por ID
  updateProduct(id, updates) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updates };
      this.saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  // Eliminar producto por ID
  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}

