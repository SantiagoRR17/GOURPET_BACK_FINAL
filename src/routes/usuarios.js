const express = require("express");
const router = express.Router(); //manejador de rutas de express
const usuarioSchema = require("../models/user");
const verifyToken = require("./validate_token");

//Nuevo usuario (Protegido y con encriptación)
router.post("/usuarios", verifyToken, async (req, res) => {
  try {
    const user = usuarioSchema(req.body);
    user.clave = await user.encryptClave(user.clave);
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//Consultar todos los usuarios
router.get("/usuarios", verifyToken, (req, res) => {
 usuarioSchema.find() //Aqui se ponen los filtros de las especificas
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});
//Consultar cantidad de usuarios registrados

router.get("/usuarios/count", verifyToken, (req, res) => {
 usuarioSchema.countDocuments()
 .then((count) => res.json({ count }))
 .catch((error) => res.json({ message: error }));
});

//Consultar un usuario por su id
router.get("/usuarios/:id", verifyToken, (req, res) => {
 const { id } = req.params;
 usuarioSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Modificar usuario por su id
router.put("/usuarios/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  let { nombre_usuario, email, clave, rol, activo } = req.body;

  try {
    if (clave) {
      const user = new usuarioSchema();
      clave = await user.encryptClave(clave);
    }

    const data = await usuarioSchema.updateOne(
      { _id: id },
      { $set: { nombre_usuario, email, clave, rol, activo } }
    );
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

// Eliminar usuario por su id
router.delete("/usuarios/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  usuarioSchema
    .findByIdAndDelete(id) // Busca el usuario por ID y lo elimina
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado correctamente", data });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;