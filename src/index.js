const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/sorteos', require('./routes/sorteos'));
app.use('/prediccion', require('./routes/predecir'));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto' + app.get('port'));
})