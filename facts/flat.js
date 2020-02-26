let fs=require("fs")
let path=require("path")
function disp(src)
{
    let ans=fs.lstatSync(src).isDirectory()
        if(ans==false)
        {
            console.log(src+"*");

        }
        else
        { 
            console.log(src);
            
        let childrens=fs.readdirSync(src);
            for(let i=0;i<childrens.length;i++)
            {
                let str=path.join(src,childrens[i])
                disp(str)
            }
}
}
disp("d10")