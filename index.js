require('dotenv').config();

const express = require('express');
const cors = require('cors');
const animalRouter = require('./routes/animalRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors);

require('./db/mongo');

app.use('/api/animal', animalRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app corriendo en el puerto: ${PORT}!`);
});