const userRouter = require('express').Router();
const User = require('../model/user');

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

    User.find({ correo })
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


userRouter.post('/login', (req, res) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    User.findOne({ correo, clave })
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

 



module.exports = userRouter;