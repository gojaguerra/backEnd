// Botón para agregar / Eliminar productos
const addProduct = document.getElementById('addProduct')
// addProduct.innerHTML = `<button id="addProduct" class="btn btn-secondary"> Ir a Cargar Productos</button>`
addProduct.addEventListener('click', (event) => {
    window.location= "/realTimeProducts";
});

// Botón para ir al HOME
const goHome = document.getElementById('goHome')
if(goHome) {
    goHome.addEventListener('click', (event) => {
        window.location= "/";
    });
};

// Botón para ver lista de productos
const viewProduct = document.getElementById('viewProduct')
// viewProduct.innerHTML = `<button id="viewProduct" class="btn btn-secondary"> Ver Productos</button>`
viewProduct.addEventListener('click', (event) => {
    window.location= "/api/products";
});


// Botón para ir al chat
const viewChat = document.getElementById('viewChat')
viewChat.addEventListener('click', (event) => {
    window.location= "/chat";
});

