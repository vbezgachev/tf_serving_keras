/**
 * Mock of the Tensorflow Serving client
 */
import { TfServingClient } from './tf.serving.client';

export class TfServingClientMock implements TfServingClient {
    // tslint:disable-next-line:no-any
    public async predictDogBreed(imageData: any): Promise<string> {
        return Promise.resolve('Mock Breed');
    }
}
