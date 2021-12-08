import fs from 'fs';
import http from 'http';
import fetch from 'node-fetch';
import colors from 'colors';

const port = 5000;

const server = http.createServer(function (req, res) {
  if (req.url === '/api/non-blocking') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello, Non-blocking!' }));
  } else if (req.url === '/api/blocking') {
    // ================================= MAIN THREAD =================================================

    // Networking operations always use the main thread, except the DNS.
    console.log('I can process your request!');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello, Blocking!' }));
    // Simulate heavy computing...
    while (true);

    // ================================= MAIN THREAD =================================================
  } else if (req.url === '/api/non-blocking-readFile') {
    // ================================= THREAD POOL =================================================

    // Asynchronous file reading
    fs.readFile('10mb.txt', 'utf-8', (_, data) =>
      console.log(colors.red('[ 10mb FILE READED! ]'))
    );
    fs.readFile('example-file.txt', 'utf-8', (_, data) =>
      console.log(colors.yellow(`[ ${data} ]`))
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'File started to read!' }));
    console.log(colors.green('[ RESPONSE SENT ]'));

    // ================================= THREAD POOL =================================================
  } else if (req.url === '/api/blocking-readFile') {
    // ================================= THREAD POOL, BUT BLOCKING =================================================

    // Synchronus file reading blocking the thread!
    fs.readFileSync('10mb.txt');
    console.log(colors.red('[ 10mb FILE READED! ]'));
    const data = fs.readFileSync('example-file.txt', { encoding: 'utf8' });
    console.log(colors.yellow(`[ ${data} ]`));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'File started to read!' }));
    console.log(colors.green('[ RESPONSE SENT ]'));

    // ================================= THREAD POOL, BUT BLOCKING =================================================
  } else if (req.url === '/api/dns-networking') {
    // ================================= THREAD POOL, BUT NETWORKING =================================================

    // Networking operations always use the main thread, except the DNS.
    fetch('https://telex.hu').then(() =>
      console.log(colors.yellow(`[ Telex.hu is successfully fetched! ]`))
    );
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'DNS processing' }));
    console.log(colors.green('[ RESPONSE SENT ]'));

    // ================================= THREAD POOL, BUT NETWORKING =================================================
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(port, function (err) {
  if (err) {
    console.error('Error on listening', err);
  } else {
    console.log('listening on port ' + port);
  }
});

// If you want to increase thread pool default size (4):
// If you doing, for example compression or encryption a lot it is useful to increase the thread pool size, otherwise is not recommended!
// process.env.UV_THREADPOOL_SIZE = 10;

// Testing api server:
// curl -UseBasicParsing http://localhost:5000/api/{endpoint}
