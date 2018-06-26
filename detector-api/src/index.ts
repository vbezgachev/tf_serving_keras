import * as http from 'http';

import app from './app';

const DEFAULT_PORT = 3000;
const port: number | string = normalizePort(process.env.PORT || DEFAULT_PORT);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string {
    const portVal: number = (typeof val === 'string') ? parseInt(val) : val;

    if (isNaN(portVal) || portVal < 0) {
        return val;
    }
    return portVal;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;

        default:
            throw error;
    }
}

function onListening(): void {
    const address = server.address();
    const bind = (typeof address === 'string') ? `pipe ${address}` : `${address.address}:${address.port}`;
    console.log(`Listening on ${bind}`);
}
