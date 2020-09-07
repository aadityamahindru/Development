const db = require("./connection.js");
const createRequest=function(mappingObj){
    return new Promise(function(resolve,reject){
        db.query('INSERT INTO user_follower SET ?', mappingObj, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(mappingObj);
            }
        });
    })
}
module.exports.createRequest=createRequest;