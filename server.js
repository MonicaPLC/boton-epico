// servidor descargar express
const express = require("express");
const app = express();
const port = 8000;

//constante de sesion
const session = require("express-session");

//constante para usar mensaje flash
const flash = require("connect-flash");

//usar sesión
app.use(session({ secret: "mipropiaclave" }));

//mensaje flash
app.use(flash());

// carpeta estátca
app.use(express.static(__dirname + "/static"));

// vistas. Descargar ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

///para hacer post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para usar mis rutas
app.use(require("./routes/auth"));

// USANDO SOCKET::::::::::::::::::::::::::::::::::::::::::::::::::
const server = app.listen(port, function () {
  console.log("Escuchando en el puerto " + port);
});

const io = require("socket.io")(server);

// ENVÍO EL INICIO DEL CONTADOR::::::::::::::::::::::::::::::::::::::
let contador = 0;
io.on("connection", function (socket) {
  socket.emit("enviar_contador", { contador: contador });
});

//AUMENTO EL CONTADOR:::::::::::::::::::::::::::::::::::
io.on("connection", function (socket) {
  socket.on("aumentar", function (data) {
    contador++;
    io.emit("enviar_contador", { contador: contador });
  });
});

io.on("connection", function (socket) {
  // responde a todos incluiso al que manda
  socket.on("refrescar", function (data) {
    contador = 0;
    io.emit("enviar_contador", { contador: contador });
  });
});
