var assert = require('assert');
const request = require('supertest')

const app = require('../index');

describe('POST /events', function () {
    describe('with type url_verification', () => { 
        it('responds with challenge', function (done) {
            request(app)
                .post('/events')
                .send({
                    type: "url_verification",
                    challenge: 'incoming-challange'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.challenge, 'incoming-challange')
                    done();
                });
        });
    });
});

describe('POST /', function () {
    describe('when the type is url_verification', () => {
        it('responds with challenge', function (done) {
            request(app)
                .post('/')
                .send({
                    type: "url_verification",
                    challenge: 'incoming-challange'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.challenge, 'incoming-challange')
                    done();
                });
        });    
    })
});