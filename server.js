const http = require('http');
const url = require('url');
const fs = require('fs');

// request handler: called every time an HTTP request is made against that server
http
  .createServer(function(request, response) {
    var addr = request.url;
    var q = url.parse(addr, true);
    var filePath = '';

    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = 'index.html';
    }

    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });

    fs.appendFile(
      'log.txt',
      'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('request URL and timestamp added to log file');
        }
      }
    );
  })
  .listen(8080);

console.log('My first Node test server is running on port 8080.');
