import React from 'react';
import './styles.css'

import Sunny from '../../assets/wsymbol_0001_sunny.svg';
import Cloudy from '../../assets/wsymbol_0004_black_low_cloud.svg';
import Rain from '../../assets/wsymbol_0018_cloudy_with_heavy_rain.svg';
import Fog from '../../assets/wsymbol_0007_fog.svg';
import Snow from '../../assets/wsymbol_0012_heavy_snow_showers.svg';
import Mist from '../../assets/wsymbol_0006_mist.svg'
import Humidity from '../../assets/humidity.png'
import Wind from '../../assets/wind.svg'

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const weatherMap = [
    { img: Sunny, status: "Clear" },
    { img: Cloudy, status: "Clouds" },
    { img: Fog, status: "Fog" },
    { img: Snow, status: "Snow" },
    { img: Rain, status: "Rain" },
    { img: Mist, status: "Mist" },
]

const CardPresentational = props => (
    <div className="card-container">
        {props.data.length > 0 &&
            props.data.map((city, i) => {
                let img = weatherMap.find(obj => obj.status === city.weather[0].main)?.img;
                return (
                    <div key={i} className="card">
                        <h4>{city.name + ', ' + city.sys.country}</h4>
                        <small>{props.daytime + city.weather[0].description}</small>

                        <div className="temp-container">
                            <div className="temp">{Math.round(city.main.temp)}</div>
                            <div className="unit">°C</div>
                            <img src={img} alt="weather-icon"></img>
                        </div>
                        <div className="rain-wind-container">
                            <img src={Humidity} alt="humidity-icon"></img>
                            <img src={Wind} alt="wind-icon"></img>
                        </div>
                        <div className="rain-wind-label">
                            <small>{city.main.humidity + '% '}Humidity</small>
                            <small>{city.wind.speed + ' mi/h'}</small>
                        </div>
                    </div>
                )
            })
        }
    </div>
)

class Card extends React.Component {

    getDayTime = () => {
        let date = new Date();

        let day = days[(date.getDay())];
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return day + ', ' + time + ', ';
    }

    render() {
        return <CardPresentational data={this.props.data} daytime={this.getDayTime()} />
    }
}

export default Card;