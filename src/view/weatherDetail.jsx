import React from "react";
import "./App.css";
import Weather from "../component/weatherHours.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      weather:[],
      num:null,
      city:'',
      country:''
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return icons.Thunderstorm
        break;
      case rangeId >= 300 && rangeId <= 321:
        return icons.Drizzle
        break;
      case rangeId >= 500 && rangeId <= 521:
        return icons.Rain
        break;
      case rangeId >= 600 && rangeId <= 622:
        return icons.Snow
        break;
      case rangeId >= 701 && rangeId <= 781:
        return icons.Atmosphere
        break;
      case rangeId === 800:
        return icons.Clear
        break;
      case rangeId >= 801 && rangeId <= 804:
        return icons.Clouds
        break;
      default:
        return icons.Clouds
    }
  }

  getUrlParam(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.hash.substr(16).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  toNextday(){
    this.props.history.push('/weatherDetail?id='+(parseInt(this.getUrlParam('id'))+1)+'&city='+this.getUrlParam('city')+'&country='+this.getUrlParam('country'))
    this.getWeather()
  }

  getWeather=async ()=> {
    const country = this.getUrlParam('country');
    const city = this.getUrlParam('city');
    const num= this.getUrlParam('id');

    if (country && city) {
      const api_forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=5e77b5f6511456533228a4c91142bfc7`);
      const response_forecast = await api_forecast.json();
      console.log(response_forecast)
      let forecast=[]
      for(let i=parseInt(num)*8,j=0;j<8;i++,j++){
        forecast[j]={
          city: `${response_forecast.city.name}, ${response_forecast.city.country}`,
          country: response_forecast.city.country,
          main: response_forecast.list[i].weather[0].main,
          icon:this.get_WeatherIcon(this.weatherIcon, response_forecast.list[i].weather[0].id),
          celsius: this.calCelsius(response_forecast.list[i].main.temp),
          temp_max: this.calCelsius(response_forecast.list[i].main.temp_max) ,
          temp_min: this.calCelsius(response_forecast.list[i].main.temp_min),
          description: response_forecast.list[i].weather[0].description,
          date: response_forecast.list[i].dt_txt
        }
      }
      console.log(forecast)
      this.setState({weather:forecast});
     /* this.setState({country:country});
      this.setState({city:city});
      this.setState({num:num});*/
      // seting icons

    } else {

    }
  };

  render() {
    this.getWeather()
    let items = []
    for(let i=0;i<this.state.weather.length;i++){
      items.push(
        <div className="col-md-3" key={i}>
          <Weather
            city={this.state.weather[i].city}
            weatherIcon={this.state.weather[i].icon}
            temp_celsius={this.state.weather[i].celsius}
            temp_max={this.state.weather[i].temp_max}
            temp_min={this.state.weather[i].temp_min}
            description={this.state.weather[i].description}
            date={this.state.weather[i].date}
          />
        </div>
      )
    }
    return (
      <div className="App">
        <div>
          <h1 className="text-light city-title">
            {this.getUrlParam('city')}
            <button className="btn btn-warning nextday" onClick={this.toNextday.bind(this)}>Next Day</button>
          </h1>
          <div className="row">
            {items}
          </div>
        </div>
      </div>

    );
  }
}

export default Main;
