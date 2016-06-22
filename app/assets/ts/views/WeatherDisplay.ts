/// <reference path='../references.ts'/>
/// <reference path='../base_classes/EventDispatcher.ts'/>
/// <reference path="../Utils.ts"/>

class WeatherDisplay extends EventDispatcher implements IElement{
    private _data: IWeatherData;

    constructor() {
        super();


    }

    public init(data: IWeatherData) {
        this._data = data;
        console.log('init()', data);
    }


    public output(): String {
        console.log('this._data = ', this._data);
        var temperature: number =  Math.round(this._data.main.temp - 273.15);
        var windSpeed = Math.round(this._data.wind.speed * 3.6);

        var windDirection: string;
        if(this._data.wind.deg)
        {
            windDirection = Utils.getDirectionsFromDegrees(this._data.wind.deg);
        }
        else
        {
            windDirection = 'Unknown';
        }

        let _output: String =
            `
            <div class="weather-widget">
                <div class="row content">
                    <div class="col-sm-8">
                        <h3 class="city-name"> ${this._data.name} </h3>
                        <input type="text" class="city-input">
                        <i class="fa fa-arrow-circle-right fa-2x button-add-city"></i>
                        <i class="fa fa-close fa-2x button-close-input"></i>
                        <i class="fa fa-check fa-2x button-submit-input"></i>
                        <p class="temperature">${temperature} ° C</p>
                    </div>
                    <div class="col-sm-4 weather-type">
                        <img src="graphics/weather_icons/${this._data.weather[0].icon}.png" class="weather-icon">
                        <p class="weather-description">${this._data.weather[0].description}</p>
                    </div>
                </div>
                <div class="row bottom-info content">    
                    <div class="col-sm-5">
                        <p class="humidity">Humidity: <b> ${this._data.main.humidity}% </b> </p>
                        <p class="sunrise"> Clouds: <b> ${this._data.clouds.all}% </b></p>
                        <p class="atm-pressure"> Pressure: <b>${this._data.main.pressure} hPa </b></p>
                    </div>
                    <div class="col-sm-7">
                        <p class="wind-speed"> Wind speed: <b>${windSpeed} km/h</b> </p>
                        <p class="wind-degrees"> Wind direction: <b>${windDirection} </b></p>
                     </div>
                </div>    
                
            </div>    
            `;

        return _output;
    }
}

