let fs=require("fs");
let path=require("path");
function disp(indent,src){
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
            disp(indent+"\t",str)
        }
    }
}

disp("","d10")