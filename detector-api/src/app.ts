/**
 * NodeJS express application builder
 */

import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as logger from 'morgan';

import './api/detector.controller';
import { TfServingClient } from './services/tf.serving.client';
import { default as TYPES } from './types';

/**
 * Exported function to create express application
 * @param tfServingClient Tensorflow Serving client instance
 */
export function createApplication(tfServingClient: TfServingClient): express.Application {
    const applicationBuilder = new ApplicationBuilder();

    return applicationBuilder.build(tfServingClient);
}

/**
 * Application builder is responsible for creation of the inversify express server
 * that provides and maintains dependency injection capabilities and the concept of
 * controllers for REST API implementation
 */
class ApplicationBuilder {
    // Create NodeJS express aplication instance
    public build(tfServingClient: TfServingClient): express.Application {
        const inversifyContainer = this.createInversifyContainer(tfServingClient);
        const server = new InversifyExpressServer(inversifyContainer);

        server.setConfig((app: express.Application) => {
            this.middleware(app);
        });

        return server.build();
    }

    // Configure a middleware of the express application
    private middleware(app: express.Application): void {
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    // Create container for dependency injection
    private createInversifyContainer(tfServingClient: TfServingClient): Container {
        const container = new Container();

        container.bind<TfServingClient>(TYPES.TfServingClient).toConstantValue(tfServingClient);

        return container;
    }
}
