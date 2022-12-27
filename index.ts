import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT = 2904;
const app = express();
import staffRoutes from "./src/router/staff.router";

app.set("view engine", "ejs");
app.set('views', './src/views');

const DB_URL = 'mongodb://127.0.0.1:27017/demo';
mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());
app.use('/staff',staffRoutes)

app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
});