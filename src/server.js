// SERVER: App entry point
const app = require("./app");

// Setting port
const { PORT } = require('./config');

/* 
// configuring express server
const routes = require('./api/routes');
routes(app); */

// parse requests of content-type - application/json
app.use(bodyParser.json())

//const db = require("./db/DBConnection");

/* app.get('/' , (req, res) => {
    res.status(200).send("Express server started and running on port: " + PORT)
} ); */

// Routers not available for users
app.get('*', (req, res)=> {
    res.status(404).send("Sorry, not available at this moment!!")
})


app.listen(PORT, () => {
    console.log("Express server started and running on port: " + PORT );
  });

