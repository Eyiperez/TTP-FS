const { db } = require('./pgp');
const UserService = {};

//CREAT USER
UserService.create = (name, email, user_uid, user_photo, available_balance) => {
  const sql = `INSERT INTO users (name, email, user_uid, user_photo, available_balance) VALUES ($[name], $[email], $[user_uid], $[user_photo], $[available_balance]) RETURNING id;`;
  return db.one(sql, { name, email, user_uid, user_photo, available_balance });
}

//GET USER BY USER ID
UserService.read = (user_id) => {
  const sql = `
      SELECT *       
      FROM users
      WHERE
        users.id = $[user_id];
      `;
  return db.one(sql, { user_id });
}

//GET USER BY USER EMAIL
UserService.readByEmail = (email) => {
  const sql = `
      SELECT *       
      FROM users
      WHERE
        users.email = $[email];
      `;
  return db.one(sql, { email });
}

//UPDATE USER'S AVAILABLE CASH
UserService.updateCash = (user_id, available_balance) => {
  console.log('in service',available_balance)
  const sql = `
    UPDATE users
    SET
      available_balance=$[available_balance]
    WHERE
      id=$[user_id]
    `;
  return db.none(sql, { user_id, available_balance });
}

module.exports = { UserService, };