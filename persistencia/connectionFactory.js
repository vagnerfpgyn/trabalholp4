var mysql = require('mysql');

function createDbConnection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'1522@@',
        database:'trabalholp4'
    });
};
module.exports = function(){
    return createDbConnection();
}