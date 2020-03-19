let request=require("request")
let fs=require("fs")
let cheerio=require("cheerio")
request("https://www.espncricinfo.com/series/19315/commentary/1187004",
function(err,res,html){
    
    if(err==null&&res.statusCode==200)
    {
      
     parsehtml(html)
        console.log("Successful")
    }
    else if(res.statusCode==404)
    {
        console.log("Page Not Found")
    }
    else{
        console.log(err)
    }
})
function parsehtml(html)
{
    let $=cheerio.load(html)
    let dis=$($(".comment")[0]).text();
    console.log(dis)
}