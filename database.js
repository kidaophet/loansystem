const mysql = require('mysql');


class MySqlDatabase {

    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'mydb',
            charset: 'utf8'
        });
    }

    // Custom ฟังชั่นก์ Query ข้อมูลใหม่
    query(sql, params = null) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (errors, result) => {
                if (errors) return reject({ errors });
                resolve(result);
            });
        });
    }

}




module.exports = { MySqlDatabase };