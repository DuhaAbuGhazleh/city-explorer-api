"use strict";

const axios = require('axios');


/////the first attempt for movies //////

const moviesControl= async (req, res)=>{
  
    const city = req.query.city;
   let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
  
   let movieResponse=await axios.get(urlMove);
   let movieData=movieResponse.data;
   let cleanedMovie=movieData.results.map(item=>{
     return new Moviefilm(item.title,item.vote_count,item.image_url,item.popularity,item.release_date);
   })
    
   res.status(200).json(cleanedMovie);
  
  }


  module.exports=moviesControl;
