const { connect } = require('mongoose');

const conectarDB = async () => {
    try {
        return connect(process.env.DB_URI);
    } catch (error) { }
}


conectarDB()
    .then((result) => {
        console.log("DB Conectada");
    })
    .catch((err) => {
        console.log(err.mesage);
    })