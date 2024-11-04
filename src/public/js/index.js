const socket = io()

const liContainer = document.getElementById('productList');
const form = document.getElementById('productForm');
const deleteForm = document.getElementById('deleteForm');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newProduct = {
        title: form.title.value,
        price: parseInt(form.price.value),
        description: form.description.value,
        thumbnail: form.thumbnail.value,
        code: form.code.value,
        stock: form.stock.value,
        category: form.category.value
    }
    socket.emit('newProduct', newProduct)

    form.reset();
})

deleteForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const productId = document.getElementById('id').value;
    socket.emit('deleteProduct', productId);
    deleteForm.reset();
})

const renderProducts = (products) => {
    liContainer.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
    li.innerHTML = `title:${product.title}- price:${(product.price)}-code:${product.code}  description:${product.descripion}-stock:${product.stock}- categoria:${product.categor}-status:${product.status}`;
        liContainer.append(li);
    })
}

socket.emit('getProducts');

socket.on('productoAñadido', () => {
    socket.emit('getProducts')
})

socket.on('Products', (products) => {
    renderProducts(products)
})

socket.on('productoEliminado', () => {
    socket.emit('getProducts')
})