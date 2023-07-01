const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true,
        minLength: 6
    }
});


//Para que al devolverlo no me traiga todos los datos, lo mapeo quitandole el __id (object de mongo) y el __v. y le agrego un id en string
userSchema.set('toJSON', {
    transform: (document, userJSON) => {
        userJSON.id = document._id.toString();
        delete userJSON._id;
        delete userJSON.__v;
        delete userJSON.clave;
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
