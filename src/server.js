// SERVER: App entry point
const app = require("./app");
//const db = require("./db/DBConnection");

// Setting port
const port = process.env.PORT || 8080;

app.listen(app.get(port), () => {
    console.log("Express server started and running on port:" + port);
  });

