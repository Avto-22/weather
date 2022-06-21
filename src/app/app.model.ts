export interface Weather {
  temp: number;
  temp_max: number;
  temp_min: number;
  feels_like: number;
  speed: number;
  description: string;
  icon: string;
  name: string;
}

export interface WeatherApi {
  main: {
    temp: number,
    temp_max: number,
    temp_min: number,
    feels_like: number
  };
  wind: {
    speed: number
  };
  weather: [{ description: string, icon: string }];
  name: string;
}

type ListType=Array<Omit<WeatherApi, 'name'> & {
  main: {
    temp: number,
    temp_max: number,
    temp_min: number,
    feels_like: number,
    humidity: number
  },
  dt_txt: string
}>;

export type ForecastWeatherApi = {
  list: ListType
};

export type ForecastWeather = Omit<Weather, 'name'> & {
   dateForDisplay: string | undefined, 
   humidity: number,
   date:string
  };

export interface DaysObj{
  index:number;
  day:string;
}
