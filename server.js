require("./config/mongoose");
const express = require("express");
const app = express();
const router = require("./config/routing");
const cookieParser = require("cookie-parser");
// const axios = require("axios");



app.set("view engine", "ejs");


app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());



app.use(router);
app.listen(8000,()=> console.log("running ..."));