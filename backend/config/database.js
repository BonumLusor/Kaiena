import mysql from "mysql2";
   
// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db1'
});
  
export default db;