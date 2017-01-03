'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const User = require('../model/user.js');

require('../server.js');

const exampleUser = {
  username: 'theexampleplayer',
  email: 'somebody@example.com',
  password: '123abc'
};

const url = `http://localhost:${process.env.PORT}`;

function cleanup(done) {
  User.remove({})
  .then( () => done())
  .catch( err => done(err));
}

describe('Auth Routes', function() {
  describe('GET /some/bogus/route', function() {
    it('should return a 404', done => {
      request.get(`${url}/some/bogus/route`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  }); // Bogus Routes

  describe('POST /api/signup', function() {
    describe('with a valid body', function() {
      after( done => cleanup(done));

      it('should return a token', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end( (err, res) => {
          if(err) done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    }); // valid body

    describe('with a missing username', function() {

    }); // missing username

    describe('with a missing password', function() {

    });

  }); // POST /api/signup

  describe('GET /api/signin', function() {
    describe('with a valid username and password', function() {

    }); // valid username and password

    describe('with incorrect password', function() {

    }); // incorrect password

    describe('unknown username', function() {

    }); //unknown username
  }); // GET /api/signin
});






























//
