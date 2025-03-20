import React, { useRef } from 'react'
import './App.css'
import search_icon from '../src/assets/search.png'
import clear_icon from '../src/assets/clear.png'
import humidity_icon from '../src/assets/humidity.png'
import wind_icon from '../src/assets/wind.png'
import cloud_icon from '../src/assets/cloud.png'
import rain_icon from '../src/assets/rain.png'
import snow_icon from '../src/assets/snow.png'
import drizzle_icon from '../src/assets/drizzle.png'
import mist_icon from '../src/assets/mist.png'
import { useEffect,useState } from 'react'

const App = () => {
useEffect(() => {
  
search("Mumbai")
  
}, [])
const inputref=useRef()

const allIcons={
  "01d":clear_icon,
 "02d":cloud_icon,
 "03d":cloud_icon,
 "04d":cloud_icon,
 "09d":rain_icon,
 "10d":drizzle_icon,
 "11d":rain_icon,
 "13d":snow_icon,
 "50d":mist_icon,
 "01n":"https://openweathermap.org/img/wn/01n@2x.png",
 "03n":"https://openweathermap.org/img/wn/03n@2x.png",
"04n":"https://openweathermap.org/img/wn/04n@2x.png",
"09n":"https://openweathermap.org/img/wn/09n@2x.png",
"10n":"https://openweathermap.org/img/wn/10n@2x.png",
"11n":"https://openweathermap.org/img/wn/11n@2x.png",
"13n":"https://openweathermap.org/img/wn/13n@2x.png",
"50n":mist_icon,
  
}


const [weatherData, setWeatherData] = useState(false);
 
  const search=async (city) => {
    if(city=="")
    {alert("Enter City Name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data= await response.json();
      console.log(data)
      const icon=allIcons[data.weather[0].icon]
      setWeatherData({
        humidity:data.main.humidity,
        city:data.name,
        temp:Math.floor(data.main.temp),
        wind:data.wind.speed,
        icon:icon,
      })
    } catch (error) {
      
    }
  }


  return (
    <div className="body">
      <div className="container">
        
        <div className="search">
          <input type="text" ref={inputref}  className='oppins-regular' placeholder='search' name="cityname" id="" />
          <img className='searchIcon' onClick={()=>search(inputref.current.value)}  src={search_icon} alt="" />

        </div>
        
        <div className="weather">
          <img className='Icon' src={weatherData.icon} alt="" />
           <p className='temp'>{weatherData.temp}°c</p>
           <span className='city'>{weatherData.city}</span>
        </div>
        <div className="bottom">
          <div className="humidity">
            <img src={humidity_icon} alt="" />
            <div>
            <p >{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div>
          </div>
          <div className="wind">
            <img src={wind_icon} alt="" />
            <div>
            <p>{weatherData.wind} km/h</p>
            <span>wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
