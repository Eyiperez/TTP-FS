const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/ttp-fs');


module.exports = {
    db,
}