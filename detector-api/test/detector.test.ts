import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as FormData from 'form-data';
import fs = require('fs');
import * as HttpStatus from 'http-status';
import * as mocha from 'mocha';

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {

    it('should be JSON', () => {
        return chai.request(app).get('/').then(res => {
            expect(res.status).to.eql(HttpStatus.OK);
            expect(res.type).to.eql('application/json');
        });
    });

    it('should have a message property', () => {
        return chai.request(app).get('/').then(res => {
            expect(res.status).to.eql(HttpStatus.OK);
            expect(res.body.message).to.have.string('dog breed detector');
        });
    });
});

describe('detectorAPI', () => {

    it('respond with JSON result', () => {
        return chai.request(app).post('/api/v1/predict_breed')
            .set('Content-Type', 'multipart/form-data')
            .attach('dog_image', __dirname + '/resources/dog_image.jpeg')
            .then(res => {
                expect(res.status).to.eql(HttpStatus.OK);
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have breed property', () => {
        return chai.request(app).post('/api/v1/predict_breed')
            .set('Content-Type', 'multipart/form-data')
            .attach('dog_image', __dirname + '/resources/dog_image.jpeg')
            .then(res => {
                expect(res.status).to.eql(HttpStatus.OK);
                expect(res.body).to.have.key('breed');
            });
    });
});
