const express = require("express");
const router = express.Router(); //manejador de rutas de express
const favoritoSchema = require("../models/favorito");
const verifyToken = require("./validate_token");


router.post("/favoritos", verifyToken, async (req, res) => {
  try {
    // Verificamos si ya existe para no duplicar
    const existe = await favoritoSchema.findOne({ 
      usuario: req.body.usuario, 
      receta: req.body.receta 
    });

    if (existe) {
      return res.json({ message: "Ya está en favoritos" });
    }

    const nuevoFavorito = favoritoSchema(req.body);
    await nuevoFavorito.save();
    res.json(nuevoFavorito);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Consultar todos los favoritos
router.get("/favoritos", verifyToken, (req, res) => {
 favoritoSchema.find()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Consultar un favoritos por su id
router.get("/favoritos/:id", verifyToken, (req, res) => {
 const { id } = req.params;
 favoritoSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Eliminar un favorito por su id
router.delete("/favoritos/:id", verifyToken, (req, res) => {
 const { id } = req.params;
 favoritoSchema
 .findByIdAndDelete(id)
 .then((data) => {
 res.json(data);
 })
 .catch((error) => {
 res.json({ message: error });
});
});

module.exports = router;