const mongoose = require("mongoose"); // importando el componente mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt
const userSchema = mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  clave: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["invitado", "dueño", "administrador"],
    default: "invitado"
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  activo: {
    type: Boolean,
    default: true
  }
});
userSchema.methods.encryptClave = async (clave) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clave, salt);
};
module.exports = mongoose.model("User", userSchema);
