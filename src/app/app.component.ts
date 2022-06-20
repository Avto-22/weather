import { Component, OnInit } from '@angular/core';
import { Weather } from "./app.model"
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather';

  weather:Weather;

  isError:boolean=false;

  constructor(public weatherApiService:WeatherApiService){}

  ngOnInit(){
    document.body.style.background="url(../assets/images/background.jpg)";
    document.body.style.backgroundRepeat="no-repeat";
    document.body.style.backgroundSize="cover";
    document.body.style.backgroundAttachment="fixed";
  }
}
