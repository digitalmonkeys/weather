/// <reference path='../references.ts'/>
/// <reference path='HasCallbacks.ts'/>

class EventDispatcher extends HasCallbacks{
    private _listeners: IEvent[];

    constructor() {
        super();
        this._listeners = [];
    }

    public on(eventName: String, handler: Function):void
    {
        this._listeners.push({eventName: eventName, handler: handler});
    }

    public triggerEvent(eventName: String, data?: Object):void {
        //console.log('triggerEvent() eventName = ' + eventName + ', listeners = ' + this._listeners);
        for(var i:number = 0; i < this._listeners.length; i++)
        {
            var crtListener: IEvent = this._listeners[i];
            if(crtListener.eventName == eventName) {
                if(data != null) {
                    crtListener.handler(data);
                } else {
                    crtListener.handler();
                }
            }
        }
    }
}