import { Component, OnInit } from '@angular/core';
import { TfServingClient } from './services/tf.serving.client';

class DogItem {
    public imageData: string;
    public breedName: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TfServingClient]
})
export class AppComponent implements OnInit {
    title: String = 'dog breed detector';

    public dogs: DogItem[] = [];
    private fileReader = new FileReader();

    constructor(private tfServingClient: TfServingClient) { }

    ngOnInit() { }

    public filesPicked(files: FileList): void {
        if (files[0]) {
            this.readFiles(files, 0);
        }
    }

    private readFiles(files: FileList, idx: number) {
        const file: File = files[idx];

        this.fileReader.onload = () => {
            const dog = this.createDogEntry(this.fileReader.result);

            this.dogs.push(dog);
            if (files[idx + 1]) {
                this.readFiles(files, idx + 1);
            } else {
                console.log('loaded all files');
            }
        };

        this.fileReader.readAsDataURL(file);
    }

    private createDogEntry(imageData: string): DogItem {
        const dog = new DogItem();
        dog.imageData = imageData;

        const dogBreedPredictionPromise: Promise<string> = this.tfServingClient.predictDogBreed(dog.imageData);
        dogBreedPredictionPromise.then((res) => {
            dog.breedName = res;
        });
            
        dogBreedPredictionPromise.catch((err) => {
            dog.breedName = '<Error occurred!>';
        });

        return dog;
    }
}
