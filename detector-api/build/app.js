"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
class App {
    // use a constructor to configure the application instance
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    // configure a middleware of the Express application
    middleware() {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    // configure endpoints
    routes() {
        const router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello from dog breed detector!',
            });
        });
        this.app.use(router);
    }
}
exports.default = new App().app;
