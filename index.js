require('dotenv').config();

const express = require('express');
///const cors = require('cors');
const mascotaRouter = require('./routes/mascotasRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors);

require('./db/mongo');

app.use('/api/mascota', mascotaRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app corriendo en el puerto: ${PORT}!`);
});