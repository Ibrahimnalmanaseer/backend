const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const PORT = process.env.PORT
app.use(cors())
const axios=require('axios')
let dataStorageW={};
let dataStorageM={};
var DisplayWeather=require('./source.js');
var DisplayMovies=require('./source.js');



app.get('/', (req, res) => {

  

    res.send('Welcome to our website')
})




app.get('/getweather', getweatherHandler);

async function getweatherHandler(req,res){

    const reqCity = req.query.city;
    if (dataStorageW[reqCity]===undefined){

        
   

    
    
    
     await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${reqCity}&days=3`).then((result)=>{
        let responsedData= result.data.forecast.forecastday;
        const newArr=[];
        responsedData.map(element=>{
            newArr.push( new DisplayWeather.DisplayWeather(element))

        })
        dataStorageW[reqCity]=newArr;

       
        res.send(newArr)
        console.log('idont the data')

        } )}       

        else{

            res.status(200).send(dataStorageW[reqCity])
            console.log('ihave the data')
        }
      
}   

app.get('/movie',getMovieHandler);

async function getMovieHandler(req,res){

    const reqCity = req.query.city;
    if (dataStorageM[reqCity]===undefined){

    await axios.get(`${process.env.MOVIE_URL}?api_key=${process.env.MOVIE_KEY}&query=${reqCity}`).then((result)=>{
        
    // return array of movies .
    let lastResult= result.data.results;
    
    const movieArr=[] ;
    lastResult.forEach(value => {
 

        movieArr.push(new DisplayMovies.DisplayMovies(value));
    });
   
    dataStorageM[reqCity]=movieArr;
    
    res.send(dataStorageM[reqCity])
       })
    


    .catch(error=>{

        res.send(error)
    })}

    else{
        res.status(200).send(dataStorageM[reqCity]);
        console.log('ihave the data')
    }
}






app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})