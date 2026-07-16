const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = process.env.PORT || 5173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const target = path.normalize(path.join(root, urlPath === '/' ? 'index.html' : urlPath));

  if (!target.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(target, (statError, stat) => {
    const file = !statError && stat.isDirectory() ? path.join(target, 'index.html') : target;
    fs.readFile(file, (readError, body) => {
      if (readError) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(body);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`MaumTalk_MVP local server: http://127.0.0.1:${port}`);
});
