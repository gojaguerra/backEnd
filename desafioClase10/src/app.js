import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
//import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080, () => console.log('Server running'));

const io = new Server(server);