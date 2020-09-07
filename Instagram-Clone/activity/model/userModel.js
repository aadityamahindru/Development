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
const getById=function(uid){
    return new Promise(function(resolve,reject){
        db.query(`SELECT * from user WHERE uid="${uid}"`,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result[0]);
            }
        })
    })
}
module.exports.create=create;
module.exports.getById=getById;