"use strict";
const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weather=require('./data/weather.json');
const PORT=process.env.PORT;


app.get('/',(req,res)=>{

    res.status(200).send("The Weather");
});


class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  
  app.get("/weather", (req, res) => {
    let lat=Number(req.query.lat);
        let lon=Number(req.query.lon);
       // let searchQuery = req.query.searchQuery;


    const searchQuery = req.query.city_name;
  
    const checkArray = weather.find((item) => {
      return item.city_name.toLowerCase() === searchQuery.toLowerCase();
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
  app.listen(PORT, () => {});












// app.get('/weather',(req,res)=>{
//     let lat=Number(req.query.lat);
//     let lon=Number(req.query.lon);
//     let searchQuery = req.query.searchQuery;
//     // city_name= req.query.searchQuery.toLocaleLowerCase();

// if(searchQuery !=='Paris'&& searchQuery!=='Seattle'&& searchQuery!=='Amman'){
//     res.status(400).send("please provide correct query params");

// }

//     if (lat&&lon){
//         let result=[];
//         weather.find(item=>{
//             if(item.lat===lat&&item.lon===lon && item.city_name===searchQuery){
//                 result.push(item)
//             }
//         })
//         let city=result[0];
//         if (result.length>0){
//             let foreCast=city.data.map(item=>{
//                 return {
                   
//                      date:item.datetime,
//                      description:item.weather.description
//                 }
//             })
//             res.status(200).json(foreCast);
//         }else{
//             res.status(404).send("resources not found")
//         }

//     }else{
//         res.status(400).send("please provide correct query params");
//     }

// })

// app.listen(PORT, ()=>{
//     console.log(`Listening on port ${PORT}` )
// });

//////////////////////////////////
