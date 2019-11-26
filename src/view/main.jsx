import React from "react";
import "./App.css";
import Form from "../component/form.component";
import {Link} from "react-router-dom";
import Weather from "../component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";
class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      weather:[],
      city:'',
      country:'',
      error: false
    };
    this.error=false
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

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  toDetail(i,city,country,_){
    this.props.history.push('/weatherDetail?id='+i+'&city='+city+'&country='+country)
  }

  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    this.setState({country:country});
    this.setState({city:city});
    if (country && city) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=5e77b5f6511456533228a4c91142bfc7`);
      const api_forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=5e77b5f6511456533228a4c91142bfc7`);
      const response = await api_call.json();
      const response_forecast = await api_forecast.json();
      console.log(response)
      console.log(response_forecast)
      let forecast=[]
      for(let i=0,j=0;i<response_forecast.list.length;i++){
        if((i%8)===0){
          let temp=[]
          for(let a=0;a<8;a++){
            temp[a]=response_forecast.list[i+a].main.temp
          }
          temp.sort()
          console.log(temp)
          forecast[j]={
            city: `${response_forecast.city.name}, ${response_forecast.city.country}`,
            country: response_forecast.city.country,
            main: response_forecast.list[i].weather[0].main,
            icon:this.get_WeatherIcon(this.weatherIcon, response_forecast.list[i].weather[0].id),
            celsius: this.calCelsius(response_forecast.list[i].main.temp),
            temp_max: this.calCelsius(temp[7]) ,
            temp_min: this.calCelsius(temp[0]),
            description: response_forecast.list[i].weather[0].description,
            date: response_forecast.list[i].dt_txt.substring(0,10)
          }
          j++
        }
      }
      forecast[0]={
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        icon:this.get_WeatherIcon(this.weatherIcon, response.weather[0].id),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        date: response_forecast.list[0].dt_txt.substring(0,10)
      }
      console.log(forecast)
      this.setState({weather:forecast});
      // seting icons

    } else {
      this.setState({error:true});
    }
  };

  render() {
    let items = []
    for(let i=0;i<this.state.weather.length;i++){
      items.push(
       <div className="card" key={i} onClick={this.toDetail.bind(this,i,this.state.city,this.state.country)}>
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
        <Form loadweather={this.getWeather} error={this.state.error} />
        <div className="card-group">
          {items}
        </div>
      </div>

    );
  }
}

export default Main;
