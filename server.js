"use strict";
const express=require('express');
const app=express();
const cors = require('cors');
const axios=require("axios");
require('dotenv').config();
app.use(cors());

const weather=require('./data/weather.json');
const PORT=process.env.PORT;


//lab07///
app.get('/',(req,res)=>{

    res.status(200).send("The Weather");
});


class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  
  app.get("/weather-array", (req, res) => {
    let lat=Number(req.query.lat);
        let lon=Number(req.query.lon);


    const searchQuery = req.query.city_name;
  
    const checkArray = weather.find((item) => {
      return item.city_name.toLowerCase() === searchQuery;
    });
  
    if (checkArray&&lat&&lon) {
      let newArray = checkArray.data.map((item) => {
        return new Forecast(item.datetime, item.weather.description);
      });
      res.json(newArray);

      if(searchQuery !=='Paris'&& searchQuery!=='Seattle'&& searchQuery!=='Amman'){
            res.status(500).send("please provide correct query params");
        
        }

    } else {
        res.status(500).send("please provide correct query params");
    }
    
  });
//app.listen(PORT, () => {});



//lab08 weather Forcast//////
///WEATHER FORCAST//


//handlewather is asyncronos function 
let handleWeather= async (req,res)=>{
  let lat=req.query.lat;
  let lon=req.query.lon;
  
  
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`; 
  //key come from .env file 
  let axiosResponse= await axios.get(url);
   //asyn will wait for axios response and inside the (get) we send data we need
  let weatherData=axiosResponse.data;
  let cleanedData=weatherData.data.map(item=>{
      return new ForeCast(item.datetime,item.weather.description);
  })
  res.status(200).json(cleanedData);
}
app.get('/weather',handleWeather)


//Model
class ForeCast{
  constructor(date,description){
      this.date=date;
      this.description=description;
  }
}



/////the first attempt for movies //////

const moviesControl= async (req, res)=>{
  let city = req.query.city
 let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

 let movieResponse=await axios.get(urlMove);
 let movieData=movieResponse.data;
 let cleanedMovie=movieData.results.map(item=>{
   return new Moviefilm(item.average_votes,item.vote_count,item.backdrop_path,item.popularity,item.release_date);
 })
  
 res.status(200).json(cleanedMovie);

}
app.get('/movies',moviesControl )

// Model
class Moviefilm{
  constructor(vote_average,vote_count,backdrop_path,popularity,release_date){
    this.average_votes = vote_average;
        this.vote_count = vote_count;
        this.image = backdrop_path;
        this.popularity = popularity;
        this.released_date = release_date;
  }
}



app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`)
 });

////////////////////////
    
// const moviesControl=(req, res)=>{
//   let city = req.query.city
//  let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

//  let moveResponse=axios.get(urlMove).then(response => {
//    let movie=response.data.results.map(item=>{
//      return new Movie(item)
//    })
//    res.json(movie)
//  }).catch(err=>{
//    res.status(500).send(`error in getting data ==> ${err}`)
// })
// }
//  app.get('/movies',moviesControl )


//  class Movie{
//   constructor(data){
//     this.average_votes = data.vote_average;
//     this.vote_count = data.vote_count
//     this.image = data.backdrop_path
//     this.popularity = data.popularity
//     this.released_date = data.release_date }};
    
// app.listen(PORT,()=>{
//   console.log(`listening to port ${PORT}`)
//  });

