"use strict";
const express=require('express');
const app=express();
const cors = require('cors');
const axios=require("axios");
require('dotenv').config();
app.use(cors());

//const weather=require('./data/weather.json');
const PORT=process.env.PORT;


//lab07
// app.get('/',(req,res)=>{

//     res.status(200).send("The Weather");
// });


// class Forecast {
//     constructor(date, description) {
//       this.date = date;
//       this.description = description;
//     }
//   }
  
//   app.get("/weather", (req, res) => {
//     let lat=Number(req.query.lat);
//         let lon=Number(req.query.lon);


//     const searchQuery = req.query.city_name;
  
//     const checkArray = weather.find((item) => {
//       return item.city_name.toLowerCase() === searchQuery.toLowerCase();
//     });
  
//     if (checkArray&&lat&&lon) {
//       let newArray = checkArray.data.map((item) => {
//         return new Forecast(item.datetime, item.weather.description);
//       });
//       res.json(newArray);

//       if(searchQuery !=='Paris'&& searchQuery!=='Seattle'&& searchQuery!=='Amman'){
//             res.status(500).send("please provide correct query params");
        
//         }

//     } else {
//         res.status(500).send("please provide correct query params");
//     }
    
//   });
//app.listen(PORT, () => {});



//lab08 weather Forcast


// Model
class ForeCast{
  constructor(date,description){
      this.date=date;
      this.description=description
  }
}

// handlewather is asyncronos function 
let handleWeather= async (req,res)=>{
  let lat=req.query.lat;
  let lon=req.query.lon;
  let city_name=req.query.searchQuery;
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`; //key come from .env file 
  let axiosResponse= await axios.get(url); //asyn will wait for axios response and inside the (get) we send data we need
  let weatherData=axiosResponse.data;
  let cleanedData=weatherData.data.map(item=>{
      return new ForeCast(item.datetime,item.weather.description);
  })
  res.status(200).json(cleanedData);
}
app.get('/weather',handleWeather)

// app.listen(PORT,()=>{
//  console.log(`listening to port ${PORT}`)
// });


// the first attempt for movies 
// const moviesControl= async (req, res)=>{
//   let city = req.query.city
//  //let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`
//  let urlMove=`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&city=${city}`
//  let movieResponse=await axios.get(urlMove);
//  let movieData=movieResponse.data;
//  let cleanedMovie=movieData.data.map(item=>{
//    return new Moviefilm(item.city);
//  })
  
//  res.status(500).json(cleanedMovie);

// }
// app.get('/movies',moviesControl )

// // Model
// class Moviefilm{
//   constructor(date,description){
//       this.date=date;
//       this.description=description
//   }
// }

class Movie{
  constructor(data){
    this.average_votes = data.vote_average;
    this.vote_count = data.vote_count
    this.image = data.backdrop_path
    this.popularity = data.popularity
    this.released_date = data.release_date }};

    
const moviesControl=(req, res)=>{
  let city = req.query.city
 let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

 let moveResponse=axios.get(urlMove).then(response => {
   let movie=response.data.results.map(item=>{
     return new Movie(item)
   })
   res.json(movie)
 }).catch(err=>{
   res.status(500).send(`error in getting data ==> ${err}`)
})
}
 app.get('/movies',moviesControl )


app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`)
 });

// the array from TMBD website
// {
//   "poster_path": "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
//   "adult": false,
//   "overview": "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",
//   "release_date": "2016-10-19",
//   "genre_ids": [
//     53,
//     28,
//     80,
//     18,
//     9648
//   ],
//   "id": 343611,
//   "original_title": "Jack Reacher: Never Go Back",
//   "original_language": "en",
//   "title": "Jack Reacher: Never Go Back",
//   "backdrop_path": "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",
//   "popularity": 26.818468,
//   "vote_count": 201,
//   "video": false,
//   "vote_average": 4.19
// }