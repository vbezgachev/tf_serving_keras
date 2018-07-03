/**
 * Detector service client issues requests to the detector service via REST interface
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as utils from '../utils';

/**
 * The client reads confuguration from the environment and issues a predict request
 */
@Injectable()
export class DetectorServiceClient {
    private baseApiUrl = `http://${environment.detectorServiceHost}:${environment.detectorServicePort}${environment.detectorApiBasePath}`;

    constructor(private http: HttpClient) {
    }

    // Request for a dog breed prediction. We append file as multipart/form data
    // and post it to the detector service.
    // Angular HttpClient rests on the XMLHttpRequest interface exposed by browsers
    // So it issues here a cross-origin request (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
    // The detector service must set the access control for it properly in response headers.
    // E.g. 'Access-Control-Allow-Origin': '*'
    public async predictDogBreed(imageFile: File): Promise<string> {
        const url = this.baseApiUrl + '/predict_breed';

        console.error(`Will call API at ${url}`);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        const formData = new FormData();
        formData.append('dog_image', imageFile, imageFile.name);

        try {
            const data = await this.http.post(url, formData, { headers: headers }).toPromise();

            console.log(`Received reponse from API: ${data}`);

            return (data.hasOwnProperty('breed') ? data['breed'] : utils.UNKNOWN_BREED);
        } catch (err) {
            console.log(err);
            return utils.UNKNOWN_BREED;
        }
    }
}
