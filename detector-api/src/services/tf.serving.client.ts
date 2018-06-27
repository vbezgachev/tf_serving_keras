import * as config from 'config';
import * as grpc from 'grpc';

export class TfServingClient {
    private readonly PROTO_PATH = __dirname + '/src/protos/prediction_service.proto';
    // tslint:disable-next-line:no-any
    private tfServing: any = grpc.load(this.PROTO_PATH).tensorflow.serving;
    private tfServerUrl: string;
    private modelName: string;
    private signatureName: string;
    // tslint:disable-next-line:no-any
    private client: any;

    constructor() {
        this.modelName = config.get<string>('model.name');
        this.signatureName = config.get<string>('model.signature_name');
        this.tfServerUrl = config.get<string>('tf_serving.host') + ':' +
                           config.get<number>('tf_serving.port').toString();
        this.client = new this.tfServing.PredictionService(
            this.tfServerUrl, grpc.credentials.createInsecure());
    }

    public async predictDogBreed(imageData: string): Promise<string> {
        // create image buffer for prediction - it must be an array of images
        const buffer = new Array<string>(imageData);

        // build protobuf for predict request
        const predictRequest = this.buildPredictRequest(buffer);

        // issue a request
        const predictResult: Promise<string> = new Promise<string>((resolve, reject) => {
            this.client.predict(predictRequest, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(response);
                    resolve('Dog breed detected');
                }
            });
        });

        return predictResult;
    }

    private buildPredictRequest(buffer: Array<string>): Object {
        const request = {
            model_spec: {
                name: this.modelName,
                signature_name: this.signatureName,
            },
            inputs: {
                examples: {
                    dtype: 'DT_STRING',
                    tensor_shape: {
                        dim: {
                            size: buffer.length,
                        },
                    },
                    string_val: buffer,
                },
            },
        };
        return request;
    }
}
