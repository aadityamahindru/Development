let request=require("request")
let cheerio=require("cheerio")
let id= process.argv[2]
request(`https://www.espncricinfo.com/scores/series/${id}`,function(err,res,html){
    if(err==null&&res.statusCode==200)
    {
        parsehtml(html);
    }
    else
    {
        console.log(err)
    }
})
function parsehtml(html)
{  
    let co=cheerio.load(html)
    let data=co(".cscore.cscore--final.cricket")
    for(let i=0;i<data.length;i++)
    {
        
        let details=co(data[i]).find(".cscore_info-overview").text()
        let com=co(data[i]).find(".cscore_commentary.cscore_commentary--footer").text()
        console.log(details)
        console.log(com)
        console.log()
    }
}
