let fs=require("fs")
console.log("before")
console.log("start")
let fileWillBeReadPromise=fs.promises.readFile("f1.html")
console.log("after")
fileWillBeReadPromise.then(function(content)
{
    console.log(content+" ")
    console.log('finish')
})

fileWillBeReadPromise.catch(function(err)
{
    console.log(err)
})
