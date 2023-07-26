const mysql = require('mysql2');
let connection=mysql.createConnection({
	    host:'localhost',
	    port:'3306',
	    user:'root',
	    password:'123456',
	    database:'vue_store'
})
module.exports=connection;