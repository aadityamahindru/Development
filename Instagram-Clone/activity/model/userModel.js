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
const updateById=function(uid,updateObj){
    let updateStr="";
    for(key in updateObj){
        updateStr+=`${key} = "${updateObj[key]}",`
    }
    updateStr=updateStr.substring(0,updateStr.length-1);
    var query = `UPDATE user SET ${updateStr} WHERE uid="${uid}"`
    return new Promise(function(resolve,reject){
        db.query(query,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}
const deleteById=function(uid){
    return new Promise(function(resolve,reject){
        db.query(`DELETE FROM user WHERE uid="${uid}"`,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}
module.exports.deleteById=deleteById;
module.exports.updateById=updateById;
module.exports.create=create;
module.exports.getById=getById;