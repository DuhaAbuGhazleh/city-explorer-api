"use strict";
const express=require('express');
const app=express();
const cors = require('cors');
const axios=require("axios");
require('dotenv').config();
app.use(cors());

const PORT=process.env.PORT;

const movieController=require("./Controller/Movie.controller");
const weatherController=require("./Controller/Weather.controller")


app.get('/weather',weatherController)

app.get('/movies',movieController )

app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`)
 });

