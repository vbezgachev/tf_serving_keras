import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

class App {
    public app: express.Application;

    // use a constructor to configure the application instance
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    // configure a middleware of the Express application
    private middleware(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // configure endpoints
    private routes(): void {
        const router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello from dog breed detector!',
            });
        });

        this.app.use(router);
    }
}

export default new App().app;
