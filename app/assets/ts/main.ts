/// <reference path='references.ts'/>
/// <reference path='interfaces/IElement.ts'/>


$(document).ready(onPageLoad);
function onPageLoad() {

    // variable declarations
    var model: Model = new Model();
    

    // custom event listeners
    model.on(DataEvent.DATA_RECEIVED, onDataReceived);
    model.getWeather('Bucharest');


    function onDataReceived(data: IWeatherData):void {
        var weatherDisplay = new WeatherDisplay();
        weatherDisplay.init(data);
        addToPage(weatherDisplay);
        addEventListeners();
    }

    function onBtnAddCityClick():void {
        $('.city-name').css('display', 'none');
        $('.city-input').css('display', 'inline-block');
        $('.city-input').focus();
        $('.button-add-city').css('display', 'none');
        $('.button-close-input').css('display', 'inline-block');
        $('.button-submit-input').css('display', 'inline-block');
    }

    function onCityInputKeyUp(event: IKeyboardEvent):void {
        console.log('onCityInputKeyUp');
        if(event.which == '13') {
            var inputContent: string = $('.city-input').val();
            model.getWeather(inputContent);
        }
    }

    function onSubmitInputClick() {
        var inputContent: string = $('.city-input').val();
        model.getWeather(inputContent);
    }

    function onBtnCloseInputClick():void {
        $('.city-input').css('display', 'none');
        $('.button-close-input').css('display', 'none');
        $('.city-name').css('display', 'inline-block');
        $('.button-add-city').css('display', 'inline-block');
        $('.button-submit-input').css('display', 'none');
    }
    
    function addToPage(element: IElement):void {
        if($('.weather-widget').length > 0)
        {
            TweenMax.to($('.weather-widget .content'), 0.4, {opacity: 0, onComplete: showNewElement});
        }
        else
        {
            showNewElement();
        }

        function showNewElement():void {
            $('.container-fluid').html('');
            $('.container-fluid').append($(element.output()));
            $('.weather-widget .content').css('opacity', '0');
            addEventListeners();
            TweenMax.to($('.weather-widget .content'), 0.4, {opacity: 1});
        }
    }

    function addEventListeners():void {
        $('.button-add-city').click(onBtnAddCityClick);
        $('.city-input').keyup(onCityInputKeyUp);
        $('.city-name').click(onBtnAddCityClick);
        $('.button-close-input').click(onBtnCloseInputClick);
        $('.button-submit-input').click(onSubmitInputClick);
    }
}
