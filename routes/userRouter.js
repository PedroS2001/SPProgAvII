const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { SECRET } = require('../utils/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;



userRouter.get('/', (req, res) => {
    User.find({}).then((users) => {
        console.log(users);
        res.json(users);
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
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(400).json({ msg: "Ocurrio un error" })
        })
});


userRouter.post('/', async (req, res) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    let claveHash = await bcrypt.hash(clave, saltRounds);
    const nuevoUser = new User({ correo, clave: claveHash });

    nuevoUser.save()
        .then((usuario) => {
            res.send(usuario);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});


userRouter.post('/login', async (req, res) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    const user = await User.findOne({ correo });

    let correctPass = false;
    if (user != null) {
        correctPass = await bcrypt.compare(clave, user.clave);
    }

    if (!correctPass) {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    } else {
        const userToken = {
            username: user.correo,
            id: user.id
        }
        const token = await jwt.sign(userToken, SECRET, { expiresIn: 120 });
        res.json({ token });
    }
});




module.exports = userRouter;