const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname,req.url === '/' ? 'index.html' : req.url)   

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'text/png',
  }

  const contentType = mimeTypes[extName] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 File Not Found</h1>');
        }
    }else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  })
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});