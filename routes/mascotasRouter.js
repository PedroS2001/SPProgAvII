const mascotaRouter = require('express').Router();
const { verifyToken } = require('../middlewares/auth');
const Mascota = require('../model/mascota');

mascotaRouter.use(verifyToken);

mascotaRouter.get('/', (req, res) => {
    Mascota.find({}).then((mascotas) => {
        console.log(mascotas);
        res.json(mascotas);
    })
})

mascotaRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    Mascota.findById(id)
        .then((mascota) => {
            if (mascota) {
                console.log(mascota);
                res.json(mascota);
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(400).json({ msg: "No se encontro la mascota" })
        })
});

mascotaRouter.post('/', (req, res) => {
    console.log(req.body);
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    const nuevaMascota = new Mascota({ nombre, edad, tipo, vacunado, observaciones })

    nuevaMascota.save()
        .then((masc) => {
            console.log(masc);
            res.send(masc);
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
});


mascotaRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    Mascota.findByIdAndDelete(id)
        .then((masc) => {
            if (masc) {
                res.status(204).end();
            }
            res.status(404).end()
        })
        .catch((err) => {
            res.status(400).end();
        })
})

mascotaRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    Mascota.findByIdAndUpdate(id, { nombre, edad, tipo, vacunado, observaciones }, { new: true })
        .then(masc => {
            if (masc) {
                console.log(masc);
                res.json(masc);
            }
            res.status(404).end()
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
})





module.exports = mascotaRouter;