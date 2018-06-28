import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as logger from 'morgan';

import './api/detector.controller';
import { TfServingClient } from './services/tf.serving.client';
import { default as TYPES } from './types';

export function createApplication(): express.Application {
    const applicationBuilder = new ApplicationBuilder();

    return applicationBuilder.build();
}

class ApplicationBuilder {
    public build(): express.Application {
        const inversifyContainer = this.createInversifyContainer();
        const server = new InversifyExpressServer(inversifyContainer);

        server.setConfig((app: express.Application) => {
            this.middleware(app);
        });

        return server.build();
    }

    // configure a middleware of the Express application
    private middleware(app: express.Application): void {
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    // create container for dependency injection
    private createInversifyContainer(): Container {
        const container = new Container();

        container.bind<TfServingClient>(TYPES.TfServingClient).toConstantValue(new TfServingClient());

        return container;
    }
}
