import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherApi } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

constructor(
  private http:HttpClient
) { }

getWeatherByCityName(city:string,app:AppComponent){
  if(!city){
    return;
  }
  app.isError=false;
  this.http.get<WeatherApi>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16de2c32b4553f6a506236872387a2c7`).pipe(
    catchError(error=>{
      app.isError=true;
      return of(error);
    })
  ).subscribe(data=>{
    if(!app.isError){
      let {temp,temp_max,temp_min,feels_like}= data?.main;
      let {speed}=data?.wind;
      let {description,icon}=data?.weather[0];

      app.weather={
        temp:Math.floor(temp-273.15),
        temp_max:Math.floor(temp_max-273.15),
        temp_min:Math.floor(temp_min-273.15),
        feels_like:Math.floor(feels_like-273.15),
        speed:Math.floor(speed*3.6),
        description,
        icon:`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`,
        name:data?.name
      };
    }
  });
}

}
