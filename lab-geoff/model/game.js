'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;
const debug = require('debug')('mnp:game');

const gameSchema = Schema({
  // userId is who created the game.
  userId: { type: Schema.Types.ObjectId, required: true },
  //TODO: Q: Is it possible to specify a field that is
  //          multiple choice?
  //TODO: Maybe have type be Number, but we should have constants to
  //      represent the discrete values.
  type: { type: String, required: true },
  // machine: { type: Schema.Types.ObjectId, ref: 'machine', required: true },
  // venue: { type: Schema.Types.ObjectId, ref: 'venue', required: true },
  players: [{ type: Schema.Types.ObjectId }], // Size based on type
  //TODO:should scores be an object { 1: Number, 2: Number, 3: Number, 4: Number }
  scores: [{ type: Number }]
});

//TODO: Who is allowed to call this? Add a reportedBy param?
gameSchema.methods.reportScores = function(playerId, scores) {
  debug('reportScores');

  if(!scores) return Promise.reject(createError(400, 'scores required'));

  //TODO: Verify that there are enough players for the type.

  //TODO: Verify that scores is an array of number, or let save() validate it?

  //TODO: Check that scores.length matches the game type (singles vs doubles)

  //TODO: Only overwrite non-zero values from scores?
  this.scores = scores;

  return Promise.resolve(this);
};

gameSchema.methods.join = function(playerId) {
  debug('join');

  //TODO: Allow for 2, 3, or 4 player games.
  if(this.players.length > 1) {
    return Promise.reject(createError(400, 'game full'));
  }

  this.players.push(playerId);
  return Promise.resolve(this);
};

module.exports = mongoose.model('game', gameSchema);
