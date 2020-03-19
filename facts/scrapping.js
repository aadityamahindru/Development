let request=require("request")
let fs=require("fs")
let cheerio=require("cheerio")
request("https://www.espncricinfo.com/series/19322/scorecard/1187679",
function(err,res,html){
    
    if(err==null&&res.statusCode==200)
    {
      //  fs.writeFileSync("cric.html",html)
      
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
    let table=$(".scorecard-section.bowling table tbody tr")
    let maxWicketTacker=""
    let maxWicket=0
    for(let i=0;i<table.length;i++)
    {
        let bowlerName=$(table[i]).find("td a").html()
        let wicket=$($(table[i]).find("td")[5]).html()
        if(wicket>maxWicket)
        {
            maxWicketTacker=bowlerName;
            maxWicket=wicket
        }
    }
   console.log(`${maxWicketTacker}    ${maxWicket}`)
}