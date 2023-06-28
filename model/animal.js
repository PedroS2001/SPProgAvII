const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    tipo: String,
    vacunado: Boolean,
    observaciones: String
});


//Para que al devolverlo no me traiga todos los datos, lo mapeo quitandole el __id (object de mongo) y el __v. y le agrego un id en string
animalSchema.set('toJSON', {
    transform: (document, animalJSON) => {
        animalJSON.id = document._id.toString();
        delete animalJSON._id;
        delete animalJSON.__v;
    }
});



const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
