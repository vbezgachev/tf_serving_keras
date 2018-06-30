import { TfServingClient } from '../src/services/tf.serving.client';

export class TfServingClientMock implements TfServingClient {
    // tslint:disable-next-line:no-any
    public async predictDogBreed(imageData: any): Promise<string> {
        return Promise.resolve('MockBreed');
    }
}
