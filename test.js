// Conexión cruda a una bd relacional para probar funcionamiento de acceso
const mysql = require('mysql2');


let connection = mysql.createConnection({
    host        :'localhost',
    user        :'ismael',
    password    :'Netnet44$$',
    database    :'dadosgame',
    multipleStatements: true 

});


connection.query('SELECT * FROM gamers', (err, rows) =>{
    if(err) throw err;

    console.log("Connection established succesfully. Data received.");
    console.log(rows);

});

