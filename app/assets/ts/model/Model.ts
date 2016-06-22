/// <reference path='../references.ts'/>
class Model extends EventDispatcher{


    constructor() {
        super();

    }

    public getWeather(cityName) {
        // TODO: AJAX call to server
        //console.log('getWeather()');
        $.ajax({
            method: "GET",
            url: "?city=" + cityName,
            success: this.cb_onDataReceivedSuccess
        });
    }

    private cb_onDataReceivedSuccess(result: Object) {
        this.triggerEvent(DataEvent.DATA_RECEIVED, result);

    }
}
