var assert = require('assert');
const request = require('supertest')

const app = require('../index');

describe('GET /', function () {
    describe('with type url_verification', () => { 
        it('responds with challenge', function (done) {
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.equal(res.text, '<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the' +
                    ' instructions in the README to configure the Slack App and your' +
                    ' environment variables.</p>')
                    done();
                });
        });
    });
});
