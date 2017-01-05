'use strict';

const fs = require('fs');
const path = require('path');
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const Router = require('express').Router;
const Promise = require('bluebird');
const debug = require('debug')('mnp:pic-route.js');

const Pic = require('../model/pic.js');
const Game = require('../model/game.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(Promise);

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({ dest: dataDir });

const router = module.exports = new Router();

function s3uploadProm(params) {
  return new Promise( (resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if(err) return reject(err);
      resolve(s3data);
    });
  });
}

router.post('/api/gallery/:gameId/pic', bearerAuth, upload.single('image'), function(req, res, next) {
  debug('POST /api/gallery/:gameId/pic');

  if(!req.file) return next(createError(400, 'file not found'));
  if(!req.file.path) return next(createError(500, 'file not saved'));

  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };

  Game.findById(req.params.gameId)
  .catch( err => next(createError(404, err.message)))
  .then( () => s3uploadProm(params))
  .then( s3data => {
    // Lecture was deleting everything, but that could
    // cause problems with multiple users.
    del(req.file.path);
    return new Pic({
      userId: req.user._id,
      gameId: req.params.gameId,
      imageURI: s3data.Location,
      objectKey: s3data.Key
    }).save();
  })
  .then( pic => res.json(pic))
  .catch(next);
});





























//
