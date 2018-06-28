import { createApplication } from './app';

const DEFAULT_PORT = 3000;
let port: number | string;

(function () {
    port = normalizePort(process.env.PORT || DEFAULT_PORT);

    const expressApp = createApplication();
    expressApp.listen(port);

    console.log(`Server listening on port ${port}.`);
})();

function normalizePort(val: number | string): number | string {
    const portVal: number = (typeof val === 'string') ? parseInt(val) : val;

    if (isNaN(portVal) || portVal < 0) {
        return val;
    }
    return portVal;
}
