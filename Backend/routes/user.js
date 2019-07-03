const express = require('express');
const userRouter = express.Router();
const { UserService } = require('../services/user');

const { isRequiredsNeededUser} = require('../services/utils')


//POST- CREATE USER
sellerRouter.post('/', (req, res, next) => {
    const { name, email, user_uid, user_photo } = req.body;
    if (isRequiredsNeededUser(req.body)) {
      res.status(400)
      res.send({
        "msg": "some required values are missing",
      })
    }
    UserService.create(name, email, user_uid, user_photo)
      .then(data => {
        res.status(200)
        res.json({ success: `Created user named ${name} with generated ID: ${data.id}`, id: data.id });
      })
      .catch(err => {
        res.status(400)
        next(err);
      })
  });


module.exports = {userRouter,};