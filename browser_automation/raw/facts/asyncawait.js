let fs=require("fs")
async function my(){
let data=fs.promises.readFile("../.././pepCodingAuto/codes/code1.java")
let data1=fs.promises.readFile("../.././pepCodingAuto/codes/code2.java")
let data2= fs.promises.readFile("../.././pepCodingAuto/codes/code3.java")
data1=await data1
console.log("f2 "+data1.byteLength)
data =await data
console.log("f1 "+data.byteLength)
data2=await data2
console.log("f3 "+data2.byteLength)
}
my()