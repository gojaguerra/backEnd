import express from 'express';

const app = express();

const usuarios =[
    {id:1, nombre:"jose", edad:55},
    {id:2, nombre:"carlos", edad:45}
];

app.get("/saludo", (req, res) => {
    res.send("Hola a todos desde express");
});

app.get("/usuario", (req, res) => {
    res.send({
        nombre:"jose",
        edad:55
    })
})

app.get("/welcome", (req, res) => {
    res.send(`<h1>HOLA</h1>`)
})

app.get("/usuario/:id", (req, res) => {
    const userId = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === userId);
    res.send(usuario);
})

app.get("/usuarios-find", (req, res) => {
    const { edad, nombre } = req.query;

})

app.listen(8080, () => console.log("escuchando port 8080"));