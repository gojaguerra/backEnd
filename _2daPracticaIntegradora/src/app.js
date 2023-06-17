import express from 'express';
import { Server } from 'socket.io';
import __dirname from "./utils.js";
import homeRouter from "./routes/home.router.js";
import cartsRouter from "./routes/cart.router.js";
import productRouter from "./routes/products.router.js";
import viewsProdRouter from "./routes/viewsProd.router.js";
import viewsChatPage from "./routes/viewsChatPage.route.js"
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js';
import ProductManager from './dao/dbManagers/productManager.js';
import MessageManager from './dao/dbManagers/chatManager.js';
import cookieParser from 'cookie-parser';
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Conexion principal a Mongo con mongoose
try {
    await mongoose.connect("mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/ecommerce?retryWrites=true&w=majority")
    console.log("conectados a la base MONGO");
} catch (error) {
    console.log(error);
}

// Middleware para cookies
app.use(cookieParser("Coder39760"));

// Middleware para sesiones usando Mongo Storage con conexion compartida
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: "Coder39760",
    resave: true,
    saveUninitialized: true
}));

//PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/* // middleware para sesiones usando Mongo Storage y con conexion propia
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/ecommerce?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: "Coder39760",
    resave: true,
    saveUninitialized: true
})); */

/* //middleware Log conexiones
app.use((req, res, next) => {
    console.log(`Nueva ${req.method} - ${req.path}`);
    next();
}); */

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


const server = app.listen(8080, () => console.log('Server running'));

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