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

export interface ForecastListWeather{
  main: {
    temp: number,
    temp_max: number,
    temp_min: number,
    feels_like: number,
    humidity: number
  },
  dt_txt: string
};

export type ForecastWeather = Omit<Weather, 'name'> & { date: string | undefined, humidity: number };

export interface DaysObj{
  index:number;
  day:string;
}
