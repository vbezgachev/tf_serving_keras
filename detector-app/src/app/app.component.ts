import { Component, OnInit } from '@angular/core';
import { DetectorServiceClient } from './services/detector.service.client';
import * as utils from './utils';

class DogItem {
    public imageData: string;
    public breedName: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [DetectorServiceClient]
})
export class AppComponent implements OnInit {
    title: String = 'dog breed detector';

    public dogs: DogItem[] = [];
    private fileReader = new FileReader();

    constructor(private tfServingClient: DetectorServiceClient) { }

    ngOnInit() { }

    public filesPicked(files: FileList): void {
        if (files[0]) {
            this.readFiles(files, 0);
        }
    }

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

    private createDogEntry(imageData: string, imageFile: File): DogItem {
        const dog = new DogItem();
        dog.imageData = imageData;

        const dogBreedPredictionPromise: Promise<string> = this.tfServingClient.predictDogBreed(imageFile);

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
