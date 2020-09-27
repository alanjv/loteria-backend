const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/sorteos', async(req, res) => {
    const registros = await pool.query('select * from tbl_registros order by fecha desc limit 3');
    res.send(registros);
});

router.get('/todos', async(req, res) => {
    const registros = await pool.query('select numero from tbl_registros');
    res.send(registros);
})

router.get('/:jornada', async(req, res) => {
    const jornada = req.params.jornada;
    const registros = await pool.query('select numero from tbl?registros where jornnada = ? order by jornada desc', [jornada]);
    res.send(registros);
});

router.get('/', async(req, res) => {
    const ult = await pool.query('select max(idPredicciones) as id from tbl_predicciones');
    const id = JSON.stringify(ult[0].id);
    const prediccion = await pool.query('select * from tbl_numero_prediccion where tbl_Predicciones_idPredicciones = ?', [id]);
    res.send(prediccion);
});

router.post('/', async(req, res) => {
    const predicciones = req.body;

    await pool.query('insert into tbl_predicciones (fecha_prediccion, jornada_prediccion) values(?,?)', [predicciones.fecha_prediccion, predicciones.jornada_prediccion]);

    const ult = await pool.query('select max(idPredicciones) as id from tbl_predicciones');
    const id = JSON.stringify(ult[0].id);

    for (let i = 1; i <= 11; i++) {
        if (i <= 10) {
            const numero_prediccion = predicciones.numeros[i].numero;
            const probabilidad = predicciones.numeros[i].probabilidad;
            await pool.query('insert into tbl_numero_prediccion (numero_prediccion, tbl_predicciones_idPredicciones, probabilidad) values (?,?,?)', [numero_prediccion, id, probabilidad]);

        } else {
            res.send('predicciones guardadas');
        }
    }
});
module.exports = router;