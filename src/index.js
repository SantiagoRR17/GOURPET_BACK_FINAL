const express = require("express");
const app = express();
const port = 3000;
const calificacionRoutes = require("./routes/calificaciones");
const favoritoRoutes = require("./routes/favoritos");
const recetaRoutes = require("./routes/recetas");
const authRoutes = require("./routes/authentication");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(express.json()); // transforma los datos a formato JSON //Gestión de las rutas usando el middleware
app.use("/api", authRoutes);
app.use("/api", calificacionRoutes);
app.use("/api", favoritoRoutes);
app.use("/api", recetaRoutes);
app.use(express.json()); //Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log(error)); //Conexión al puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
