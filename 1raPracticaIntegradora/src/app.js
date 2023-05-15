import express from 'express';
import { Server } from 'socket.io';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/cart.router.js";
import productRouter from "./routes/products.router.js";
import viewsProdRouter from "./routes/viewsProd.router.js";
import viewsChatPage from "./routes/viewsChatPage.route.js"
import ProductManager from './dao/dbManagers/productManager.js';

import handlebars from "express-handlebars";
import mongoose from "mongoose";

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsProdRouter)
app.use('/chatPage', viewsChatPage)

try {
    await mongoose.connect("mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/ecommerce?retryWrites=true&w=majority")
    console.log("conectados a la base MONGO");
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log('Server running'));

const io = new Server(server);
app.set('socketio',io);

//Creamos la instancia de la clase
const productManager = new ProductManager();

const logs = [];

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado');
    io.emit("showProducts", await productManager.getProducts());

    socket.on('message1', data => {
        io.emit('log', data)
    });

    socket.on('message2', data => {
        logs.push({ socketId: socket.id, message: data });
        io.emit('log', { logs })
    });

});