const Pool = require('pg').Pool;

const pool = new Pool({
    user: "gaurab",
    host:"localhost",
    database:"students",
    password:'',
    port:5432,
});


module.exports = pool;