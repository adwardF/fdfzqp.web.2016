var http = require('http');
var fs = require('fs');
var events = require('events');
var url = require('url');

data_dic = './data';

is_existsSync = (filename) => 
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

index_d = (info,res,postd) =>
{
    res.writeHeader(200);
    data = fs.readFileSync(data_dic + '/index.html');
    res.end(data);
}

table_d = (info,res,postd) =>
{
    res.writeHeader(200,{'Content-Type' : 'text/plain'});
    res.end(postd);
}

handler = {'/' : index_d,
           '/table' : table_d};

handle = (info,response,postdata) =>
{
    console.log('s');
    if(handler[info.pathname] == null)
    {
        response.writeHeader(404,{});
        response.end("No such page");
        return;
    }
    handler[info.pathname](info,response,postdata);
};

http.createServer(function (request, response) 
{
    req_info = url.parse(request.url,true);
    console.log(req_info.pathname);
    fs.readFile(data_dic + req_info.pathname,
    (err,data) =>
    {
    if(err)
    {
        postdata = '';
        request.on('data',(chunk) => {postdata += chunk});
        request.on('end',
            () => {handle(req_info,response,postdata)});
    }
    else
        response.end(data);
    })
}).listen(80);
