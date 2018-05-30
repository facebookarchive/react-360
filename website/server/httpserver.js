//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var process = require('process');
process.chdir('build/');

var baseDirectory = '.';
//Lets define a port we want to listen to
const PORT=8085;

//We need a function which handles requests and send response
function handleRequest(request, response){
  try {
     var requestUrl = url.parse(request.url).pathname;
     console.log(requestUrl);

     // apend index.html if required
     if (requestUrl.substr(-1) === '/') {
      requestUrl += 'index.html';
     }

     // need to use path.normalize so people can't access directories underneath baseDirectory
     var fsPath = baseDirectory+path.normalize(requestUrl);

     response.writeHead(200);
     var fileStream = fs.createReadStream(fsPath);
     fileStream.pipe(response);
     fileStream.on('error',function(e) {
         response.writeHead(404);
         response.end();
     })
   } catch(e) {
     response.writeHead(500);
     response.end();
     console.log(e.stack)
   }
 }

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s/react-vr/", PORT);
});
