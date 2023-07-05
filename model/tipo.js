const mongoose = require("mongoose");

const tipoSchema = new mongoose.Schema({
    descripcion: String
});


//Para que al devolverlo no me traiga todos los datos, lo mapeo quitandole el __id (object de mongo) y el __v. y le agrego un id en string
tipoSchema.set('toJSON', {
    transform: (document, tipoJSON) => {
        tipoJSON.id = document._id.toString();
        delete tipoJSON._id;
        delete tipoJSON.__v;
    }
});



const Tipo = mongoose.model('Tipo', tipoSchema);

module.exports = Tipo;
