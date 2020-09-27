const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/jornada/:jornada', async(req, res) => {
    const jornada = req.params.jornada;
    const registros = await pool.query('select * from tbl_registros where jornada = ?', [jornada]);
    res.send(registros);
});

router.get('/', async(req, res) => {
    const registros = await pool.query('select * from tbl_registros order by fecha desc');
    res.send(registros);
});

router.post('/', async(req, res) => {
    const { numero, jornada, fecha } = req.body;
    const registro = {
        numero,
        jornada,
        fecha
    };
    await pool.query('insert into tbl_registros set ? ', [registro]);
    res.send('registro ingresado');
});

router.put(':id', async(req, res) => {
    const id = req.params.id;
    const { numero, jornada, fecha } = req.body;
    const registro = {
        numero,
        jornada,
        fecha
    };
    await pool.query('update tbl_registros set ? where idRegistros = ?', [regisro, id]);
    res.send('Registro actualizado');
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await pool.query('Delete from tbl_registros where idRegistros = ?', [id]);
    res.send('Registro borrado');
});

module.exports = router;