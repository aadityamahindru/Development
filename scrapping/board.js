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
            console.log(matchLink)
           // goToPage(matchLink);
        }
      }
  }
  function goToPage(matchLink)
  {
      request(matchLink,function(err,res,html)
      {
        if(err==null&&res.statusCode==200)
        {    
           handlePage(html)
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
    let type=d(".cscore cscore--final.cricket .cscore_info-overview").text();
    type=type.includes("T20")?"T20":"ODI"
  }