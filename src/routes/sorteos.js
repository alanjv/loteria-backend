const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/jornada/:jornada', async(req, res) => {
    const jornada = req.params.jornada;
    const registros = await pool.query('select * from tbl_registros where jornada = ?', [jornada]);
    res.json(registros);
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
    res.json({ text: "Sorteo ingresado" });
});

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const { numero, jornada, fecha } = req.body;
    const registro = {
        numero,
        jornada,
        fecha
    };
    await pool.query('update tbl_registros set ? where idRegistros = ?', [registro, id]);
    res.json({ text: "Sorteo actualizado" });
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await pool.query('Delete from tbl_registros where idRegistros = ?', [id]);
    res.json({ text: "Sorteo borrado" });
});

module.exports = router;