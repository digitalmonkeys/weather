console.log('server is running');

var fs = require('fs');
var url = require('url');
var communicator = require('./communicator');

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT = 3000;
//const IP = '127.0.0.1';
const IP = '192.168.2.102';

//We need a function which handles requests and send response
function handleRequest(request, response){
    var file;
    if(request.url == '/')
    {
        response.setHeader('content-type', 'text/html');
        file = fs.readFileSync('dist/index.html').toString();
        response.write(file);
        response.end();
    }
    else if(request.url.indexOf('.css') != -1)
    {
        response.setHeader('content-type', 'text/css');
        file = fs.readFileSync('dist' + request.url).toString();
        response.write(file);
        response.end();
    }
    else if(request.url.indexOf('.js') != -1)
    {
        response.setHeader('content-type', 'application/javascript');
        file = fs.readFileSync('dist' + request.url).toString();
        response.write(file);
        response.end();
    }
    else if(request.url.indexOf('.png') != -1) {
        response.setHeader('content-type', 'image/png');
        console.log('requested png file, url = ' + request.url.toString());
        file = fs.readFileSync('dist' + request.url.toString());
        response.write(file);
        response.end();
    }
    else if(request.url.indexOf('.jpg') != -1)
    {
        response.setHeader('content-type', 'image/jpg');
        console.log('requested jpg file, url = ' + request.url.toString());
        file = fs.readFileSync('dist' + request.url.toString());
        response.write(file);
        response.end();
    }

    else if(request.url.indexOf('city') != -1)
    {
        response.setHeader('content-type', 'application/json');
        var parsedURL = url.parse(request.url, true, true);
        var cityName = parsedURL.query.city;
        communicator.getWeatherForCity(cityName, response);

        //response.write('{"coord":{"lon":26.11,"lat":44.43},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"cmc stations","main":{"temp":304.12,"pressure":1015,"humidity":54,"temp_min":303.15,"temp_max":305.93},"wind":{"speed":4.66,"deg":104.501},"clouds":{"all":56},"dt":1466344152,"sys":{"type":3,"id":68591,"message":0.003,"country":"RO","sunrise":1466303451,"sunset":1466359405},"id":683506,"name":"Bucharest","cod":200}');
    }

}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, IP, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
