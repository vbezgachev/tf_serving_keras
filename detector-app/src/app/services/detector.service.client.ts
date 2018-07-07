/**
 * Detector service client interface
 */
export abstract class DetectorServiceClient {
    abstract predictDogBreed(imageFile: File, imageData: string): Promise<string>;
}
