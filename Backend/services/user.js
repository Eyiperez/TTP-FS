const { db } = require('./pgp');
const UserService = {};

//CREAT USER
UserService.create = (name, email, user_uid, user_photo) => {
    const sql = `INSERT INTO users (name, email, user_uid, user_photo) VALUES ($[name], $[email], $[user_uid], $[user_photo]) RETURNING id;`;
    return db.one(sql, { name, email, user_uid, user_photo });
  }


module.exports = { UserService, };