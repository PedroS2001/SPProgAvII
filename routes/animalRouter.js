const animalRouter = require('express').Router();
const Animal = require('../model/animal');


animalRouter.get('/', (req, res) => {
    Animal.find({}).then((animals) => {
        console.log(animals);
        res.json(animals);
    })
})

animalRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    Animal.findById(id)
        .then((animal) => {
            if (animal) {
                console.log(animal);
                res.json(animal);
            }
        })
        .catch(err => {
            res.status(400).json({ msg: "No se encontro la mascota" })
        })
});

animalRouter.post('/', (req, res) => {
    console.log(req.body);
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    const nuevoAnimal = new Animal({ nombre, edad, tipo, vacunado, observaciones })

    nuevoAnimal.save()
        .then((ani) => {
            console.log(ani);
            res.send(ani);
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
});


animalRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    Animal.findByIdAndDelete(id)
        .then((ani) => {
            if (ani) {
                res.status(204).end();
            }
            res.status(404).end()
        })
        .catch((err) => {
            res.status(400).end();
        })
})

animalRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    Animal.findByIdAndUpdate(id, { nombre, edad, tipo, vacunado, observaciones }, { new: true })
        .then(ani => {
            if (ani) {
                console.log(ani);
                res.json(ani);
            }
            res.status(404).end()
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
})





module.exports = animalRouter;