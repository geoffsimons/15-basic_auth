'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('mnp:pic-route-test');

const Pic = require('../model/pic.js');
const User = require('../model/user.js');
const Game = require('../model/game.js');

const serverToggle = require('./lib/server-toggle.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

describe('Pic Routes', function() {
  before( done => serverToggle.start(server, done));
  after( done => serverToggle.stop(server,done));

  //TODO: Add cleanup

  describe('POST /api/game/:gameId/pic', function() {
    describe('with a valid token and data', function() {
      //TODO: make example users
      //TODO: make an example game
      it('should return a pic object', done => {
        done(false);
      });
    }); // valid token and data
  }); // POST /api/game/:gameId/pic

  describe('DELETE /api/game/:gameId/pic/:picId', function() {
    describe('with valid ids', function() {
      it('should return a 204', done => {
        done(false);
      });
    }); // valid ids
  }); // DELETE /api/game/:gameId/pic/:picId
});
































//
