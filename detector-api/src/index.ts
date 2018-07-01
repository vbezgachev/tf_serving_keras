import * as config from 'config';

import { createApplication } from './app';
import { TfServingClientImpl } from './services/tf.serving.client';
import { TfServingClientMock } from './services/tf.serving.client.mock';

(function () {
    const mockTfServingClient: boolean = config.get<boolean>('mock.tf_serving_client');
    const tfServingClient = (mockTfServingClient ? new TfServingClientMock() : new TfServingClientImpl());

    console.log(`Use mocked serving client: ${mockTfServingClient}`);

    const port: number = config.get<number>('service.port');
    const expressApp = createApplication(tfServingClient);
    expressApp.listen(port);

    console.log(`Server listening on port ${port}.`);
})();
