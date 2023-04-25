import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsProdRouter from './routes/viewsProd.route.js'

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsProdRouter)

const server = app.listen(8080, () => console.log('Server running'));

const io = new Server(server);

/* io.on('connection', socket => {
    console.log('Conectado');
    socket.on('message1', data => {
        io.emit('log', data)
    });

    socket.on('message2', data => {
        logs.push({ socketId: socket.id, message: data });
        io.emit('log', { logs })
    });
}); */