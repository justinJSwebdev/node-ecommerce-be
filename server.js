const express = require('express');
const { notFound, errHandler } = require("./middlewares/errorHandler")
require("dotenv").config();
var cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
const globalRoute = require("./routes")
const dbConnect = require("./configs/connectDB")
const port = process.env.PORT || 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dbConnect();
globalRoute(app);
app.all("*", notFound)
//error middleware
app.use(errHandler)
app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});