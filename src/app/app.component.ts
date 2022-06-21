import { Component, ElementRef, OnInit } from '@angular/core';
import { Weather, ForecastWeather } from "./app.model"
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';

  weather: Weather;

  forecastWeatherArray: Array<ForecastWeather | undefined>;

  hoursArray: string[] = [
    '00:00',
    '03:00',
    '06:00',
    '09:00',
    '12:00',
    '15:00',
    '18:00',
    '21:00',
  ]

  dayCount: number[] = [];

  isError: boolean = false;

  isTimeChanged: boolean = false;

  constructor(public weatherApiService: WeatherApiService) { }

  ngOnInit() {
    document.body.style.background = "url(../assets/images/background.jpg)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    this.createArray();
  }

  createArray() {
    let start = 3;
    for (let i = 0; i < 5; i++) {
      this.dayCount = [...this.dayCount, start];
      start += 8;
    }
  }

  changeDayTime(date: string | undefined, dayCountIndex: number, hour: string) {
    this.isTimeChanged = true;
    date = date?.split(' ')[0] + ' ' + hour + ':00';
    let newTime = this.forecastWeatherArray?.find(data => data?.date == date);
    if (newTime) {
      this.dayCount[dayCountIndex] = this.forecastWeatherArray.indexOf(newTime);
      return;
    }
  }
}
