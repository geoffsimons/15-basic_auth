'use strict';

const User = require('../../model/user.js');

var num = 0;

module.exports = function() {
  num++;
  let player = {};
  let rando = Math.floor(Math.random() * 10000);
  return new User({
    username: `user_${rando}${num}`,
    email: `user_${rando}${num}@test.com`
  })
  .generatePasswordHash(`pass_${rando}`)
  .then( user => user.save())
  .then( user => {
    //TODO: refactor to: player = user;
    player.user = user;
    return user.generateToken();
  })
  .then( token => {
    player.token = token;
    return player;
  });
};
