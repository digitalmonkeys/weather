var http = require('http');
var fs = require('fs');
var request = require('request');

var appID = '0e191e2248b94fd1f9c027fa77911a9c';

exports.getWeatherForCity = function(cityName, mainResponse) {

    // Query the entry
    //var stats = fs.lstatSync('data/' + cityName + '.json');
    var testData = '{"coord":{"lon":26.11,"lat":44.43},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"cmc stations","main":{"temp":304.12,"pressure":1015,"humidity":54,"temp_min":303.15,"temp_max":305.93},"wind":{"speed":4.66,"deg":104.501},"clouds":{"all":56},"dt":1466344152,"sys":{"type":3,"id":68591,"message":0.003,"country":"RO","sunrise":1466303451,"sunset":1466359405},"id":683506,"name":"Bucharest","cod":200}';


    var filePath = __dirname + '/data/' + cityName.split(' ').join('_') + '.json';
    fs.stat(filePath, function(err, stats) {
        if(err) {
            console.log('file "' + filePath+ '" doesn\'t exist');
            getCityWeatherFromServer(cityName, mainResponse);
        }
        else
        {
            if(stats.isFile()) {
                var now = new Date();
                console.log(stats.mtime);
                console.log(now);
                var difference = (stats.mtime.getTime() - now.getTime()) / 1000;
                console.log('time difference = ' + difference);
                if(Math.abs(difference) < 60)
                {
                    console.log('file is good');
                    fs.readFile(filePath, function(err, data) {
                        if (err) {
                            mainResponse.end('We are sorry, there was an error.');
                            throw err;
                        }
                        else {
                            mainResponse.write(data.toString());
                            mainResponse.end();
                            console.log('the contents of ' + filePath + ' are: ' + data.toString());
                        }
                    });
                }
                else
                {
                    getCityWeatherFromServer(cityName, mainResponse);
                }

                //console.log(filePath + ' exists, stats: ', stats);
                //var fileContents = fs.readFileSync(filePath, 'utf8');
                //mainResponse.write(fileContents);
                //mainResponse.end();




                //var file = fs.readFileSync(__dirname + '/data/' + cityName).toString();
                //mainResponse.write(result);
                //mainResponse.end();
            }
        }
    });

    //mainResponse.write('{"coord":{"lon":26.11,"lat":44.43},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"cmc stations","main":{"temp":304.12,"pressure":1015,"humidity":54,"temp_min":303.15,"temp_max":305.93},"wind":{"speed":4.66,"deg":104.501},"clouds":{"all":56},"dt":1466344152,"sys":{"type":3,"id":68591,"message":0.003,"country":"RO","sunrise":1466303451,"sunset":1466359405},"id":683506,"name":"Bucharest","cod":200}');
    //mainResponse.end();
};

function getCityWeatherFromServer(cityName, mainResponse) {
    request('http://api.openweathermap.org/data/2.5/weather?q='+ cityName+'&appid=0e191e2248b94fd1f9c027fa77911a9c', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
            var filePath = __dirname + '/data/' + cityName + '.json';
            fs.writeFile(filePath, body, function(err)  {
                if (err) {
                    console.log('file couldn\'t be written at: ' + filePath);
                    throw err;
                } else {
                    console.log('file written at: ' + filePath);
                    mainResponse.write(body);
                    mainResponse.end();
                    console.log('response sent');
                }

            });

            //mainResponse.write(body);
            //mainResponse.end();
        }
    })
}

/*
function getCityWeatherFromServer(cityName, mainResponse) {
    console.log('getCityWeatherFromServer() cityName = ' + cityName);
    var options = {
        host: 'api.openweathermap.org',
        //path: '/data/2.5/weather?q=' + cityName + '&appid=' + appID
        path: '/data/2.5/weather?q=Bucharest,ro&appid=0e191e2248b94fd1f9c027fa77911a9c'
    };

    callback = function (response) {
        var result = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            console.log('chunk = ' + chunk);
            result += chunk;
        });

        //the whole response has been receieved, so we just print it out here

        response.on('end', function () {
            //fs.writeFileSync('/data/' + cityName + '.json', result);
            var filePath = __dirname + '/data/' + cityName + '.json';
            fs.writeFile(filePath, testData, function(err)  {
                if (err) {
                    console.log('file couldn\'t be written at: ' + filePath);
                    throw err;
                } else {
                    console.log('file written at: ' + filePath);
                    mainResponse.write(result);
                    mainResponse.end();
                    console.log('response sent');
                }

            });
        });

        mainResponse.write(result);
        mainResponse.end();
        http.request(options, callback).end();
    }
}
*/



