const mysqlConfig = require('../../config').mysql;
const mysql = require('mysql');

const mysqlConnSettings = {
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
};

const pool = mysql.createPool(mysqlConnSettings);

/**
 * 
 * @param {string} query query to be executed
 * @param {array} params array of params to be inserted into query string
 * @returns promise of query result
 */
function query(query, params) {
    pool.query(query, params, (error, rows, fields) => {
        return new Promise((resolve, reject) => {
            if(error){
                reject(error);
            }
            else{
                resolve([rows, fields]);
            }
        });
    });
};


module.exports.query = query;