// Botón para agregar / Eliminar productos
const  addProduct = document.getElementById('addProduct')
// addProduct.innerHTML = `<button id="addProduct" class="btn btn-secondary"> Ir a Cargar Productos</button>`
addProduct.addEventListener('click', (event) => {
    window.location= "/realTimeProducts";
});
// Botón para ver lista de productos
const  viewProduct = document.getElementById('viewProduct')
// viewProduct.innerHTML = `<button id="viewProduct" class="btn btn-secondary"> Ver Productos</button>`
viewProduct.addEventListener('click', (event) => {
    window.location= "/api/products";
});
