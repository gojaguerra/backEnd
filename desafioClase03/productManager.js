class productManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        
        const codeIndex = this.products.findIndex(producto => producto.id === id);

        if (codeIndex===-1) {
            console.log(`El producto con ID ${id} NO existe!`);
            return "NOT FOUND"            
        } else {
            return this.products[codeIndex]
        }

    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const codeIndex = this.products.findIndex(producto => producto.code === code);
        
        // VALIDO NO ESTEN VACIOS CAMPOS OBLIGATORIOS
        if(title===""){
            console.log('No se puede crear producto, campo Nombre vacio!');
            return
        }
        if(description===""){
            console.log('No se puede crear producto, campo Descripción vacio!');
            return
        }
        if(price=0){
            console.log('No se puede crear producto, campo Precio vacio!');
            return
        }
        if(thumbnail===""){
            console.log('No se puede crear producto, campo Imagen vacio!');
            return
        }
        if(code===""){
            console.log('No se puede crear producto, campo Código vacio!');
            return
        }
        if(stock=0){
            console.log('No se puede crear producto, campo Stock vacio!');
            return
        }

        // VALIDO NO EXISTA EL PRODUCTO. CAMPO DE VALIDACION CODE
        if (codeIndex!=-1) {
            console.log(`El producto ${code} ya existe!`);
            return            
        }

        // TODO OK para crear el nuevo producto
         const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // ASIGNO id autoincremental
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);   

    }

}



const manejadorProductos = new productManager();
// agrego codigo 100
manejadorProductos.addProduct("Galletas","Galletas de avena x 200grs",10,"imagen.jpg","100",50)
// repito mismo codigo - ERROR
manejadorProductos.addProduct("Galletas","Galletas de avena x 200grs",10,"imagen.jpg","100",50)
// envio title vacio - ERROR
manejadorProductos.addProduct("","Galletas de avena x 200grs",10,"imagen.jpg","100",50)

// agrego codigo 200
manejadorProductos.addProduct("Agua Saborizada","Agua con gas sabor naranje x 500cc",20.50,"imagen.jpg","110",50)

// muestro lista de productos
const losProductos = manejadorProductos.getProducts();
console.log(losProductos);

// obtengo el producto id 1
const respuestaFind1=manejadorProductos.getProductById(1);
console.log(respuestaFind1);
// obtengo el producto id 10 que no existe
const respuestaFind2=manejadorProductos.getProductById(10);
console.log(respuestaFind2);
