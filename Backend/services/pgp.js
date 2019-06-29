const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/ttpfs');


module.exports = {
    db,
}