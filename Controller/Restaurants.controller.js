"use strict";
const axios = require('axios');

const Restaurant = require("../Models/Restaurants.models")

const restaurantControl= async (req, res)=>{
  
    const city_name = req.query.city;
    let lat = req.query.lat;
    let lon = req.query.lon;

    const cityNameYelp = `yelp-${city_name}`;
    //let key = process.env.YELP_API_KEY;

   let urlRestaurant=`https://api.yelp.com/v3/businesses/search?`
  //  superagent.get(urlRestaurant)
  //  .set('Authorization', `Bearer ${key}`)
  // //  let restaurantResponse=await axios.get(urlRestaurant);
  // //  let restaurantData=restaurantResponse.data;
  //  let cleanedRestaurant=restaurantData.results.map(item=>{
  //    return new Restaurant(item.name,`https://${item.image_url}`, item.price, item.reting, item.url);
  //  })
    
  //  res.status(200).json(cleanedRestaurant);

  axios.get(urlRestaurant,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        location:city_name,
        latitude:lat,
        longitude:lon
      },
    },
  ).then(YData=> {
    let cleanedData =YData.data.businesses.map(item =>{

      return new Restaurant(
      item.name,
        item.image_url,
        item.price,
        item.rating,
        item.url);
    });
    
    res.status(200).json(cleanedData);

  }).catch(error => {
    res.send(error);
  });
  
  }

 module.exports=restaurantControl;

 