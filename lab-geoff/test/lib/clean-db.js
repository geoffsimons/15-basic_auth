'use strict';

const User = require('../../model/user.js');
const Game = require('../../model/game.js');
const Pic = require('../../model/pic.js');

module.exports = function() {
  User.remove({});
  Game.remove({});
  Pic.remove({});
};
