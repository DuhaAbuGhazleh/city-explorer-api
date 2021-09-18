"use strict";

const axios = require('axios');
const Weathermodel=require("../Models/Weather.models");
const WEATHERBIT_API_KEY = process.env.WEATHER_API_KEY

const { response } = require('express');

/////////////////add cache ////////////////////


// const Cache=require("../helper/cache");
// let cache=new Cache();

// //handlewather is asyncronos function 
// let handleWeather= async (req,res)=>{
//     let lat=req.query.lat;
//     let lon=req.query.lon;
//   //const city_name = req.query.city;
//   let currentDate=new Date();

    
    
//     let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`; 
//     //key come from .env file 

// if(lat&&lon){
//   if(cache.data.length>0 && cache.date.getDate()===currentDate.getDate()){
//     let weatherforcheck=new cache.data.map(item=>{
//       return new Weathermodel(item);
//     })
//     res.json(weather);
//   }
//   else{
//     let axiosResponse= await axios.get(url);
//      //asyn will wait for axios response and inside the (get) we send data we need
//     let weatherData=axiosResponse.data;
//     let cleanedData=weatherData.data.map(item=>{
//         return new Weathermodel(item.datetime,item.weather.description);
//     })
//     res.status(200).json(cleanedData);
//   }
//   }
// }




//////////////////////////////////////////////

//lab08 weather Forcast//////
///WEATHER FORCAST//


//handlewather is asyncronos function 
let handleWeather= async (req,res)=>{
    let lat=req.query.lat;
    let lon=req.query.lon;
  //const city_name = req.query.city;
  
    
    
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`; 
    //key come from .env file 
    let axiosResponse= await axios.get(url);
     //asyn will wait for axios response and inside the (get) we send data we need
    let weatherData=axiosResponse.data;
    let cleanedData=weatherData.data.map(item=>{
        return new Weathermodel(item.datetime,item.weather.description);
    })
    res.status(200).json(cleanedData);
  }


  module.exports=handleWeather;