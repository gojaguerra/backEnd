import productManager from './manager/productManager.js';

const manejadorProductos = new productManager('./files/product.json');

//funcion para armar los productos
const cargoProduct = async () =>{

    // agrego codigo 100
    await manejadorProductos.addProduct("Galletas","Galletas de avena x 200grs",10,"imagen.jpg","100",50)
    // repito mismo codigo - ERROR
    await manejadorProductos.addProduct("Galletas","Galletas de avena x 200grs",10,"imagen.jpg","100",50)
    // envio title vacio - ERROR
    await manejadorProductos.addProduct("","Galletas de avena x 200grs",10,"imagen.jpg","100",50)
    // agrego codigo 200
    await manejadorProductos.addProduct("Agua Saborizada","Agua con gas sabor naranja x 500cc",20.50,"imagen.jpg","200",50)
    // agrego codigo 201
    await manejadorProductos.addProduct("Agua Saborizada","Agua con gas sabor lima x 500cc",20.50,"imagen.jpg","201",50)
}


// Función para Update datos 
const actualizoProduct = async (id, data) => {
    await manejadorProductos.updateProduct(id, data)
}

// Cargo el archivo de productos
console.log("INICIO CARGA DE PRODUCTOS: cargoProduct");
cargoProduct();

// muestro lista de productos
console.log("MUESTRO LOS PRODUCTOS: getProducts");
const losProductos = await manejadorProductos.getProducts();
console.log(losProductos);

// obtengo el producto id 1 y lo muestro
console.log("BUSCO PRODUCTO CON ID 1: getProductById");
const respuestaFind1= await manejadorProductos.getProductById(1);
console.log(respuestaFind1);

// obtengo el producto id 10 que no existe
console.log("BUSCO PRODUCTO CON ID 10: getProductById");
const respuestaFind2= await manejadorProductos.getProductById(10);
respuestaFind2 != -1 && console.log(respuestaFind2);

/*
// Cambio datos del producto selecciona y el campo que necesito
const respuestaFind3 = await actualizoProduct(1, {stock:30, title:"Tostadas"})
respuestaFind3 != -1 && console.log('Producto Actualizado')
*/