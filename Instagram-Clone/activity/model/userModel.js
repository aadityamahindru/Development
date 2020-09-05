const db = require("./connection.js");
const uniqid = require('uniqid');
const create = function (userobj) {
    userobj.uid = uniqid();
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO user SET ?', userobj, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(userobj);
            }
        });
    })
}
module.exports.create=create;