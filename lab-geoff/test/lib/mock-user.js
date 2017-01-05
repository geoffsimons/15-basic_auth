'use strict';

const User = require('../../model/user.js');

var num = 0;

module.exports = function() {
  num++;
  let _user = {};
  let rando = Math.floor(Math.random() * 10000);
  return new User({
    username: `user_${rando}${num}`,
    email: `user_${rando}${num}@test.com`
  })
  .generatePasswordHash(`pass_${rando}`)
  .then( user => user.save())
  .then( user => {
    _user = user;
    return user.generateToken();
  })
  .then( token => {
    _user.token = token;
    return _user;
  });
};
