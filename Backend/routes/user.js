const express = require('express');
const userRouter = express.Router();
const { UserService } = require('../services/user');

//VALIDATORS
const { isRequiredsNeededUser } = require('../services/utils');


//POST- CREATE USER
userRouter.post('/', (req, res, next) => {
    const { name, email, user_uid, user_photo, available_balance } = req.body;
    if (isRequiredsNeededUser(req.body)) {
        res.status(400)
        res.send({
            "msg": "some required values are missing",
        })
    }
    UserService.create(name, email, user_uid, user_photo, available_balance)
        .then(data => {
            res.status(200)
            res.json({ success: `Created user named ${name} with generated ID: ${data.id}`, id: data.id });
        })
        .catch(err => {
            res.status(400)
            next(err);
        })
});

//GET USER BY USER ID
userRouter.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params;

    UserService.read(user_id)
        .then(data => {
            res.status(200)
            res.json(data);
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

//GET USER BY USER EMAIL (FIRE BASE AUTH)
userRouter.get('/email/:user_email', (req, res, next) => {
    const { user_email } = req.params;

    UserService.readByEmail(user_email)
        .then(data => {
            res.status(200)
            res.json(data);
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

module.exports = { userRouter, };