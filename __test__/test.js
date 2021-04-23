// Conexión cruda a una bd relacional para probar funcionamiento de acceso
const mysql = require('mysql2');


let connection = mysql.createConnection({
    host        :'localhost',
    user        :'ismael',
    password    :'netnet44',
    database    :'dicegame',
    multipleStatements: true 

});


connection.query('SELECT * FROM gamer', (err, rows) =>{
    if(err) throw err;

    console.log("No Server used. Connection established succesfully. Data received.");
    console.log(rows);

});

