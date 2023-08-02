// Selector de Orden de precio
const ordPri = document.getElementById('ordPri')
if(ordPri){
    ordPri.addEventListener('change', () => {
    let sort ="";
    if (ordPri.options[ordPri.selectedIndex].value === "v2" ){
        sort = 1; 
    }else if (ordPri.options[ordPri.selectedIndex].value === "v3" ){  
        sort = -1;
    } 
    window.location= "/api/products?sort="+`${sort}`;
    });
};

// Selector de Categoría
const categSel = document.getElementById('categSel1')
if(categSel){
    categSel.addEventListener('change', () => {
    if (categSel.options[categSel.selectedIndex].value === "c6" ){
        window.location= "/api/products";
    }else{
        const query = categSel.options[categSel.selectedIndex].text;
        window.location= "/api/products?query="+`${query}`;
    }; 
    }); 
}; 

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
        /* window.location= "/home"; */
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

// Botón para ver el carrito de prueba
const viewCart = document.getElementById('viewCart')
if(viewCart) {
    viewCart.addEventListener('click', async (event) => {
        const prueba = await fetch('/api/sessions/current', {
            method: 'GET'
        });
        const data = await prueba.json();
        const cart =data.payload.cart;
        window.location= "/api/carts/"+cart;
    });
};

// Botón para ver finalizar pedido
const closeCart = document.getElementById('cerrarTicket')
if(closeCart) {
    /* closeCart.addEventListener('click', async (event) => {
        const prueba = await fetch('/api/sessions/current', {
            method: 'GET'
        });
        const data = await prueba.json();
        const cart =data.payload.cart;
        window.location= "/api/carts/"+cart;
    }); */
};

// Botón para insertar en carro
function procesoId(comp){
    const id = comp.id
    const butCart = document.getElementById(`${id}`)
    if(butCart){ 
        Swal.fire({
            title: 'Muy buena eleccion',
            text: 'Ingrese la cantidad a pedir',
            input: 'text',
            inputValidator: (value) =>{
                return !value && "Ingrese la cantidad a pedir";
            },
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Agregar al Carrito'
        }).then(async result =>{
            if (result.isConfirmed) {
                const obj=`{"quantity": ${result.value}}`;
                const prueba = await fetch('/api/sessions/current', {
                    method: 'GET'
                });
                const data = await prueba.json();
                const cart =data.payload.cart;
                const cartId='/api/carts/'+cart+'/product/'+id
                fetch(cartId, {
                    method: 'PUT',
                    body: obj,
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
                .then((result) => {
                    if (result.status === 200) {
                        Swal.fire({
                            title: 'Producto Agregado al Carrito',
                            icon: 'success'
                        })
                    }else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Hubo un error al registrar el producto, intente luego',
                            showConfirmButton: true,
                        })
                    }
                })
            }
        }); 
    };
};

// Botón para ver profile
const viewProfile = document.getElementById('viewProfile')
if(viewProfile) {
    viewProfile.addEventListener('click', (event) => {
        window.location= "/profile";
    });
};

// Botón para logout
const logout = document.getElementById('logout')
if(logout) {
    logout.addEventListener('click', (event) => {
        window.location= "/api/sessions/logout";
    });
};