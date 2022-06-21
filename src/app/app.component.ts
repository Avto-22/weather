import { Component, OnInit } from '@angular/core';
import { Weather, ForecastWeather } from "./app.model"
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather';

  weather:Weather;

  forecastWeatherArray:Array<ForecastWeather>;

  dayCount:number[]=[];
  
  isError:boolean=false;

  constructor(public weatherApiService:WeatherApiService){}


  createArray(){
    let start=3;
    for(let i=0;i<5;i++){
      this.dayCount=[...this.dayCount,start];
      start+=8;
    }
  }

  ngOnInit(){
    document.body.style.background="url(../assets/images/background.jpg)";
    document.body.style.backgroundRepeat="no-repeat";
    document.body.style.backgroundSize="cover";
    document.body.style.backgroundAttachment="fixed";
    this.createArray();
    console.log(this.dayCount)
  }
}
