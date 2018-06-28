import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Application } from 'express';
import { Server } from 'http';
import * as HttpStatus from 'http-status';
import 'mocha';

import { createApplication } from '../src/app';

const REQUEST_TIMEOUT_MS = 10000;
chai.use(chaiHttp);
const expect = chai.expect;

describe('detectorAPI', () => {

    let expressApp: Application;
    let server: Server;

    before('Initialize application', () => {
        expressApp = createApplication();
        server = expressApp.listen(0);
    });

    after('Clean up', () => {
        server.close();
    });

    it('should have breed property', async () => {
        await chai.request(expressApp).post('/api/v1/predict_breed')
            .set('Content-Type', 'multipart/form-data')
            .attach('dog_image', __dirname + '/resources/dog_image.jpeg')
            .then(res => {
                console.log(`response body: ${res.body}`);
                expect(res.status).to.eql(HttpStatus.OK);
                expect(res.body).to.have.key('breed');
            });
    }).timeout(REQUEST_TIMEOUT_MS);
});
