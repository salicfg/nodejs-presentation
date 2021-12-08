import logger from './logger.js';

export function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Response {
  static ok(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
  static created(res, data) {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(data));
  }
  static updated(res, data) {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(data));
  }
  static deleted(res, message) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message }));
  }
  static notFound(res, message) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
    logger.warn(message);
  }
  static internalError(res, error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error', error }));
    logger.error(error.message);
  }
}
