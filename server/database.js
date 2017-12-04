var mysql  = require('mysql');

var test = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'zzh',
    password : '123456',
    database : 'blog',
    debug    : false
});



// test.connect();
//
//
// test.query('SELECT * FROM user', function(err, rows, fields) {
//     if (err) throw err;
//     console.log(rows[0]['id']);
// });
//
// test.end();

test.getConnection(function (err,connection) {

    if (err) {
        console.log(err);
        connection.release();
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
    }

    console.log('connected as id ' + connection.threadId);

    test.on('connection', function (connection) {
        console.log("connection done");
    });

    test.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });
})


module.exports=test


