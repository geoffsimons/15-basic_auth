'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');

require('../server.js');

const exampleUser = {
  username: 'theexampleplayer',
  email: 'somebody@example.com',
  password: '123abc'
};

const url = `http://localhost:${process.env.PORT}`;

describe('Auth Routes', function() {
  describe('GET /some/bogus/route', function() {

  }); // Bogus Routes

  describe('POST /api/signup', function() {
    describe('with a valid body', function() {

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
