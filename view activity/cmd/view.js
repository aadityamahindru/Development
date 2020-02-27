let fs=require("fs")
let path =require("path")
module.exports.view=function(){
   let src=arguments[0];
   let mode=arguments[1]
if(mode=="-t"){
viewAsTree("",src)
}else if(mode=="-f")
{
viewAsFlatFiles("",src)
}
else
{
    console.log("Wrong Parameter")
}
}
function viewAsTree(indent,src){
    let ans=fs.lstatSync(src).isDirectory()
    if(ans==false)
    {
        console.log(indent+path.basename(src)+"*")
    }
    else{
        console.log(indent+path.basename(src))
        let childrens=fs.readdirSync(src);
        for(let i=0;i<childrens.length;i++)
        {
            let str=path.join(src,childrens[i])
            viewAsTree(indent+"\t",str)
        }
    }
}
function viewAsFlatFiles(ref,src){
    ref=path.join(ref,path.basename(src));
    let ans=fs.lstatSync(src).isDirectory()
    if(ans==false)
    {
        console.log(ref+"*");

    }
    else
    { 
        console.log(ref);
        
    let childrens=fs.readdirSync(src);
        for(let i=0;i<childrens.length;i++)
        {
            let str=path.join(src,childrens[i])
            viewAsFlatFiles(ref,str)
        }
}
}