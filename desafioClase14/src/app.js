import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsProdRouter from './routes/viewsProd.route.js'
import userRouter from './routes/user.router.js'
import mongoose from 'mongoose';
import ProductManager from './managers/productManager.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/users', userRouter)
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsProdRouter)

try {
     await mongoose.connect("mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/?retryWrites=true&w=majority")
     console.log("conectados a la base MONGO");
} catch (error) {

}

const server = app.listen(8080, () => console.log('Server running'));

const io = new Server(server);
app.set('socketio',io);

//Creamos la instancia de la clase
const productManager = new ProductManager('./desafioClase14/src/files/products.json');

io.on('connection', async socket => {
     console.log('Nuevo cliente conectado');
     io.emit("showProducts", await productManager.getProducts());
});