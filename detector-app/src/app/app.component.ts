/**
 * The main component represents the main page of the application
 * Allows to select dog images and displazs prediction results
 */
import { Component, OnInit } from '@angular/core';
import { DetectorServiceClient, DetectorServiceClientImpl } from './services/detector.service.client';
import * as utils from './utils';

/**
 * Helper class fo a dog image and its breed
 */
class DogItem {
    public imageData: string;
    public breedName: string;
}

/**
 * Main application component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [{ provide: DetectorServiceClient, useClass: DetectorServiceClientImpl }]
})
export class AppComponent implements OnInit {
    title: String = 'dog breed detector';

    public dogs: DogItem[] = [];
    private fileReader = new FileReader();

    constructor(private tfServingClient: DetectorServiceClient) { }

    ngOnInit() { }

    // Reads the the dog image files when they are selected
    public filesPicked(files: FileList): void {
        this.dogs = [];
        if (files[0]) {
            this.readFiles(files, 0);
        }
    }

    // Read each file and create an entry (image + breed) to display
    private readFiles(files: FileList, idx: number) {
        this.fileReader.onload = () => {
            const dog = this.createDogEntry(this.fileReader.result, files[idx]);

            this.dogs.push(dog);
            if (files[idx + 1]) {
                this.readFiles(files, idx + 1);
            } else {
                console.log('loaded all files');
            }
        };

        this.fileReader.readAsDataURL(files[idx]);
    }

    // Request the serving client for a dog breed by creation
    private createDogEntry(imageData: string, imageFile: File): DogItem {
        const dog = new DogItem();
        dog.imageData = imageData;

        const dogBreedPredictionPromise: Promise<string> = this.tfServingClient.predictDogBreedByFile(imageFile);

        dogBreedPredictionPromise.then((res) => {
            dog.breedName = res;
        });

        dogBreedPredictionPromise.catch((err) => {
            console.error(`Error by dog prediction occurred: ${err}`);
            dog.breedName = utils.UNKNOWN_BREED;
        });

        return dog;
    }
}
