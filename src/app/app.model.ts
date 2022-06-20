export interface Weather{
    temp:number;
    temp_max:number;
    temp_min:number;
    feels_like:number;
    speed:number;
    description:string;
    icon:string;
    name:string;
  }
  
export interface WeatherApi{
    main:{
      temp:number,
      temp_max:number,
      temp_min:number,
      feels_like:number,
    };
    wind:{
      speed:number
    };
    weather:[{description:string,icon:string}];
    name:string;
  }
  