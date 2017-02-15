`use strict`;

var
    url = require('url'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir:' + root);

var server = http.createServer((request, response) => {

    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);

    fs.stat(filepath, function (err, stats) {
        if (!err) {

            if (stats.isFile()) {
                console.log('200' + request.url);
                success(filepath, response);
            }

            if (stats.isDirectory()) {
                
               var i = 0;
               var state = false;
               var filepath1 = filepath;
               var path_list = ['index.html', 'default.html'];

               for (; i < path_list.length; i++) {
                   filepath1 = path.join(filepath, path_list[i]);
                   if (fs.existsSync(filepath1)) {
                       state = true;
                       console.log('200' + request.url);
                       success(filepath1, response);
                       break;
                   }
               }

               if(!state) {
                   console.log('404' + request.url);
                   fail(response);
               }

            }

        } else {
            console.log('404' + request.url);
            fail(response);
        }
    });

});

function success(filepath, response) {
    response.writeHead(200);
    fs.createReadStream(filepath).pipe(response);
}

function fail(response) {
    response.writeHead(404);
    response.end('404 Not Found');
}
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');