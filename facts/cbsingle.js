let fs=require("fs")
fs.readFile("f1.txt",function(err,data){
    console.log("file 1  "+data)
})