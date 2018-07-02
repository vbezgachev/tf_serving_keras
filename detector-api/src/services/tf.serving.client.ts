/**
 * Tensorflow Serving client interface and a real implementation
 */
import * as config from 'config';
import * as grpc from 'grpc';
import { injectable } from 'inversify';
import { IndexToBreedMap, UNKNOWN_BREED } from './index.to.breed.map';

/**
 * Serving client interface
 */
export interface TfServingClient {
    // tslint:disable-next-line:no-any
    predictDogBreed(imageData: any): Promise<string>;
}

/**
 * Serving client implementation. We loads protobufs dynamically using grpc library
 */
@injectable()
export class TfServingClientImpl implements TfServingClient {
    private readonly PROTO_PATH = __dirname + '/../protos/prediction_service.proto';
    // tslint:disable-next-line:no-any
    private tfServing: any;
    private tfServerUrl: string;
    private modelName: string;
    private signatureName: string;
    // tslint:disable-next-line:no-any
    private client: any;

    constructor() {
        console.log('Constructing Tensorflow Seving Client');

        // read the configuration
        this.modelName = config.get<string>('model.name');
        this.signatureName = config.get<string>('model.signature_name');
        this.tfServerUrl = config.get<string>('tf_serving.host') + ':' +
                           config.get<number>('tf_serving.port').toString();

        // load protobufs and create prediction service instance
        this.tfServing = grpc.load(this.PROTO_PATH).tensorflow.serving;
        this.client = new this.tfServing.PredictionService(
            this.tfServerUrl, grpc.credentials.createInsecure());
    }

    // For breed prediction we create a request object and issue the request against a server
    // tslint:disable-next-line:no-any
    public async predictDogBreed(imageData: any): Promise<string> {
        // create image buffer for prediction - it must be an array of images
        // tslint:disable-next-line:no-any
        const buffer = new Array<any>(imageData);

        // build protobuf for predict request
        const predictRequest = this.buildPredictRequest(buffer);

        // issue a request
        // tslint:disable-next-line:no-any
        const predictResult: Promise<any> = new Promise<any>((resolve, reject) => {
            this.client.predict(predictRequest, (error, response) => {
                if (error) {
                    console.log(`Error occurred: ${error}`);
                    reject(error);
                } else {
                    const res = response.outputs.sequential_1.float_val;
                    const maxProb = Math.max(...res);
                    console.log(`Max probability: ${maxProb}`);

                    const indexOfMaxProb = res.indexOf(maxProb);
                    console.log(`Index of max probability: ${indexOfMaxProb}`);

                    if (indexOfMaxProb in IndexToBreedMap) {
                        console.log(`Detected breed: ${IndexToBreedMap[indexOfMaxProb]}`);
                        resolve(IndexToBreedMap[indexOfMaxProb]);
                    } else {
                        console.log('Unknown dog breed detected!');
                        resolve(UNKNOWN_BREED);
                    }
                }
            });
        });

        return predictResult;
    }

    // Create a protobuf for Tensorflow Serving predict request
    // tslint:disable-next-line:no-any
    private buildPredictRequest(buffer: Array<any>): Object {
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
