import http from 'http';
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from './controllers/moviesController.js';
import { logUncaughtExceptions } from './logger.js';

// * Important! When we import ES module we have to write the full filename. For example moviesController.js
// * If we import like this: moviesController
// * We get an error message with code: 'ERR_MODULE_NOT_FOUND'

//  If you want to import modules with require, but the type in package.json is modul ("type": "module"), you have to rename the file to .cjs!

// * All un handled exceptions will be caught here!
logUncaughtExceptions();

const PORT = process.env.PORT || 5000;
const server = http.createServer((req, resp) => {
  if (req.url === '/api/movies' && req.method === 'GET') {
    getMovies(req, resp);
  } else if (req.url.startsWith('/api/movies') && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getMovie(req, resp, id);
  } else if (req.url === '/api/movies' && req.method === 'POST') {
    createMovie(req, resp);
  } else if (req.url === '/api/movies' && req.method === 'PUT') {
    updateMovie(req, resp);
  } else if (req.url.startsWith('/api/movies') && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteMovie(req, resp, id);
  } else {
    resp.writeHead(404, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ message: 'Not found' }));
  }
});

server.listen(PORT, () => console.log('Server running on port: ' + PORT));
