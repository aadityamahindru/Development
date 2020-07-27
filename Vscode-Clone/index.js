let $=require("jquery")
const path=require("path")
let fs=require("fs")
$(document).ready(function(){
    let src=process.cwd();
    let name=path.basename(src);
    let pObj={
        id:src,
        parent:"#",
        text:name
    }
    let chArr=createChildnode(src);
    chArr.unshift(pObj);
    $("#tree").jstree({
        "core":{
            "data":chArr,
            "check_callback":true,
            "themes":{
                "icons":false
            }
        },
    }).on("open_node.jstree",function(e,data){
        let children =data.node.children;
        for(let i=0;i<children.length;i++){
            let gcNodes=createChildnode(children[i]);
            for(let j=0;j<gcNodes.length;j++){
                let isGcPresent=$("#tree").jstree(true).get_node(gcNodes[j].id);
                if(isGcPresent){
                    return
                }
                $("#tree").jstree().create_node(children[i],gcNodes[j],"last")
            }
        }
    })
})
function createChildnode(src){
    let isDir=fs.lstatSync(src).isDirectory();
    if(!isDir){
        return [];
    }
    let children=fs.readdirSync(src);
    let chArr=[];
    for(let i=0;i<children.length;i++){
        let cPath=path.join(src,children[i]);
        let chObj={
            id:cPath,
            parent:src,
            text:children[i]
        }
        chArr.push(chObj);
    }
    return chArr;
}
