let request =require("request")
let cheerio=require("cheerio")
let fs=require("fs")
let leaderboard=[],count=0
request("https://www.espncricinfo.com/scores/series/19322",function(err,res,html)
{
    if(err==null&&res.statusCode==200)
    {
        parseHtml(html)
    }
    else{
        console.log(err)
    }
})

function parseHtml(html)
{   
    let d=cheerio.load(html);
    let cards=d(".cscore.cscore--final.cricket.cscore--watchNotes")
    for(let i=0;i<cards.length;i++)
    {   let matchType=d(cards[i]).find(".cscore_info-overview").html()
        let test= matchType.includes("T20I")||matchType.includes("ODI")
       if(test==true)
       {
          let anchor=d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
          let matchLink=`https://www.espncricinfo.com${anchor}`
          goToPage(matchLink);
       }
    }
}
function goToPage(matchLink)
{   count++
    request(matchLink,function(err,res,html){
        if(err==null&&res.statusCode==200)
        {
            newPageParse(html)
            count--;
            if(count==0)
            {
                console.table(leaderboard)
            }
        }
        else{
            console.log(err)
        }
    })
}
function newPageParse(html)
{
    let d=cheerio.load(html)
    let type=d(".cscore.cscore--final.cricket .cscore_info-overview").html();
    type=type.includes("T20")?"T20":"ODI";
    let teams=d(".sub-module.scorecard h2")
    let innings=d(".sub-module.scorecard")
    for(let i=0;i<innings.length;i++)
    {
        teamName=d(teams[i]).html();
        let players=d(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen")
        for(j=0;j<players.length;j++)
        {
            let batsmenName=d(players[j]).find(".cell.batsmen").text();
            let batsmenRuns=d(players[j]).find(".cell.runs").html();
           organizeData(batsmenRuns,batsmenName,type,teamName)
        }
    }
}
function organizeData(batsmenRuns,batsmenName,type,teamName)
{   batsmenRuns=Number(batsmenRuns)
    for(let i=0;i<leaderboard.length;i++)
    {
        let pobj=leaderboard[i];
        if(pobj.Name==batsmenName&&pobj.Type==type&&pobj.Team==teamName)
        {
            pobj.Runs +=batsmenRuns
            return;
        }
    }
    let obj={}
    obj.Name=batsmenName
    obj.Team=teamName
    obj.Runs=batsmenRuns
    obj.Type=type
    leaderboard.push(obj)
}
