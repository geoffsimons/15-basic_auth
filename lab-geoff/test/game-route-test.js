'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const User = require('../model/user.js');
const Game = require('../model/game.js');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

describe('Game Routes', function() {
  before( done => {
    let tasks = [];
    this.players = [];
    for(let i = 1; i < 5; i++) {
      tasks.push(
        new User({
          username: `user_${i}`,
          email: `user_${i}@example.com`
        })
        .generatePasswordHash(`password_${i}`)
        .then( user => user.save())
        //TODO: create tokens for the users?
      );
    }
    Promise.all(tasks)
    .then( () => done())
    .catch(done);
  });

  afterEach( () => Promise.all([
    User.remove({}),
    Game.remove({})
  ]));

  describe('POST /api/game', () => {
    it('should return a game', done => {

    });
  }); // POST /api/game
});





























//
