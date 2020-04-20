let request=require("request")
let fs=require("fs")
let cheerio=require("cheerio")
let count=0;
let leaderBoard=[]
request("https://www.espncricinfo.com/scores/series/19322",
function(err,res,html){
    if(err==null&&res.statusCode==200)
    {    
       parsehtml(html)
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
    let d=cheerio.load(html)
    let cards=d(".cscore.cscore--final.cricket.cscore--watchNotes")
    for(let i=0;i<cards.length;i++)
    {
        let matchType=d(cards[i]).find(".cscore_info-overview").html()
        let test= matchType.includes("T20I")||matchType.includes("ODI")
        if(test==true)
        {
            let anchor=d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
            let matchLink=`https://www.espncricinfo.com${anchor}`
            goToMatch(matchLink)
            console.log(matchLink)
        }
    }
}
function goToMatch(matchLink)
{   count++;
    request(matchLink,function(err,res,html)
    {
        if(err==null&&res.statusCode==200)
        { 
           newPage(html)
           count--;
           if(count==0)
           {
               console.table(leaderBoard);
           }
          }
          else if(res.statusCode==404)
          {
              console.log("Page Not Found")
          }
          else{
              console.log(err)
          }
    })
}
function newPage(html)
{
    const d=cheerio.load(html);
    let format=d(".cscore.cscore--final.cricket .cscore_info-overview").html();
    format=format.includes("ODI")?"ODI":"T20";
    let teams=d(".sub-module.scorecard h2");
    let innings=d(".sub-module.scorecard")
    for(let i=0;i<innings.length;i++)
    {
        let players=d(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen ")
        let team=(d(teams[i]).text());
        for(let br=0;br<players.length;br++)
        {
            let batsmaninfo=d(players[br]);
            let batsmanRun=batsmaninfo.find(".cell.runs").html();
            let batsmanName=batsmaninfo.find(".cell.batsmen").text();
            handleplayer(format, team, batsmanName, batsmanRun);
        }
    }
}
function handleplayer(format, team, batsmanName, batsmanRun)
{
    let runs=Number(batsmanRun);
    for(let i=0;i<leaderBoard.length;i++)
    {
        let pobj=leaderBoard[i];
        if(pobj.Name==batsmanName&&pobj.Team==team&&pobj.Format==format)
        {
            pobj.Runs+=runs;
            return;
        }
    }
    let obj={
        Name: batsmanName,
        Team: team,
        Runs:runs,
        Format:format
    }
    leaderBoard.push(obj);

}