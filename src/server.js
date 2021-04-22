// SERVER: App entry point
const app = require("./app");
//const db = require("./db/DBConnection");

// Setting port
const { port } = require('./config');

//const routes = require('./api/routes');
//routes(app);
app.get('/' , (req, res) => {
      if (!err){
          console.log("-dibe")
      } else {
      console.log(err);
      }
  
} );


app.listen(app.get(port), () => {
    console.log("Express server started and running on port:" + port);
  });

