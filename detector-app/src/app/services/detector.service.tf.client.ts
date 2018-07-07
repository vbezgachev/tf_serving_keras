/**
 * Detector service client issues requests to the detector service via REST interface
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import * as utils from '../utils';
import { DetectorServiceClient } from './detector.service.client';
import { IndexToBreedMap } from './index.to.breed.map';

/**
 * Implements detector service client interface - sends REST requests directly to
 * TensorFlow server
 */
@Injectable()
export class DetectorServiceTfClient implements DetectorServiceClient {
    private baseApiUrl =
        `http://${environment.corsAnywhereHost}:${environment.corsAnywherePort}/` +
        `${environment.tfServingHost}:${environment.tfServingPort}${environment.tfServingBasePath}`;

    constructor(private http: HttpClient) {
    }

    public async predictDogBreed(imageFile: File, imageData: string): Promise<string> {
        const url = this.baseApiUrl + `/${environment.modelName}:predict`;

        console.log(`Will call TF Serving at ${url}`);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const requestObject = {
            signature_name: environment.signature_name,
            instances: [
                {
                    b64: imageData,
                }
            ]
        };

        try {
            const data = await this.http.post(url, requestObject, { headers: headers }).toPromise();

            const res = data['predictions'][0];

            const maxProb = Math.max(...res);
            console.log(`Max probability: ${maxProb}`);

            const indexOfMaxProb = res.indexOf(maxProb);
            console.log(`Index of max probability: ${indexOfMaxProb}`);

            if (indexOfMaxProb in IndexToBreedMap) {
                console.log(`Detected breed: ${IndexToBreedMap[indexOfMaxProb]}`);
                return IndexToBreedMap[indexOfMaxProb];
            }

            return utils.UNKNOWN_BREED;
        } catch (err) {
            console.log(err);
            return utils.UNKNOWN_BREED;
        }
    }
}
