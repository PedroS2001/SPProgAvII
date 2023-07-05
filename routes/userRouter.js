const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { SECRET } = require('../utils/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;



userRouter.get('/', (req, res, next) => {
    User.find({}).then((users) => {
        console.log(users);
        res.json(users);
    }).catch(err => {
        next(err)
    })
})


userRouter.get('/:correo', (req, res) => {
    const { correo } = req.params;
    console.log(correo);

    User.findOne({ correo })
        .then((usuario) => {
            if (usuario) {
                console.log(usuario);
                res.json(usuario);
            } else {
                next();
            }
        })
        .catch(err => {
            next(err);
        })
});


userRouter.post('/', async (req, res, next) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    let claveHash = await bcrypt.hash(clave, saltRounds);
    const nuevoUser = new User({ correo, clave: claveHash });

    nuevoUser.save()
        .then((usuario) => {
            res.send(usuario);
        })
        .catch(err => {
            return next(err);
        })
});


userRouter.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    const user = await User.findOne({ correo });

    let correctPass = false;
    if (user != null) {
        correctPass = await bcrypt.compare(clave, user.clave);
    }

    if (!correctPass) {
        return next({ name: "ValidationError", message: "Usuario o contraseña incorrectos" });
    }
    const userToken = {
        username: user.correo,
        id: user.id
    }
    const token = await jwt.sign(userToken, SECRET, { expiresIn: 5000 });
    res.json({ token });
});




module.exports = userRouter;