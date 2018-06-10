const mysql = require('mysql');

const test = mysql.createPool({
  connectionLimit: 100, // important
  host: 'localhost',
  user: 'zzh',
  password: '123456',
  database: 'blog',
	debug: false,
});

module.exports = test;
