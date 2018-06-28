import * as config from 'config';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import { controller, httpPost, interfaces } from 'inversify-express-utils';
import * as multer from 'multer';

import { TfServingClient } from '../services/tf.serving.client';
import TYPES from '../types';

const UPLOAD_PATH = 'uploads';

const storage = multer.memoryStorage();
const upload = multer({
    dest: `${UPLOAD_PATH}/`,
    storage: storage,
});

@controller(`${config.get<string>('api.base_path')}`)
export class DetectrorController implements interfaces.Controller {
    public constructor(
        @inject(TYPES.TfServingClient) private tfServingClient: TfServingClient,
    ) {}

    @httpPost('/predict_breed', upload.single('dog_image'))
    public async predictBreed(req: Request, res: Response): Promise<void> {
        console.log(`original file name: ${req.file.originalname}`);
        try {
            const dogBreed: string = await this.tfServingClient.predictDogBreed(req.file.buffer);
            res.status(HttpStatus.OK).send({breed: dogBreed});
        }
        catch (err) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                error: err,
            });
        }
    }
}
