/**
 * Entry point:
 * - create Tensorflow Serving client instance
 * - initialiye NodeJS express application
 */

import * as config from 'config';

import { createApplication } from './app';
import { TfServingClientImpl } from './services/tf.serving.client';
import { TfServingClientMock } from './services/tf.serving.client.mock';

(function () {
    // create a real or mock Tensorflow Serving client depending on the settings
    const mockTfServingClient: boolean = config.get<boolean>('mock.tf_serving_client');
    const tfServingClient = (mockTfServingClient ? new TfServingClientMock() : new TfServingClientImpl());

    console.log(`Use mocked serving client: ${mockTfServingClient}`);

    // initialize express application
    const port: number = config.get<number>('service.port');
    const expressApp = createApplication(tfServingClient);
    expressApp.listen(port);

    console.log(`Server listening on port ${port}.`);
})();
