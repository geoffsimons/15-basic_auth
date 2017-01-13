# Basic Authentication API
[![Coverage Status](https://coveralls.io/repos/github/geoffsimons/15-basic_auth/badge.svg)](https://coveralls.io/github/geoffsimons/15-basic_auth)

Example of using basic http authentication to sign users in.

## POST /api/signup
```js
{
  username: 'user1234',      //required
  email: 'user@example.com', //required
  password: 'hellopassword'  //required
}
```
* Returns token

## GET /api/signin
Requires HTTP authorization header with username and password.
* Returns token

## POST /api/game/:gameId/pic
Add a pic to a game.
Requires image attachment.
* Returns pic json

## DELETE /api/game/:gameId/pic/:picId
Remove a pic from a game.
* Returns 204 on success.
* Returns 404 if the pic or game do not exist
* Returns 401 if Bearer Authorization header is not sent.
