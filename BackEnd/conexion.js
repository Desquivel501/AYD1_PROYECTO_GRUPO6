const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    port: process.env.PORT_DB
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a la base de datos');
    }
});

module.exports = connection;