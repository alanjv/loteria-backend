const mysql = require('mysql');
const { database } = require('./keys')

const pool = mysql.createPool(database);
const { promisify } = require('util');
pool.getConnection((err, connection) => {
    if (connection) connection.release();
    console.log('Base conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;