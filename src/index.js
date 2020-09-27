const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/sorteos', require('./routes/sorteos'));
app.use('/prediccion', require('./routes/predecir'));

app.listen(4000, () => {
    console.log('Servidor en puerto' + 4000);
})