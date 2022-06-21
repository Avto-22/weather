import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ForecastWeatherApi, ForecastWeather, ForecastListWeather, DaysObj, WeatherApi } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  daysArray: Array<DaysObj> = [
    {
      index: 0,
      day: 'Sunday'
    },
    {
      index: 1,
      day: 'Monday'
    },
    {
      index: 2,
      day: 'Tuesday'
    },
    {
      index: 3,
      day: 'Wednesday'
    },
    {
      index: 4,
      day: 'Thursday'
    },
    {
      index: 5,
      day: 'Friday'
    },
    {
      index: 6,
      day: 'Saturday'
    }
  ];

  constructor(
    private http: HttpClient
  ) { }

  getWeatherByCityName(city: string, app: AppComponent) {
    if (!city) {
      return;
    }
    //-------------------------------- პირველ api-ზე მუშაობა
    app.isError = false;
    forkJoin([this.http.get<WeatherApi>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16de2c32b4553f6a506236872387a2c7`), this.http.get<ForecastWeatherApi>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=16de2c32b4553f6a506236872387a2c7`)]).subscribe(data => {
      let { temp, temp_max, temp_min, feels_like } = data[0].main;
      let { speed } = data[0].wind;
      let { description, icon } = data[0].weather[0];

      app.weather = {
        temp: Math.floor(temp - 273.15),
        temp_max: Math.floor(temp_max - 273.15),
        temp_min: Math.floor(temp_min - 273.15),
        feels_like: Math.floor(feels_like - 273.15),
        speed: Math.floor(speed * 3.6),
        description,
        icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`,
        name: data[0].name
      };
      //--------------------------------------- მეორე api-ზე მუშაობა
      app.forecastWeatherArray = data[1].list.map<ForecastWeather>(item => {
        return {
          temp: Math.floor(item.main.temp - 273.15),
          temp_max: Math.floor(item.main.temp_max - 273.15),
          temp_min: Math.floor(item.main.temp_min - 273.15),
          feels_like: Math.floor(item.main.feels_like - 273.15),
          speed: Math.floor(item.wind.speed * 3.6),
          description: item.weather[0].description,
          icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${item.weather[0].icon}.svg`,
          date: this.daysArray.find(element => element.index == (new Date(item.dt_txt.split(' ')[0]).getDay()))?.day,
          humidity: item.main.humidity
        }
      });
    },
      (error) => {
        app.isError = true;
      }
    );
  }
}

