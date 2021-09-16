"use strict";

const axios = require('axios');

const Moviefilm = require("../Models/Movie.models")
/////the first attempt for movies //////

const moviesControl= async (req, res)=>{
  
    const city_name = req.query.city;
   let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`
  
   let movieResponse=await axios.get(urlMove);
   let movieData=movieResponse.data;
   let cleanedMovie=movieData.results.map(item=>{
     return new Moviefilm(item.release_date, item.title, item.overview, item.vote_average, item.vote_count,`https://image.tmdb.org/t/p/w500${ item.poster_path}`);
   })
    
   res.status(200).json(cleanedMovie);
  
  }


  module.exports=moviesControl;
