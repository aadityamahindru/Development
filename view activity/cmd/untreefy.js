let fs=require("fs")
let path=require("path")
let uniqid=require("uniqid")
module.exports.untreefy=function(){
    let src=arguments[0];
    let dest=arguments[1]
    let root={}
    unTreefy(src,dest,root)
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root))
 console.log("All files have been copied")
}

function unTreefy(src,dest,node)
{
    let ans=fs.lstatSync(src).isDirectory()
        if(ans==false)
        {  let uid=uniqid()
            node.isFile=true;
            node.name=path.basename(src)
            node.newname=uid
            fs.copyFileSync(src,path.join(dest,uid))

        }
        else
        { node.isFile=false
            node.name=path.basename(src)
            node.children=[]
            
        let childrens=fs.readdirSync(src);
            for(let i=0;i<childrens.length;i++)
            {   let childobj={}
                let str=path.join(src,childrens[i])
                unTreefy(str,dest,childobj)
                node.children.push(childobj)
            }
}
}