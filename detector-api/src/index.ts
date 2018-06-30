import * as config from 'config';

import { createApplication } from './app';
import { TfServingClientImpl } from './services/tf.serving.client';

(function () {
    const port: number = config.get<number>('service.port');
    const expressApp = createApplication(new TfServingClientImpl());

    expressApp.listen(port);

    console.log(`Server listening on port ${port}.`);
})();
