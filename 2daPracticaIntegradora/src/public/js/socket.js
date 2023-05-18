// Conecto el socket para comunicarnos con el server
const socket = io();

const container = document.getElementById('container');
const butAdd = document.getElementById('butAdd');


//Socket
socket.on('showProducts', data => {
    
    console.log(data);
    
    container.innerHTML = ``
    data.forEach(prod => {
        container.innerHTML +=`<div class="card" style="width: 18rem;">
            <img src="${prod.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${prod.title}</h5>
                <p class="card-text">Descripción:  ${prod.description}</p>
                <p class="card-text">Precio:$ ${prod.price}</p>
                <button class="btn btn-primary" id=boton${prod.code}>Comprar</button>
            </div>
        </div>` 
    })
});

/* `
        <div>
            <h3>Códigooo: ${prod.code}</h3>
            <p>Nombre: ${prod.title}</p> 
            <p>Descripción: ${prod.description}</p> 
            <p>Categoria: ${prod.category}</p> 
            <p>Precio: ${prod.price}</p>
            <p>Stock: ${prod.stock}</p>
        </div>
        ` */



butAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    //window.location= "/api/products";
});
