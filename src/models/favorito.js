const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  receta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receta",
    required: true
  },
  fecha_agregado: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Favorito", favoritoSchema);
