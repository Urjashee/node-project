
const migration = require('mysql-migrations');
const {createPool} = require("mysql");

const connection = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    connectionLimit:10
})

migration.init(connection, __dirname + '/migrations');