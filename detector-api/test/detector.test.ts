import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Application } from 'express';
import { Server } from 'http';
import * as HttpStatus from 'http-status';
import 'mocha';

import { createApplication } from '../src/app';
import { TfServingClientMock } from '../src/services/tf.serving.client.mock';

const REQUEST_TIMEOUT_MS = 2000;
chai.use(chaiHttp);
const expect = chai.expect;

describe('detectorAPI', () => {

    let expressApp: Application;
    let server: Server;

    before('Initialize application', () => {
        expressApp = createApplication(new TfServingClientMock());
        server = expressApp.listen(0);
    });

    after('Clean up', () => {
        server.close();
    });

    it('responds with JSON', async () => {
        await chai.request(expressApp).post('/api/v1/predict_breed')
            .set('Content-Type', 'multipart/form-data')
            .attach('dog_image', __dirname + '/resources/german_pinscher.jpg')
            .then(res => {
                expect(res.status).to.equal(HttpStatus.OK);
                // tslint:disable-next-line:no-unused-expression
                expect(res).to.be.json;
            });
      }).timeout(REQUEST_TIMEOUT_MS);

    it('should have breed property', async () => {
        await chai.request(expressApp).post('/api/v1/predict_breed')
            .set('Content-Type', 'multipart/form-data')
            .attach('dog_image', __dirname + '/resources/german_pinscher.jpg')
            .then(res => {
                expect(res.status).to.eql(HttpStatus.OK);
                expect(res.body).to.have.key('breed');
                expect(res.body.breed).to.eql('Mock Breed');
            });
    }).timeout(REQUEST_TIMEOUT_MS);
});
