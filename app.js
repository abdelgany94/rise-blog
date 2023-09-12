
require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const { connectMongo } = require("./src/configs/database");
const { AppRouter } = require("./src/routers/routes");


const app = express();
const PORT = process.env.PORT || 3000 ;

connectMongo();

app.use(express.urlencoded({extends:true}))
app.use(express.json());
app.use(cors());

app.use(process.env.API_ROUTE_PREFIX || "/api/v1", AppRouter);  


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
}); 