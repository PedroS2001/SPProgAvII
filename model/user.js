const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    correo: String,
    clave: String,
});


//Para que al devolverlo no me traiga todos los datos, lo mapeo quitandole el __id (object de mongo) y el __v. y le agrego un id en string
userSchema.set('toJSON', {
    transform: (document, animalJSON) => {
        animalJSON.id = document._id.toString();
        delete animalJSON._id;
        delete animalJSON.__v;
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
