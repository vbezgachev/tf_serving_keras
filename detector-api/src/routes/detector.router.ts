import { NextFunction, Request, Response, Router } from 'express';
import * as multer from 'multer';

const UPLOAD_PATH = 'uploads';

export class DetectorRouter {
    router: Router;
    private upload: multer.Instance;

    constructor() {
        this.router = Router();
        this.upload = multer({ dest: `${UPLOAD_PATH}/` });
        this.init();
    }

    private predictBreed(req, res, next): void {
        console.log(`file name: ${req.file.filename}; original file name: ${req.file.originalname}`);
        res.send({breed: 'Riesenschnauzer'});
    }

    private init() {
        this.router.post('/predict_breed', this.upload.single('dog_image'), this.predictBreed);
    }
}

const detectorRouter = new DetectorRouter();

export default detectorRouter.router;
