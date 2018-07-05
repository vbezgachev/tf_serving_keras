/**
 * Detector service client issues requests to the detector service via REST interface
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import * as utils from '../utils';
import { DetectorServiceClient } from './detector.service.client';
import { notImplemented } from '@angular/core/src/render3/util';

/**
 * Implements detector service client interface - sends REST requests directly to
 * TensorFlow server
 */
@Injectable()
export class DetectorServiceTfClientImpl implements DetectorServiceClient {
    private baseApiUrl = `http://${environment.tfServingHost}:${environment.tfServingPort}${environment.tfServingBasePath}`;

    constructor(private http: HttpClient) {
    }

    public async predictDogBreedByFile(imageFile: File): Promise<string> {
        throw notImplemented();
    }

    public async predictDogBreedByData(imageData: string): Promise<string> {
        const url = this.baseApiUrl + `/${environment.modelName}:predict`;

        console.log(`Will call TF Serving at ${url}`);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const requestObject = {
            instances: [
                {
                    b64: imageData,
                }
            ]
        };

        try {
            const data = await this.http.post(url, requestObject, { headers: headers }).toPromise();

            console.log(`Received reponse from TF server: ${data}`);

            // TODO
            return utils.UNKNOWN_BREED;

            // return (data.hasOwnProperty('breed') ? data['breed'] : utils.UNKNOWN_BREED);
        } catch (err) {
            console.log(err);
            return utils.UNKNOWN_BREED;
        }
    }
}
