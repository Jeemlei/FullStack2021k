import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        console.log('effect-hook activated')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                console.log(country.capital, 'weather data:', response.data)
                setCurrentWeather(response.data.current)
            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population.toLocaleString()}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="10%" height="10%" />
            <h3>Weather in {country.capital}</h3>
            <div><b>temperature:</b> {currentWeather.temperature} &#176;C</div>
            <img src={currentWeather.weather_icons[0]} />
            <div><b>Wind:</b> {currentWeather.wind_speed} mph, direction {currentWeather.wind_dir}</div>
        </div>
    )
}

export default Country