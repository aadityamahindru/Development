let fs=require("fs")
let path=require("path")
let uniqid=require("uniqid")
function unTreefy(src,dest)
{
    let ans=fs.lstatSync(src).isDirectory()
        if(ans==false)
        {  let uid=uniqid()
            fs.copyFileSync(src,path.join(dest,uid))

        }
        else
        { 
            
        let childrens=fs.readdirSync(src);
            for(let i=0;i<childrens.length;i++)
            {
                let str=path.join(src,childrens[i])
                unTreefy(str,dest)
            }
}
}
untree("d10","dest")