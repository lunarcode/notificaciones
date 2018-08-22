var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'ws2ws',  
    database: 'microfin_bienestar' ,
});  
module.exports = connection;  