var http = require('http');
var fs = require('fs');
var events = require('events');

is_exists = (filename) => 
{
    try
    {
        fs.accessSync(filename,fs.R_OK);
    }
    catch(err)
    {
        return false;
    }
    return true;
}

var eventEmitter = new events.EventEmitter();

http.createServer(function (request, response) 
{
    if(is_exists('data' + request.url))
    {
        fs.readFile('data' + request.url,(err,data) => 
            {response.writeHeader(200);
             response.end(data)});
    }
    else 
    {
        response.writeHeader(404);
        response.end('23333');
    }
}).listen(8888);
