import { environment } from '../../environments/environment';

export class DetectorServiceClient {

    constructor() {
    }

    public async predictDogBreed(imageData: string): Promise<string> {
        return Promise.resolve('TODO');
    }
}
