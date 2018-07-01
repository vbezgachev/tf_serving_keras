import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as utils from '../utils';

@Injectable()
export class DetectorServiceClient {
    private baseApiUrl = `http://${environment.detectorServiceHost}:${environment.detectorServicePort}${environment.detectorApiBasePath}`;

    constructor(private http: HttpClient) {
    }

    public async predictDogBreed(imageFile: File): Promise<string> {
        const url = this.baseApiUrl + '/predict_breed';

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        const formData = new FormData();
        formData.append('dog_image', imageFile, imageFile.name);

        try {
            const data = await this.http.post(url, formData, { headers: headers }).toPromise();

            console.log(`Received reponse from API: ${data}`);

            return (data.hasOwnProperty('breed') ? data['breed'] : utils.UNKNOWN_BREED);
        } catch (err) {
            console.log(`Got error by calling API: ${err}`);
            return utils.UNKNOWN_BREED;
        }
    }
}
