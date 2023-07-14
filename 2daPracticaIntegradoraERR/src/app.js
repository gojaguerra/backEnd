import express from 'express';
import { Server } from 'socket.io';
import { __dirname } from "./utils.js";
import homeRouter from "./routes/home.router.js";
import cartsRouter from "./routes/cart.router.js";
import productRouter from "./routes/products.router.js";
import viewsProdRouter from "./routes/viewsProd.router.js";
import viewsChatPage from "./routes/viewsChatPage.route.js"
import sessionsRouter from './routes/sessions.router.js'
import mockingproducts from './routes/mockingproducts.router.js';
import "./dao/dbManagers/dbConfig.js"
import config from "./config/config.js"
import viewsRouter from './routes/views.router.js';
import ProductManager from './dao/dbManagers/productManager.js';
import MessageManager from './dao/dbManagers/chatManager.js';
import cookieParser from 'cookie-parser';
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import errorHandler from "./middlewares/errors/index.js";

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Conexion principal a Mongo con mongoose
/* try {
    await mongoose.connect("mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/ecommerce?retryWrites=true&w=majority")
    console.log("conectados a la base MONGO");
} catch (error) {
    console.log(error);
} */

// Middleware para cookies
app.use(cookieParser());

//middleware Log conexiones
app.use((req, res, next) => {
    console.log(`Nueva ${req.method} - ${req.path}`);
    next();
});

//PASSPORT
initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/home', homeRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsProdRouter)
app.use('/chat', viewsChatPage)
// MONCKING
app.use('/mockingproducts', mockingproducts);

// CONTROL DE ERRORES CUSTOM
app.use(errorHandler);

const server = app.listen(config.port, () => console.log('Server running'));

const io = new Server(server);
app.set('socketio',io);

const productManager = new ProductManager();
const messageManager = new MessageManager();

const messages = [];

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado');
    const products = await productManager.getProducts()
    io.emit("showProducts", products.docs);

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
        
        // Persistir en MONGO el chat
        try {
            const messageUser = messageManager.addMessage(data);
        } catch (error) {
            console.log("Error",error);
        }

    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });

});