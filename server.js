const express = require('express');
require("dotenv").config();
const app = express();
const globalRoute = require("./routes")
const dbConnect = require("./configs/connectDB")
const port = process.env.PORT || 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dbConnect();
globalRoute(app);
app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});