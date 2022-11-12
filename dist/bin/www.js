#!/usr/bin/env node
'use strict';

/**
 * Dependencies
 */
var _app = _interopRequireDefault(require("../app"));
var _debug = _interopRequireDefault(require("debug"));
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();
(0, _debug.default)('vqingenieria-app-api:server');

/**
 *  Esta función es una protección de seguridad para asegurarse de que el puerto proporcionado sea un número, si no un número, entonces una cadena y, si hay algo más, configúrelo como falso.
 */

const port = normalizePort(process.env.PORT || '3001');
_app.default.set('port', port);

/**
 * Create HTTP server.
 */

const server = _http.default.createServer(_app.default);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  (0, _debug.default)('Listening on ' + bind);
  console.log(`Server running at port ${port}`);
}