let cheerio=require("cheerio");
let request=require("request")
let fs=require("fs")
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
    let bowlingScoreCard=d(".scorecard-section.bowling table tbody tr")
    let maxWName=""
    let maxWic=0;
    for(let i=0;i<bowlingScoreCard.length;i++)
    {
        let name=d(d(bowlingScoreCard[i]).find("td")[0]).text();
        let wicket=d(d(bowlingScoreCard[i]).find("td")[5]).text()
        if(wicket>maxWic)
        {
            maxWic=wicket
            maxWName=name

        }
    }
    console.log(maxWName+"\t"+maxWic)
}