import { 
    getProducts as getProductsService, 
    postProduct as postProductService,
    getProductById as getProductByIdService, 
    putProductById as putProductByIdService,
    deleteProductById as deleteProductByIdService  
} from "../services/products.services.js";
import CustomError from "../middlewares/errors/CustomError.js"
import EErrors from "../middlewares/errors/enums.js";
import { generateProductErrorInfo } from "../middlewares/errors/info.js"

const getProducts = async (req, res) => {
    //leo el parametro por req.query
    const limit = parseInt(req.query.limit, 10) || 3;
    const page = parseInt(req.query.page, 10) || 1;
    let query = req.query.query; 
    let sort  = req.query.sort;
    try {
        let sort1= "";
        let sort2= "";
        let query1= "";
        let query2= "";
        if (query) {
            query2= query; 
            query1= {category: query};
        }
        if (sort) {
            sort2=sort;
            sort1= {price: sort};
        }
        //console.log(query);
        const products = await getProductsService(limit, page, query1, sort1);
        products.prevLink = products.hasPrevPage?`http://localhost:8080/api/products?page=${products.prevPage}&query=${query2}&sort=${sort2}`:'';
        products.nextLink = products.hasNextPage?`http://localhost:8080/api/products?page=${products.nextPage}&query=${query2}&sort=${sort2}`:'';
        products.isValid= !(page<=0||page>products.totalPages)
        //Postman
        // res.send({ status: "success", payload: products}); 
        //Render page
        res.render("products.handlebars", products );
} catch (error) {
    res.status(500).send({ status: "error", error });
}
};

const getProductById =  async(req, res) => {
    const id = String(req.params.pid);

    // BUsco el ID en el arreglo
    try {
        const productById = await getProductByIdService(id);
        const response = { status: "OK", payload: productById} 
        //muestro resultado
        //Postman
        res.status(200).json(response);
        //Render page
        //res.render("products.hbs", { productById });
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El producto con ID ${id} NO existe!` };
        //Postman
        res.status(404).json(response);
    };
};

const postProduct = async(req, res) => {
    const product = req.body;
    if (!product.status){
        product.status = true
    };
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        throw CustomError.createError({
            name: 'ProductError',
            cause: generateProductErrorInfo({
                "title":product.title,
                "description":product.description,
                "code":product.code, 
                "stock":product.stock,
                "price":product.price
            }),
            message: 'Error trying to create product',
            code: EErrors.INVALID_TYPE_ERROR
        })
    };
    
    try {
        const result = await postProductService(product);
        //Valido el resultado de la creacion del producto
        if (result.acknowledged) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await getProductsService());
        };

        const response = { status: "Success", payload: result};

        //res.status(200).json(response);
        // muestro resultado
        // res.redirect("/realTimeProducts");
        res.send({ status: 'success', message: 'Product OK' })

    } catch (error) {
        if(error.code===11000){
            // Código de producto duplicado
            res.status(501).send({ status: "error", error });
        }else{
            res.status(500).send({ status: "error", error });
        };
    };
};

const putProductById = async(req,res) =>{
    // llamar al metodo updateProduct para actualizar sin modificar el id
    const id = String(req.params.pid);
    const product = req.body;

    /* console.log(product.category); */
    /* if(!product.title || !product.description || !product.code || !product.price || 
        !product.stock || !product.category || !product.status){
        return res.status(400).send({error:'Hay campos que faltan completar!'});
    } */

    if("id" in product){
        return res.status(404).json({ status: "NOT FOUND", data: "Error no se puede modificar el id"});
    }

    //Intento actualizar los datos de productos
    try {
        const result = await putProductByIdService(id, product);
        if (result.acknowledged) {
            const response = { status: "OK",  payload: `El producto con ID ${id} fue actualizado con éxito!`};
            res.status(200).json(response);
        } else {
            res.status(200).send("ERROR");
        }
    } catch (error) {
        res.status(404).send({ status: "error", error });
    }
};

const deleteProductById = async(req,res)=>{
    const id = String(req.params.pid);
    //llamar al metodo deleteProduct pasandole como parametro id

    try {
        const result = await deleteProductByIdService(id);

        //Valido el resultado de la búsqueda y renderizo con el socket
        if (result.acknowledged & result.deletedCount!==0 ) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await getProductsService());
            const response = { status: "Success", payload: `El producto con ID ${id} fue eliminado!`}; 
            res.status(200).json(response);
        } else {
            const response = { status: "NOT FOUND", payload: `NO existe el producto que desea eliminar!`}; 
            res.status(404).json(response);
        };
    } catch (error) {
        res.status(404).json({ status: "NOT FOUND", payload: `NO existe el producto que desea eliminar!` });
        /* res.status(500).send({ status: "error", error }); */
    }
};

export {
    getProducts,
    postProduct,
    getProductById,
    putProductById,
    deleteProductById
};