var http=require("http");
http.createServer(onRequest).listen(8080);
console.log("Server is up and running");

function onRequest(request, response){
    console.log("Server - onRequest");
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hello world");
    response.end();
}