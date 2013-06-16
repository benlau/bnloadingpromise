var libpath = require('path'),
    http = require("http"),
    fs = require('fs'),
    url = require("url"),
    mime = require('mime');

var path = ".";
var port = 8000;

http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);
    
    libpath.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            
            function reply() {
                response.writeHead(200, {
                    "Content-Type": type
                });
                response.write(file, "binary");
                response.end();
            }
            
            if (type === "image/jpeg") {
                setTimeout(function() {
                    reply();    
                } , 5000 + Math.random() * 5000 ); // Delay 5 to 10s randomly
            } else {
                reply();   
            }
        });
    });
}).listen(port);

console.log("Running server at http://localhost:" + port);
console.log("Demonstration http://localhost:" + port + "/tests/");
