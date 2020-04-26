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
        let matchType =d(cards[i]).find(".cscore_info-overview").text();
        let test=matchType.includes("ODI")||matchType.includes("T20")
        if(test==true)
        {
            let anchor=d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
            let matchLink=`https://www.espncricinfo.com${anchor}`
            goToPage(matchLink);
        }
      }
  }
  function goToPage(matchLink)
  {  count++;
      request(matchLink,function(err,res,html)
      {
        if(err==null&&res.statusCode==200)
        {    
           handlePage(html)
           count--;
           if(count==0)
           {
               console.table(leaderBoard)
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
  function handlePage(html)
  {
    let d=cheerio.load(html)
    let type=d(".cscore_info-overview").html();
    type=type.includes("T20")?"T20":"ODI"
    let innings=d(".sub-module.scorecard h2")
    let batsmenTable=d(".scorecard-section.batsmen")
    for(let i=0;i<innings.length;i++)
    {
        let text=d(innings[i]).text()
        let batsmenRows=d(batsmenTable[i]).find(".flex-row .wrap.batsmen")
        for(let j=0;j<batsmenRows.length;j++)
        {
            let batsmenName=d(batsmenRows[j]).find(".cell.batsmen").text();
            let batsmenRuns=d(batsmenRows[j]).find(".cell.runs").html()
            handlePlayer(batsmenName,batsmenRuns,text,type)

        } 
    }
   
  }
  function handlePlayer(batsmenName,batsmenRuns,text,type)
  { let runs=Number(batsmenRuns)
     for(let i=0;i<leaderBoard.length;i++)
     {
         let poj=leaderBoard[i];
         if(poj.Name==batsmenName&&poj.Innings==text&&poj.Type==type)
         {
             poj.Runs +=runs
             return
         }
     } 
    let obj={}
      obj.Name=batsmenName
      obj.Runs=runs
      obj.Innings=text
      obj.Type=type
      leaderBoard.push(obj)
  }