const mysql = require('mysql');
const express = require('express');
//const bodyparser = require('body-parser')

const app = express();

// configuring express server
app.use(express.json());

//MySQL details

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'netnet44',
    database: 'learners',
    multipleStatements: true 
})

// connection to database
mysqlConnection.connect((err=> {
    if (!err){
        console.log("Connection established succesfully");
    } else {
        console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
    }
}))

//Establish the server connection
//PORT ENVIROMENT VARIABLE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Creatin GET router to fetch all the data from MySQL
app.get('/learners', (req, res)=>{
    mysqlConnection.query('SELECT * FROM learnerdetails', (err, row, fields) =>{
        if (!err){
            res.status(200).send(row);
        } else {
            console.log(err);
        }
    })
});

//Router to GET specific learner detail from the MySQL database
app.get('/learners/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM learnerdetails WHERE learner_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err){
            res.send(rows);
        } else {
        console.log(err);
        }
    })
} );

//Router to INSERT/POST a learner's detail
app.post('/learners', (req, res) => {
    let learner = req.body;
    const sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?; CALL learnerAddOrEdit(@learner_id,@learner_name,@learner_email,@course_Id);";
    mysqlConnection.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
        if (!err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send('New Learner ID : '+ element[0].learner_id);
                }
            });
        } else {
            console.log(err);
        }
    });    
});

//Router to UPDATE a learner's detail
app.put('/learners', (req, res) => {
    let learner = req.body;
    const sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?; CALL learnerAddOrEdit(@learner_id,@learner_name,@learner_email,@course_Id);";
    mysqlConnection.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
        if (!err){
            res.send('Learner Details Updated Successfully');
        } else {
            console.log(err);
        }
    })
    });

    //Router to DELETE a learner's detail
app.delete('/learners/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM learnerdetails WHERE learner_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.send('Learner Record deleted successfully.');
        } else {
         console.log(err);
        }
    })
});


app.get('*', (req, res) => {
    res.status(404).send("Sorry, this site is not available");
});