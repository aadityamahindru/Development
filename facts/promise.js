let fs=require("fs")
function promisefs(path)
{
    let promiseval=new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
    return promiseval
}
let read=promisefs("f1.txt")
read.then(function(data){
    console.log(data.byteLength)
})
read.catch(function(err){
    console.log(err)
})