module.exports.view=function(){
   let src=arguments[0];
   let mode=arguments[1]
if(mode=="-t"){
viewAsTree(src)
}else if(mode=="-f")
{
viewAsFlatFiles(src)
}
else
{
    console.log("Wrong Parameter")
}
}
function viewAsTree(){
    console.log("view as tree is working")
}
function viewAsFlatFiles(){
console.log("view as flatfile is working")
}