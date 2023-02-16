import React, { useState } from 'react'
import sunrise from '../../asset/sunrise.png'
import sunset from '../../asset/sunset.png'

import './home.css'


export default function Home() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dc166774c0a0d81c38a2655eeddc6ed5`;

  /** feature to Fetch Location automatically when website visited */

  /*
  const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
*/

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        setData(data);
      })
    } else {
      setLocation('')
    }
  }


  if (data.main) {
    const sunRise = new Date(data.sys.sunrise * 1000);
    const sunSet = new Date(data.sys.sunset * 1000);
    const weatherIcon = data.weather[0].icon;


    return (
      <div id='weather-app'>
        <div className='container app-container'>
          <div className='location'>
            <span className='location-icon'><i className="fa-solid fa-location-dot"></i></span>
            <input name='location'
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter a city'></input>
          </div>
          <div className='temp-card'>
            <div className='temperature'>
              {data.main ?
                <div>
                  <h1>{data.name}</h1>
                  <p>{(data.weather[0].description).toUpperCase()}</p>
                  {<p><img className='weatherIcon' src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt='Icon' /></p>}
                  <div><p className='realTemp'> {(data.main.temp - 273.15).toFixed(1)} °C</p> <p>Feels like: <span>{(data.main.feels_like - 273.15).toFixed(1)} °C</span></p></div>
                </div>
                : null}

            </div>
            <div>
              {data.main ?
                <div className='sunriseSunset'>
                  <div className='sunimg'> <img src={sunrise} alt='sunrise' /> <span> {sunRise.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</span> </div>
                  <div className='sunimg'> <img src={sunset} alt='sunrise' /> <span> {sunSet.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</span> </div>
                </div>
                : null}
            </div>

          </div>
          <div  >
            {data.main ?
              <div className='otherFactor'>
                <p>Wind Speed : {((data.wind.speed) * 3.6).toFixed(1)} Km/H</p>
                <p>Humidity : {data.main.humidity}%</p>
                <p>Pressure : {data.main.pressure} mb</p>
                <p>Visibility : {(data.visibility) / 1000} KM</p>
              </div>
              : null}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div id='weather-app'>
        <div className='container app-container'>
          <div className='location'>
            <span className='location-icon'><i className="fa-solid fa-location-dot"></i></span>
            <input name='location'
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter a city'></input>
          </div>
        </div>
      </div>
    )
  }
}
