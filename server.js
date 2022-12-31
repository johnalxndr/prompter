const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/prompter.css') {
      fs.readFile('prompter.css', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('File not found');
          return;
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      });
    } else if (req.url === '/prompter.js') {
      fs.readFile('prompter.js', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('File not found');
          return;
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      });
    } else {
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('An error occurred');
          return;
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      });
    }
  });
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
