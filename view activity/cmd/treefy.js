let fs=require("fs");
let path=require("path")
module.exports.treefy=function(){
    let src=arguments[0];
    let dest=arguments[1]
    let root=require(path.join(src,"metadata.json"))
    Treefy(src,dest,root)
    console.log("Files created")
    
}
function Treefy(src,dest,node){
    
    if(node.isFile==true)
    {
        fs.copyFileSync(path.join(src,node.newname),path.join(dest,node.name))
    }
    else
    {
        let dir=path.join(dest,node.name)
        fs.mkdirSync(dir)
        for(let i=0;i<node.children.length;i++)
        {
            Treefy(src,dir,node.children[i])
        }
    }
}