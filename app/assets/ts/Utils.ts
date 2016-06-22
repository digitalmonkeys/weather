class Utils {
    public static dateFromTimestamp(timeStamp: number):string
    {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(timeStamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
    }

    public static getDirectionsFromDegrees(degrees: number):string
    {
        var arrDirections = ["N", "N-E", "E", "S-E", "S", "S-V", "V", "N-V", "N"];

        return arrDirections[Math.round(degrees / 45)];

    }
}