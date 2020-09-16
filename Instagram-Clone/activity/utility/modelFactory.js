const uniqid = require('uniqid');
const db=require("./connection");
module.exports.createEntityFact=function(entity){
    return function (entityObj) {
        entityObj.id = uniqid();
        if(entity=="post"){
            let date=new Date();
            entityObj.created_at=date.toISOString().slice(0,19).replace('T',' ');
        }
        return new Promise(function (resolve, reject) {
            db.query(`INSERT INTO ${entity} SET ?`, entityObj, function (err, result) {
                if(err){
                    reject(err);
                }else{
                    resolve(entityObj);
                }
            });
        })
    }
}
module.exports.getEntityFact=function(entity){
    return function(id){
        return new Promise(function(resolve,reject){
            db.query(`SELECT * from ${entity} WHERE id="${id}"`,function(err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result[0]);
                }
            })
        })
    }
}
module.exports.updateEntityFact=function(entity){
    return function(id,updateObj){
        let updateStr="";
        for(key in updateObj){
            updateStr+=`${key} = "${updateObj[key]}",`
        }
        updateStr=updateStr.substring(0,updateStr.length-1);
        var query = `UPDATE ${entity} SET ${updateStr} WHERE id="${id}"`
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
}
module.exports.deleteEntityFact=function(entity){
    return function(id){
        return new Promise(function(resolve,reject){
            db.query(`DELETE FROM ${entity} WHERE id="${id}"`,function(err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
}