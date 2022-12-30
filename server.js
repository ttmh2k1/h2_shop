const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const port = 3000;
const development = process.env.NODE_ENV !== 'production';
const app = next({ dev: development });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (request, res) => {
    const parsedUrl = parse(request.url, true);
    handle(request, res, parsedUrl);
  }).listen(port, (error) => {
    if (error) throw error;
    // console.log('ready - started server on url: https://localhost:' + port);
  });
});
