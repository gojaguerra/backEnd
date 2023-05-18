// Botón para agregar / Eliminar productos
const addProduct = document.getElementById('addProduct')
if(addProduct) {
    addProduct.addEventListener('click', (event) => {
        window.location= "/realTimeProducts";
    });
};

// Botón para ir al HOME
const goHome = document.getElementById('goHome')
if(goHome) {
    goHome.addEventListener('click', (event) => {
        window.location= "/";
    });
};

// Botón para ver lista de productos
const viewProduct = document.getElementById('viewProduct')
if(viewProduct) {
    viewProduct.addEventListener('click', (event) => {
        window.location= "/api/products";
    });
};

// Botón para ir al chat
const viewChat = document.getElementById('viewChat')
if(viewChat) {
    viewChat.addEventListener('click', (event) => {
        window.location= "/chat";
    });
};