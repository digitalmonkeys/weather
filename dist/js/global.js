var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = (function () {
    function Utils() {
    }
    Utils.dateFromTimestamp = function (timeStamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(timeStamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    };
    Utils.getDirectionsFromDegrees = function (degrees) {
        var arrDirections = ["N", "N-E", "E", "S-E", "S", "S-V", "V", "N-V", "N"];
        return arrDirections[Math.round(degrees / 45)];
    };
    return Utils;
}());
var HasCallbacks = (function () {
    function HasCallbacks() {
        var _this = this, _constructor = this.constructor;
        if (!_constructor.__cb__) {
            _constructor.__cb__ = {};
            for (var m in this) {
                var fn = this[m];
                if (typeof fn === 'function' && m.indexOf('cb_') == 0) {
                    _constructor.__cb__[m] = fn;
                }
            }
        }
        for (var m in _constructor.__cb__) {
            (function (m, fn) {
                _this[m] = function () {
                    return fn.apply(_this, Array.prototype.slice.call(arguments));
                };
            })(m, _constructor.__cb__[m]);
        }
    }
    return HasCallbacks;
}());
/// <reference path='../references.ts'/>
/// <reference path='HasCallbacks.ts'/>
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
        this._listeners = [];
    }
    EventDispatcher.prototype.on = function (eventName, handler) {
        this._listeners.push({ eventName: eventName, handler: handler });
    };
    EventDispatcher.prototype.triggerEvent = function (eventName, data) {
        //console.log('triggerEvent() eventName = ' + eventName + ', listeners = ' + this._listeners);
        for (var i = 0; i < this._listeners.length; i++) {
            var crtListener = this._listeners[i];
            if (crtListener.eventName == eventName) {
                if (data != null) {
                    crtListener.handler(data);
                }
                else {
                    crtListener.handler();
                }
            }
        }
    };
    return EventDispatcher;
}(HasCallbacks));
/// <reference path='../references.ts'/>
/// <reference path='../base_classes/EventDispatcher.ts'/>
/// <reference path="../Utils.ts"/>
var WeatherDisplay = (function (_super) {
    __extends(WeatherDisplay, _super);
    function WeatherDisplay() {
        _super.call(this);
    }
    WeatherDisplay.prototype.init = function (data) {
        this._data = data;
        console.log('init()', data);
    };
    WeatherDisplay.prototype.output = function () {
        console.log('this._data = ', this._data);
        var temperature = Math.round(this._data.main.temp - 273.15);
        var windSpeed = Math.round(this._data.wind.speed * 3.6);
        var windDirection;
        if (this._data.wind.deg) {
            windDirection = Utils.getDirectionsFromDegrees(this._data.wind.deg);
        }
        else {
            windDirection = 'Unknown';
        }
        var _output = "\n            <div class=\"weather-widget\">\n                <div class=\"row content\">\n                    <div class=\"col-sm-8\">\n                        <h3 class=\"city-name\"> " + this._data.name + " </h3>\n                        <input type=\"text\" class=\"city-input\">\n                        <i class=\"fa fa-arrow-circle-right fa-2x button-add-city\"></i>\n                        <i class=\"fa fa-close fa-2x button-close-input\"></i>\n                        <i class=\"fa fa-check fa-2x button-submit-input\"></i>\n                        <p class=\"temperature\">" + temperature + " \u00B0 C</p>\n                    </div>\n                    <div class=\"col-sm-4 weather-type\">\n                        <img src=\"graphics/weather_icons/" + this._data.weather[0].icon + ".png\" class=\"weather-icon\">\n                        <p class=\"weather-description\">" + this._data.weather[0].description + "</p>\n                    </div>\n                </div>\n                <div class=\"row bottom-info content\">    \n                    <div class=\"col-sm-5\">\n                        <p class=\"humidity\">Humidity: <b> " + this._data.main.humidity + "% </b> </p>\n                        <p class=\"sunrise\"> Clouds: <b> " + this._data.clouds.all + "% </b></p>\n                        <p class=\"atm-pressure\"> Pressure: <b>" + this._data.main.pressure + " hPa </b></p>\n                    </div>\n                    <div class=\"col-sm-7\">\n                        <p class=\"wind-speed\"> Wind speed: <b>" + windSpeed + " km/h</b> </p>\n                        <p class=\"wind-degrees\"> Wind direction: <b>" + windDirection + " </b></p>\n                     </div>\n                </div>    \n                \n            </div>    \n            ";
        return _output;
    };
    return WeatherDisplay;
}(EventDispatcher));
/// <reference path='../references.ts'/>
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        _super.call(this);
    }
    Model.prototype.getWeather = function (cityName) {
        // TODO: AJAX call to server
        //console.log('getWeather()');
        $.ajax({
            method: "GET",
            url: "?city=" + cityName,
            success: this.cb_onDataReceivedSuccess
        });
    };
    Model.prototype.cb_onDataReceivedSuccess = function (result) {
        this.triggerEvent(DataEvent.DATA_RECEIVED, result);
    };
    return Model;
}(EventDispatcher));
var DataEvent = (function () {
    function DataEvent() {
    }
    DataEvent.DATA_RECEIVED = 'data_received';
    return DataEvent;
}());
/// <reference path='interfaces/IElement.ts'/>
/// <reference path='interfaces/IEvent.ts'/>
/// <reference path='interfaces/IEventable.ts'/>
/// <reference path='interfaces/IPostData.ts'/>
/// <reference path='interfaces/IWeatherData.ts'/>
/// <reference path='views/WeatherDisplay.ts'/>
/// <reference path='definitions/jquery.d.ts'/>
/// <reference path='model/model.ts'/>
/// <reference path='events/DataEvent.ts'/>
/// <reference path='references.ts'/>
/// <reference path='interfaces/IElement.ts'/>
$(document).ready(onPageLoad);
function onPageLoad() {
    // variable declarations
    var model = new Model();
    // custom event listeners
    model.on(DataEvent.DATA_RECEIVED, onDataReceived);
    model.getWeather('Bucharest');
    function onDataReceived(data) {
        var weatherDisplay = new WeatherDisplay();
        weatherDisplay.init(data);
        addToPage(weatherDisplay);
        addEventListeners();
    }
    function onBtnAddCityClick() {
        $('.city-name').css('display', 'none');
        $('.city-input').css('display', 'inline-block');
        $('.city-input').focus();
        $('.button-add-city').css('display', 'none');
        $('.button-close-input').css('display', 'inline-block');
        $('.button-submit-input').css('display', 'inline-block');
    }
    function onCityInputKeyUp(event) {
        console.log('onCityInputKeyUp');
        if (event.which == '13') {
            var inputContent = $('.city-input').val();
            model.getWeather(inputContent);
        }
    }
    function onSubmitInputClick() {
        var inputContent = $('.city-input').val();
        model.getWeather(inputContent);
    }
    function onBtnCloseInputClick() {
        $('.city-input').css('display', 'none');
        $('.button-close-input').css('display', 'none');
        $('.city-name').css('display', 'inline-block');
        $('.button-add-city').css('display', 'inline-block');
        $('.button-submit-input').css('display', 'none');
    }
    function addToPage(element) {
        if ($('.weather-widget').length > 0) {
            TweenMax.to($('.weather-widget .content'), 0.4, { opacity: 0, onComplete: showNewElement });
        }
        else {
            showNewElement();
        }
        function showNewElement() {
            $('.container-fluid').html('');
            $('.container-fluid').append($(element.output()));
            $('.weather-widget .content').css('opacity', '0');
            addEventListeners();
            TweenMax.to($('.weather-widget .content'), 0.4, { opacity: 1 });
        }
    }
    function addEventListeners() {
        $('.button-add-city').click(onBtnAddCityClick);
        $('.city-input').keyup(onCityInputKeyUp);
        $('.city-name').click(onBtnAddCityClick);
        $('.button-close-input').click(onBtnCloseInputClick);
        $('.button-submit-input').click(onSubmitInputClick);
    }
}

//# sourceMappingURL=global.js.map
