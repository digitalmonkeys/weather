interface IWeatherData {
    main: IWeatherDataMain;
    sys: IWeatherDataSys;
    weather: IWeatherDataWeather;
    wind: IWeatherDataWind;
    name: string;
    clouds: IWeatherDataClouds;
}

interface IWeatherDataMain {
    humidity: number;
    pressure: number;
    temp: number;
}

interface IWeatherDataSys {
    sunrise: number;
    sunset: number;
}

interface IWeatherDataWeather {
    [index: number]: IWeatherDataWeatherObjectElement;
}

interface IWeatherDataWeatherObjectElement {
    description : string;
    icon: string;
}

interface IWeatherDataWind {
    deg: number;
    speed: number;
}

interface IWeatherDataClouds {
    all: string;
}
