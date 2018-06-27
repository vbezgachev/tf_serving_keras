import { NextFunction, Request, Response, Router } from 'express';
import * as multer from 'multer';
import { TfServingClient } from '../services/tf.serving.client';

const UPLOAD_PATH = 'uploads';

const tfServingClient = new TfServingClient();

export class DetectorRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }

    public init(): void {
        const storage = multer.memoryStorage();
        const upload = multer({
            dest: `${UPLOAD_PATH}/`,
            storage: storage,
        });

        this.router.post('/predict_breed', upload.single('dog_image'), this.predictBreed);
    }

    public async predictBreed(req, res, next): Promise<void> {
        // console.log(`file name: ${req.file.filename}; ` +
        //     `original file name: ${req.file.originalname} ` +
        //     `buffer: ${req.file.buffer}`);
        await tfServingClient.predictDogBreed(req.file.buffer);
        res.send({breed: 'Riesenschnauzer'});
    }
}

const detectorRouter = new DetectorRouter();

export default detectorRouter.router;
