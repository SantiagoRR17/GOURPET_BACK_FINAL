const express = require("express");
const router = express.Router(); //manejador de rutas de express
const calificacionSchema = require("../models/calificacion");
const verifyToken = require("./validate_token");

//Nuevo calificacion
router.post("/calificaciones", verifyToken, (req, res) => {
 const calificacion = calificacionSchema(req.body);
 calificacion //revisar
 .save()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));

});

//Consultar todos los calificaciones
router.get("/calificaciones", verifyToken, (req, res) => {
 calificacionSchema.find()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Consultar una calificacion por su id
router.get("/calificacions/:id", verifyToken, (req, res) => {
 const { id } = req.params;
 calificacionSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});


module.exports = router;