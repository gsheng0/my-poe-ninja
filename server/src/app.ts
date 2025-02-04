const express = require("express");
const routes = require("./routes");
//import configRoutes from './routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

//configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});