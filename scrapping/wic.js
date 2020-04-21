let cheerio=require("cheerio")
let request=require("request")
request("https://www.espncricinfo.com/series/19322/scorecard/1187683",function(err,res,html){
    if(err==null&&res.statusCode==200)
    {
        parseHtml(html);
    }
    else
    {
        console.log(err)
    }
})
function parseHtml(html)
{
    let d=cheerio.load(html);
    let maxWicket = 0;
    let maxbowler=" ";

    let bowlers = d(".scorecard-section.bowling table tbody tr")

            for(let i=0;i<bowlers.length;i++){
                let bowlerName =d(d(bowlers[i]).find("td")[0]).text()
                let bowlerWicket=d(d(bowlers[i]).find("td")[5]).text()
                if(bowlerWicket>maxWicket){
                    maxWicket=bowlerWicket
                    maxbowler=bowlerName
                }
            }
            console.log(maxbowler+" "+maxWicket)
}