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
            </div>
        </div>` 
    })
});

butAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    //window.location= "/api/products";
});
