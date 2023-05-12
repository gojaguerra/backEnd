import express from 'express';
import __dirname from "./utils.js";
import usersRouter from "./routes/users.js";
import coursesRouter from "./routes/courses.js";
import viewsRouter from "./routes/views.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);

try {
    await mongoose.connect("mongodb+srv://jguerra1968:THWf8CZ8UjehbFfO@cluster37960jg.hhv9pbe.mongodb.net/?retryWrites=true&w=majority")
    console.log("conectados a la base MONGO");
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log('Server running'));