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
      SELECT 
        users.*       
      FROM users
      WHERE
        users.id = $[user_id];
      `;
    return db.one(sql, { user_id });
}


module.exports = { UserService, };